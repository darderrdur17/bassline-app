#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BARS_DIR = path.join(__dirname, '..', 'venue-images', 'Bars');
const CLUBS_DIR = path.join(__dirname, '..', 'venue-images', 'Clubs');
const MUNCHIES_DIR = path.join(__dirname, '..', 'venue-images', 'Munchies');
const ASSETS_DIR = path.join(__dirname, '..', 'bassline-app', 'assets', 'images', 'venues');

// Venue name mapping
const VENUE_NAME_MAP = {
  // Bars
  'ABV': 'abv',
  'Anina': 'anina',
  'Bar_Crenn': 'bar-crenn',
  'Bar_Sprezzatura': 'bar-sprezzatura',
  'Beaux': 'beaux',
  'Chambers': 'chambers',
  'Dalva': 'dalva',
  'Hi_Tops': 'hi-tops',
  'High_Treason': 'high-treason',
  'Li_Po_Cocktail_Lounge': 'li-po-cocktail-lounge',
  'Make_Out_Room': 'make-out-room',
  'Palm_City': 'palm-city',
  'PCH_Pacific_Cocktail_Haven': 'pch-pacific-cocktail-haven',
  'Peacekeeper': 'peacekeeper',
  'Press_Club': 'press-club',
  'Shoji': 'shoji',
  'Smugglers_Cove': 'smugglers-cove',
  'Tommys_Mexican_Restaurant': 'tommys-mexican-restaurant',
  'Trick_Dog': 'trick-dog',
  'True_Laurel': 'true-laurel',
  'Ungrafted': 'ungrafted',
  'Wildhawk': 'wildhawk',
  
  // Clubs
  '1015_Folsom': '1015-folsom',
  'Audio': 'audio',
  'Halcyon': 'halcyon',
  'Monroes': 'monroes',
  'Public_Works': 'public-works',
  'Temple': 'temple',
  'The_Midway': 'the-midway',
  
  // Munchies
  'Cocobang': 'cocobang',
  'Grubstake': 'grubstake',
  'Hinodeya': 'hinodeya',
  'Joyful_Garden': 'joyful-garden',
  'Pinecrest': 'pinecrest',
  'Public_Izakaya': 'public-izakaya',
  'Taishan': 'taishan',
  'Taqueria_El_Farolito': 'taqueria-el-farolito',
  'Toyose': 'toyose'
};

function normalizeFileName(filename) {
  // Remove extension
  const nameWithoutExt = filename.replace(/\.(jpg|jpeg|png|webp)$/i, '');
  
  // Extract venue name and number
  const match = nameWithoutExt.match(/^(.+?)_(\d+)$/);
  if (!match) return null;
  
  const [, venueName, number] = match;
  const normalizedName = VENUE_NAME_MAP[venueName];
  
  if (!normalizedName) return null;
  
  // First image is hero, rest are gallery
  const suffix = number === '1' ? 'hero' : (parseInt(number) - 1).toString();
  
  return `${normalizedName}-${suffix}.jpg`;
}

function convertToJpg(inputPath, outputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  
  if (ext === '.webp' || ext === '.png') {
    try {
      // Use sips to convert
      execSync(`sips -s format jpeg "${inputPath}" --out "${outputPath}"`, { stdio: 'pipe' });
      return true;
    } catch (e) {
      console.log(`  ⚠️  Could not convert ${path.basename(inputPath)}, copying as-is`);
      fs.copyFileSync(inputPath, outputPath);
      return true;
    }
  } else {
    // Already jpg/jpeg, just copy
    fs.copyFileSync(inputPath, outputPath);
    return true;
  }
}

