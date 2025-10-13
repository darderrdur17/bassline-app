#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WEB_PUBLIC_DIR = path.join(__dirname, '..', 'bassline-web', 'public', 'images', 'venues');
const VENUES_PATH = path.join(__dirname, '..', 'bassline-web', 'src', 'data', 'venues.ts');

function main() {
  console.log('🌐 Adding Web Galleries\n');
  
  // Get all gallery images
  const files = fs.readdirSync(WEB_PUBLIC_DIR);
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
  
  Object.entries(venueImages).forEach(([imageBaseName, galleryFiles]) => {
    const sortedFiles = galleryFiles.sort();
    const galleryPaths = sortedFiles
      .map(img => `"/images/venues/${img}"`)
      .join(',\n      ');
    
    const imageBaseEscaped = imageBaseName.replace(/-/g, '[-‑]');
    
    // Check if gallery already exists
    if (new RegExp(`${imageBaseEscaped}-hero\\.jpg[\\s\\S]{1,2000}?"gallery":\\s*\\[`, 'i').test(content)) {
      console.log(`  ⏭️  ${imageBaseName} - already has gallery`);
      return;
    }
    
    // Find venue and add gallery
    const venuePattern = new RegExp(
      `("heroImage":\\s*"/images/venues/${imageBaseEscaped}-hero\\.jpg"[\\s\\S]*?"coordinates":\\s*\\{[^}]+\\}\\s*,?\\s*(?:"(?:goodToKnow|whereToGoIf|accolades)":\\s*"[^"]*"(?:\\s*,\\s*)?)*)(\\s*})(\\s*(?:,|\\]))`,
      'i'
    );
    
    const match = content.match(venuePattern);
    if (match) {
      const replacement = `$1,\n    "gallery": [\n      ${galleryPaths}\n    ]$2$3`;
      content = content.replace(venuePattern, replacement);
      console.log(`  ✓ ${imageBaseName}`);
      added++;
    } else {
      console.log(`  ⚠️  ${imageBaseName} - not found`);
    }
  });
  
  fs.writeFileSync(VENUES_PATH, content);
  console.log(`\n✅ Added ${added} galleries to web version\n`);
}

main();

