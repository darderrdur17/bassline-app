#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, '..', 'bassline-app', 'assets', 'images', 'venues');
const VENUES_PATH = path.join(__dirname, '..', 'bassline-app', 'src', 'data', 'venues.js');

function main() {
  console.log('🎯 Ultimate Gallery Fix\n');
  
  // Get all gallery images
  const files = fs.readdirSync(ASSETS_DIR);
  const venueImages = {};
  
  files.forEach(file => {
    if (!/\.(jpg|jpeg|png)$/i.test(file)) return;
    if (file.includes('-hero')) return;
    
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
  let added = 0;
  let skipped = 0;
  
  // For each venue with gallery images
  Object.entries(venueImages).forEach(([imageBaseName, galleryFiles]) => {
    const sortedFiles = galleryFiles.sort();
    const galleryRequires = sortedFiles
      .map(img => `require("../../assets/images/venues/${img}")`)
      .join(',\n      ');
    
    const imageBaseEscaped = imageBaseName.replace(/-/g, '[-‑]');
    
    // Check if gallery already exists
    const hasGalleryPattern = new RegExp(
      `${imageBaseEscaped}-hero\\.jpg[\\s\\S]{1,2000}?"gallery":\\s*\\[`,
      'i'
    );
    
    if (hasGalleryPattern.test(content)) {
      console.log(`  ⏭️  ${imageBaseName} - already has gallery`);
      skipped++;
      return;
    }
    
    // Find the venue and add gallery just before the closing brace
    // Strategy: Find heroImage, then find the NEXT closing brace that's followed by a comma or ]
    // This assumes the venue object ends with a field, then whitespace, then }
    const venuePattern = new RegExp(
      `("heroImage":\\s*require\\("../../assets/images/venues/${imageBaseEscaped}-hero\\.jpg"\\)[\\s\\S]{1,3000}?)(\\s*)(})(\\s*(?:,|\\]))`,
      'i'
    );
    
    const match = content.match(venuePattern);
    if (match) {
      // We found the venue. Now we need to insert the gallery before the closing brace.
      // The match[1] contains everything up to (but not including) the closing brace
      // We need to add a comma and the gallery field
      
      const replacement = `$1,\n    "gallery": [\n      ${galleryRequires}\n    ]$2$3$4`;
      content = content.replace(venuePattern, replacement);
      console.log(`  ✓ ${imageBaseName} (${sortedFiles.length} images)`);
      added++;
    } else {
      console.log(`  ⚠️  ${imageBaseName} - pattern not found`);
    }
  });
  
  fs.writeFileSync(VENUES_PATH, content);
  console.log(`\n✅ Done!`);
  console.log(`   ${added} galleries added`);
  console.log(`   ${skipped} already existed\n`);
}

main();

