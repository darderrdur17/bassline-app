#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VENUE_IMAGES_DIR = path.join(__dirname, '..', 'venue-images');
const APP_VENUES_DIR = path.join(__dirname, '..', 'bassline-app', 'assets', 'images', 'venues');
const WEB_VENUES_DIR = path.join(__dirname, '..', 'bassline-web', 'public', 'images', 'venues');
const APP_VENUES_JS = path.join(__dirname, '..', 'bassline-app', 'src', 'data', 'venues.js');
const WEB_VENUES_TS = path.join(__dirname, '..', 'bassline-web', 'src', 'data', 'venues.ts');
const APP_VENUE_IMAGES_JS = path.join(__dirname, '..', 'bassline-app', 'src', 'data', 'venueImages.js');

// Ensure directories exist
[APP_VENUES_DIR, WEB_VENUES_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Helper to normalize venue name to key format (for app)
function nameToKey(name) {
  return name
    .replace(/'s\b/gi, 's')
    .replace(/[^A-Za-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');
}

// Helper to normalize venue name to slug format (for web)
function nameToSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Determine category from venue type
function getCategory(venueType) {
  const type = (venueType || '').toLowerCase();
  if (['club', 'nightclub', 'warehouse', 'mega-club', 'multi-room', 'club/lounge', 'music venue / bar'].some(k => type.includes(k))) {
    return 'Clubs';
  }
  if (['restaurant'].some(k => type.includes(k)) || type.includes('munchies')) {
    return 'Munchies';
  }
  return 'Bars';
}

// Find images for a venue in venue-images directory
function findVenueImages(venueName, category) {
  const normalizedName = venueName.replace(/[^A-Za-z0-9\s]/g, ' ').trim();
  
  // Try the suggested category first
  let matchingFiles = searchInCategory(venueName, normalizedName, category);
  
  // If not found, search all categories
  if (matchingFiles.length === 0) {
    const allCategories = ['Bars', 'Clubs', 'Munchies'];
    for (const cat of allCategories) {
      if (cat !== category) {
        matchingFiles = searchInCategory(venueName, normalizedName, cat);
        if (matchingFiles.length > 0) {
          break; // Found in this category
        }
      }
    }
  }

  return matchingFiles;
}

function searchInCategory(venueName, normalizedName, category) {
  const categoryDir = path.join(VENUE_IMAGES_DIR, category);
  if (!fs.existsSync(categoryDir)) {
    return [];
  }

  const files = fs.readdirSync(categoryDir);
  
  // Try exact match first
  let matchingFiles = files.filter(f => {
    const baseName = f.replace(/_\d+\.(jpg|jpeg|png|webp)$/i, '');
    return baseName === venueName || baseName === normalizedName;
  });

  // If no exact match, try fuzzy match
  if (matchingFiles.length === 0) {
    const venueWords = normalizedName.toLowerCase().split(/\s+/);
    matchingFiles = files.filter(f => {
      const baseName = f.replace(/_\d+\.(jpg|jpeg|png|webp)$/i, '').toLowerCase();
      return venueWords.some(word => baseName.includes(word)) || 
             venueWords.every(word => baseName.includes(word));
    });
  }

  // Sort by number suffix
  matchingFiles.sort((a, b) => {
    const numA = parseInt(a.match(/_(\d+)\./)?.[1] || '0');
    const numB = parseInt(b.match(/_(\d+)\./)?.[1] || '0');
    return numA - numB;
  });

  return matchingFiles.map(f => path.join(categoryDir, f));
}

// App uses @venue-images alias directly, so no copying needed
// But we keep this for reference/backup purposes
function copyToApp(venueName, category, imageFiles) {
  // App uses @venue-images alias pointing directly to venue-images folder
  // So we don't need to copy, but we'll track for reference
  return imageFiles.length;
}

// Copy images to web directory (convert to kebab-case)
function copyToWeb(venueName, category, imageFiles) {
  const venueSlug = nameToSlug(venueName);
  imageFiles.forEach((srcPath, index) => {
    const ext = path.extname(srcPath);
    // Convert to jpg for web (normalize format)
    const destExt = ext.toLowerCase() === '.webp' ? '.jpg' : ext.toLowerCase();
    let destName;
    if (index === 0) {
      destName = `${venueSlug}-hero${destExt}`;
    } else {
      destName = `${venueSlug}-${index}${destExt}`;
    }
    const destPath = path.join(WEB_VENUES_DIR, destName);
    fs.copyFileSync(srcPath, destPath);
  });
}

// Extract venue info using regex (simpler than parsing full JSON)
function extractVenueInfo(content, isApp = false) {
  const venues = [];
  const venuePattern = /\{\s*"id":\s*(\d+)[\s\S]*?"name":\s*"([^"]+)"[\s\S]*?"type":\s*"([^"]+)"/g;
  let match;
  
  while ((match = venuePattern.exec(content)) !== null) {
    venues.push({
      id: parseInt(match[1]),
      name: match[2],
      type: match[3]
    });
  }
  
  return venues;
}

// Read venues from both files
function readVenues() {
  // Read app venues
  const appContent = fs.readFileSync(APP_VENUES_JS, 'utf-8');
  const appVenues = extractVenueInfo(appContent, true);

  // Read web venues
  const webContent = fs.readFileSync(WEB_VENUES_TS, 'utf-8');
  const webVenues = extractVenueInfo(webContent, false);

  return { appVenues, webVenues };
}

// Main sync function
function main() {
  console.log('🖼️  Syncing venue images...\n');

  const { appVenues, webVenues } = readVenues();
  const venueMap = new Map();
  
  // Create map of venues by ID
  appVenues.forEach(v => venueMap.set(v.id, { app: v, web: null }));
  webVenues.forEach(v => {
    if (venueMap.has(v.id)) {
      venueMap.get(v.id).web = v;
    } else {
      venueMap.set(v.id, { app: null, web: v });
    }
  });

  let appCopied = 0;
  let webCopied = 0;
  const imageMappings = {};

  // Process each venue
  for (const [id, { app, web }] of venueMap.entries()) {
    const venue = app || web;
    if (!venue || !venue.name) continue;

    const suggestedCategory = getCategory(venue.type);
    const imageFiles = findVenueImages(venue.name, suggestedCategory);
    
    // Determine actual category where images were found
    let actualCategory = suggestedCategory;
    if (imageFiles.length > 0) {
      const firstImagePath = imageFiles[0];
      if (firstImagePath.includes('/Bars/')) actualCategory = 'Bars';
      else if (firstImagePath.includes('/Clubs/')) actualCategory = 'Clubs';
      else if (firstImagePath.includes('/Munchies/')) actualCategory = 'Munchies';
    }

    if (imageFiles.length === 0) {
      console.log(`⚠️  No images found for: ${venue.name} (searched: ${suggestedCategory})`);
      continue;
    }

    // App uses @venue-images alias directly, no copying needed
    appCopied += imageFiles.length;

    // Copy to web
    copyToWeb(venue.name, actualCategory, imageFiles);
    webCopied += imageFiles.length;

    // Store mapping for updating venue data
    const venueKey = nameToKey(venue.name);
    const venueSlug = nameToSlug(venue.name);
    imageMappings[venueKey] = {
      category: actualCategory,
      images: imageFiles.map((f, i) => ({
        app: path.basename(f), // App uses original filename from venue-images folder
        web: i === 0 ? `${venueSlug}-hero${path.extname(f).toLowerCase() === '.webp' ? '.jpg' : path.extname(f).toLowerCase()}` : `${venueSlug}-${i}${path.extname(f).toLowerCase() === '.webp' ? '.jpg' : path.extname(f).toLowerCase()}`,
        original: path.basename(f)
      })),
      venueName: venue.name,
      venueId: id
    };

    console.log(`✓ ${venue.name}: ${imageFiles.length} images`);
  }

  console.log(`\n📊 Summary:`);
  console.log(`   App: ${appCopied} images found (using @venue-images alias directly)`);
  console.log(`   Web: ${webCopied} images copied`);
  console.log(`   Venues: ${Object.keys(imageMappings).length} venues processed`);

  // Save mappings for next step
  const mappingsPath = path.join(__dirname, '..', '.venue-image-mappings.json');
  fs.writeFileSync(mappingsPath, JSON.stringify(imageMappings, null, 2));
  console.log(`\n💾 Mappings saved to .venue-image-mappings.json`);
  console.log(`\n✅ Image sync complete! Run update-venue-data.mjs next to update venue files.`);
}

main();