function processDirectory(dir, dirName) {
  if (!fs.existsSync(dir)) {
    console.log(`⚠️  ${dirName} directory not found, skipping`);
    return { processed: 0, venues: [] };
  }
  
  console.log(`\n📁 Processing ${dirName}...`);
  
  const files = fs.readdirSync(dir);
  const venueImages = {};
  let processed = 0;
  
  files.forEach(file => {
    if (!/\.(jpg|jpeg|png|webp)$/i.test(file)) return;
    
    const normalizedName = normalizeFileName(file);
    if (!normalizedName) {
      console.log(`  ⚠️  Skipping ${file} (no mapping found)`);
      return;
    }
    
    const sourcePath = path.join(dir, file);
    const destPath = path.join(ASSETS_DIR, normalizedName);
    
    // Track venue
    const venueName = normalizedName.split('-hero')[0].split('-')[0];
    if (!venueImages[venueName]) {
      venueImages[venueName] = { hero: null, gallery: [] };
    }
    
    if (normalizedName.includes('-hero')) {
      venueImages[venueName].hero = normalizedName;
    } else {
      venueImages[venueName].gallery.push(normalizedName);
    }
    
    try {
      convertToJpg(sourcePath, destPath);
      console.log(`  ✓ ${file} → ${normalizedName}`);
      processed++;
    } catch (e) {
      console.log(`  ✗ Failed: ${file}`);
    }
  });
  
  return { processed, venues: Object.keys(venueImages), venueImages };
}

function updateVenueData(allVenueImages) {
  const venuesPath = path.join(__dirname, '..', 'bassline-app', 'src', 'data', 'venues.js');
  let content = fs.readFileSync(venuesPath, 'utf-8');
  
  let updateCount = 0;
  
  // For each venue with images
  Object.entries(allVenueImages).forEach(([venueName, images]) => {
    if (!images.hero) return;
    
    // Build the require statements
    const heroRequire = `require("../../assets/images/venues/${images.hero}")`;
    const galleryRequires = images.gallery.map(img => 
      `require("../../assets/images/venues/${img}")`
    ).join(',\n      ');
    
    // Find and replace heroImage
    const namePattern = new RegExp(
      `("name":\\s*"[^"]*${venueName.replace(/-/g, '[- ]')}[^"]*"[\\s\\S]*?)"heroImage":\\s*"[^"]*"`,
      'i'
    );
    
    if (namePattern.test(content)) {
      content = content.replace(namePattern, `$1"heroImage": ${heroRequire}`);
      
      // Add or update gallery
      if (images.gallery.length > 0) {
        const galleryPattern = new RegExp(
          `("name":\\s*"[^"]*${venueName.replace(/-/g, '[- ]')}[^"]*"[\\s\\S]*?)"gallery":\\s*\\[[^\\]]*\\]`,
          'i'
        );
        
        if (galleryPattern.test(content)) {
          content = content.replace(galleryPattern, `$1"gallery": [\n      ${galleryRequires}\n    ]`);
        } else {
          // Add gallery before closing brace
          const addGalleryPattern = new RegExp(
            `("name":\\s*"[^"]*${venueName.replace(/-/g, '[- ]')}[^"]*"[\\s\\S]*?)(\\s*}\\s*[,\\]])`,
            'i'
          );
          content = content.replace(addGalleryPattern, `$1,\n    "gallery": [\n      ${galleryRequires}\n    ]$2`);
        }
      }
      
      updateCount++;
    }
  });
  
  fs.writeFileSync(venuesPath, content);
  return updateCount;
}

function main() {
  console.log('🖼️  Batch Processing Venue Images\n');
  
  // Create assets directory
  if (!fs.existsSync(ASSETS_DIR)) {
    fs.mkdirSync(ASSETS_DIR, { recursive: true });
  }
  
  // Process each directory
  const barsResult = processDirectory(BARS_DIR, 'Bars');
  const clubsResult = processDirectory(CLUBS_DIR, 'Clubs');
  const munchiesResult = processDirectory(MUNCHIES_DIR, 'Munchies');
  
  const totalProcessed = barsResult.processed + clubsResult.processed + munchiesResult.processed;
  const totalVenues = new Set([
    ...barsResult.venues,
    ...clubsResult.venues,
    ...munchiesResult.venues
  ]).size;
  
  // Combine all venue images
  const allVenueImages = {
    ...barsResult.venueImages,
    ...clubsResult.venueImages,
    ...munchiesResult.venueImages
  };
  
  console.log(`\n📊 Processing Summary:`);
  console.log(`   ${totalProcessed} images processed`);
  console.log(`   ${totalVenues} venues updated`);
  console.log(`   Images saved to: bassline-app/assets/images/venues/`);
  
  // Update venue data
  console.log(`\n🔄 Updating venue data...`);
  const updatedCount = updateVenueData(allVenueImages);
  console.log(`   ✓ ${updatedCount} venues updated in venues.js`);
  
  console.log(`\n✅ Complete! Images ready for both app and web.\n`);
}

main();

