#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, '..', 'bassline-app', 'assets', 'images', 'venues');
const VENUES_PATH = path.join(__dirname, '..', 'bassline-app', 'src', 'data', 'venues.js');

function main() {
  console.log('🎬 Final Gallery Fix\n');
  
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
  
  // Read file and split into venue objects
  let content = fs.readFileSync(VENUES_PATH, 'utf-8');
  let added = 0;
  
  // For each venue with gallery images
  Object.entries(venueImages).forEach(([imageBaseName, galleryFiles]) => {
    const sortedFiles = galleryFiles.sort();
    const galleryRequires = sortedFiles
      .map(img => `require("../../assets/images/venues/${img}")`)
      .join(',\n      ');
    
    // Check if gallery already exists for this venue
    const heroImagePath = `${imageBaseName}-hero.jpg`;
    const imageBaseEscaped = imageBaseName.replace(/-/g, '[-‑]');
    
    // Check if this venue already has a gallery
    const checkPattern = new RegExp(
      `"heroImage":\\s*require\\("../../assets/images/venues/${imageBaseEscaped}-hero\\.jpg"\\)[\\s\\S]{1,1000}?"gallery":\\s*\\[`,
      'i'
    );
    
    if (checkPattern.test(content)) {
      console.log(`  ⏭️  ${imageBaseName} - already has gallery`);
      return;
    }
    
    // Find the closing brace for this venue - it should be after coordinates
    // Look for pattern: heroImage + ... + coordinates + ... + }
    const venuePattern = new RegExp(
      `("heroImage":\\s*require\\("../../assets/images/venues/${imageBaseEscaped}-hero\\.jpg"\\)[\\s\\S]{1,2000}?"coordinates":\\s*\\{[^}]+\\})(\\s*)(})(\\s*[,\\]])`,
      'i'
    );
    
    if (venuePattern.test(content)) {
      // Add gallery before the closing brace
      content = content.replace(
        venuePattern,
        `$1,\n    "gallery": [\n      ${galleryRequires}\n    ]$2$3$4`
      );
      console.log(`  ✓ Added gallery to ${imageBaseName} (${sortedFiles.length} images)`);
      added++;
    } else {
      console.log(`  ⚠️  Could not find pattern for ${imageBaseName}`);
    }
  });
  
  fs.writeFileSync(VENUES_PATH, content);
  console.log(`\n✅ Added ${added} galleries!\n`);
}

main();

