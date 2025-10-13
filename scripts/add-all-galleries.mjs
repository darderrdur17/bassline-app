#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, '..', 'bassline-app', 'assets', 'images', 'venues');
const VENUES_PATH = path.join(__dirname, '..', 'bassline-app', 'src', 'data', 'venues.js');

function main() {
  console.log('🖼️  Adding All Gallery Images\n');
  
  // Get all image files
  const files = fs.readdirSync(ASSETS_DIR);
  const venueImages = {};
  
  files.forEach(file => {
    if (!/\.(jpg|jpeg|png)$/i.test(file)) return;
    
    if (file.includes('-hero')) return; // Skip hero images
    
    // Gallery image like "abv-1.jpg"
    const match = file.match(/^(.+)-\d+\.(jpg|jpeg|png)$/i);
    if (match) {
      const venueName = match[1];
      if (!venueImages[venueName]) {
        venueImages[venueName] = [];
      }
      venueImages[venueName].push(file);
    }
  });
  
  console.log(`📸 Found gallery images for ${Object.keys(venueImages).length} venues\n`);
  
  // Read file
  let content = fs.readFileSync(VENUES_PATH, 'utf-8');
  
  // For each image set, find the matching venue and add gallery
  Object.entries(venueImages).forEach(([imageBaseName, galleryFiles]) => {
    const sortedFiles = galleryFiles.sort();
    const galleryRequires = sortedFiles
      .map(img => `require("../../assets/images/venues/${img}")`)
      .join(',\n      ');
    
    // Build pattern to find venue closing brace
    // We need to find: whereToGoIf field OR goodToKnow field, then add gallery before the closing }
    
    // First, let's try to find if this venue already has a gallery
    const imageBaseEscaped = imageBaseName.replace(/-/g, '[-‑]'); // Match both regular and special hyphens
    const hasGalleryPattern = new RegExp(
      `"heroImage":\\s*require\\("../../assets/images/venues/${imageBaseEscaped}-hero\\.jpg"\\)[\\s\\S]*?"gallery":\\s*\\[`,
      'i'
    );
    
    if (hasGalleryPattern.test(content)) {
      console.log(`  ⏭️  ${imageBaseName} - gallery already exists, skipping`);
      return;
    }
    
    // Find the venue by its heroImage path and add gallery after whereToGoIf or goodToKnow
    const addGalleryPattern = new RegExp(
      `("heroImage":\\s*require\\("../../assets/images/venues/${imageBaseEscaped}-hero\\.jpg"\\)[\\s\\S]*?(?:"whereToGoIf"|"goodToKnow"):\\s*"[^"]*")(\\s*)(}\\s*[,\\]])`,
      'i'
    );
    
    if (addGalleryPattern.test(content)) {
      content = content.replace(
        addGalleryPattern,
        `$1,\n    "gallery": [\n      ${galleryRequires}\n    ]$2$3`
      );
      console.log(`  ✓ Added ${sortedFiles.length} gallery images to ${imageBaseName}`);
    } else {
      console.log(`  ⚠️  Could not find insertion point for ${imageBaseName}`);
    }
  });
  
  fs.writeFileSync(VENUES_PATH, content);
  console.log(`\n✅ Complete!\n`);
}

main();

