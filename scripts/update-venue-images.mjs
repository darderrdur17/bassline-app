#!/usr/bin/env node
/**
 * Update Venue Images
 * Scans venue-images folder and updates venue data with local image paths
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VENUE_IMAGES_DIR = path.join(__dirname, '..', 'venue-images');
const ASSETS_DIR = path.join(__dirname, '..', 'bassline-app', 'assets', 'images', 'venues');

// Supported image extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

function normalizeVenueName(name) {
  return name.toLowerCase()
    .replace(/[''']/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function findVenueImages(venueName, venueId) {
  if (!fs.existsSync(VENUE_IMAGES_DIR)) {
    return null;
  }

  const normalizedName = normalizeVenueName(venueName);
  const files = fs.readdirSync(VENUE_IMAGES_DIR);
  
  const venueImages = {
    hero: null,
    gallery: []
  };

  // Look for images matching venue name or ID
  files.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    if (!IMAGE_EXTENSIONS.includes(ext)) return;

    const fileNameLower = file.toLowerCase();
    const fileBase = path.basename(file, ext);
    
    // Check if file matches venue name
    const matchesName = fileNameLower.includes(normalizedName) || 
                        fileBase.startsWith(normalizedName);
    
    // Check if file matches venue ID
    const matchesId = fileBase.startsWith(`${venueId}-`) || 
                      fileBase.startsWith(`id-${venueId}-`);

    if (matchesName || matchesId) {
      // Determine if it's a hero or gallery image
      if (fileNameLower.includes('hero') || 
          fileNameLower.includes('main') ||
          fileBase.endsWith('-hero') ||
          fileBase.endsWith('-1') ||
          (!venueImages.hero && !fileNameLower.match(/[2-9]$/))) {
        venueImages.hero = file;
      } else {
        venueImages.gallery.push(file);
      }
    }
  });

  if (!venueImages.hero && venueImages.gallery.length > 0) {
    venueImages.hero = venueImages.gallery.shift();
  }

  return venueImages.hero ? venueImages : null;
}

function getVenues() {
  const venuesPath = path.join(__dirname, '..', 'bassline-app', 'src', 'data', 'venues.js');
  const content = fs.readFileSync(venuesPath, 'utf-8');
  const match = content.match(/export const venues = (\[[\s\S]*?\]);/);
  if (match) {
    return JSON.parse(match[1]);
  }
  return [];
}

function updateVenueData(venues, updatedVenues) {
  const venuesPath = path.join(__dirname, '..', 'bassline-app', 'src', 'data', 'venues.js');
  const content = fs.readFileSync(venuesPath, 'utf-8');
  
  // Update the venues array
  const newContent = content.replace(
    /export const venues = \[[\s\S]*?\];/,
    `export const venues = ${JSON.stringify(updatedVenues, null, 2)};`
  );
  
  fs.writeFileSync(venuesPath, newContent);
}

function copyToAssets(imageFile) {
  // Create assets directory if it doesn't exist
  if (!fs.existsSync(ASSETS_DIR)) {
    fs.mkdirSync(ASSETS_DIR, { recursive: true });
  }

  const sourcePath = path.join(VENUE_IMAGES_DIR, imageFile);
  const destPath = path.join(ASSETS_DIR, imageFile);
  
  // Copy file if it doesn't already exist
  if (!fs.existsSync(destPath)) {
    fs.copyFileSync(sourcePath, destPath);
    return true;
  }
  return false;
}

function main() {
  console.log('🖼️  Updating Venue Images\n');
  
  const venues = getVenues();
  let updatedCount = 0;
  let copiedCount = 0;
  const updates = [];

  venues.forEach(venue => {
    const images = findVenueImages(venue.name, venue.id);
    
    if (images && images.hero) {
      console.log(`✓ Found images for: ${venue.name}`);
      console.log(`  Hero: ${images.hero}`);
      if (images.gallery.length > 0) {
        console.log(`  Gallery: ${images.gallery.length} images`);
      }

      // Copy images to assets
      if (copyToAssets(images.hero)) {
        copiedCount++;
      }
      images.gallery.forEach(img => {
        if (copyToAssets(img)) {
          copiedCount++;
        }
      });

      // Update venue object
      venue.heroImage = `./assets/images/venues/${images.hero}`;
      
      if (images.gallery.length > 0) {
        venue.gallery = images.gallery.map(img => `./assets/images/venues/${img}`);
      }

      updatedCount++;
      updates.push({
        id: venue.id,
        name: venue.name,
        hero: images.hero,
        galleryCount: images.gallery.length
      });
      
      console.log('');
    }
  });

  if (updatedCount > 0) {
    // Update the venues.js file
    updateVenueData(venues, venues);
    
    console.log(`\n✅ Summary:`);
    console.log(`   ${updatedCount} venues updated with local images`);
    console.log(`   ${copiedCount} images copied to assets folder`);
    console.log(`\n📋 Updated venues:`);
    updates.forEach(u => {
      console.log(`   - ${u.name} (ID: ${u.id})`);
      console.log(`     Hero: ${u.hero}`);
      if (u.galleryCount > 0) {
        console.log(`     Gallery: ${u.galleryCount} images`);
      }
    });
  } else {
    console.log('⚠️  No images found in venue-images/ folder');
    console.log('\n💡 Tip: Save images with venue name or ID:');
    console.log('   - bar-part-time-hero.jpg');
    console.log('   - bar-part-time-1.jpg');
    console.log('   - bar-part-time-2.jpg');
    console.log('   OR');
    console.log('   - 1-hero.jpg');
    console.log('   - 1-1.jpg');
    console.log('   - 1-2.jpg');
  }

  console.log('\n');
}

main();


