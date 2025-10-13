#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, '..', 'bassline-app', 'assets', 'images', 'venues');
const VENUES_PATH = path.join(__dirname, '..', 'bassline-app', 'src', 'data', 'venues.js');

function main() {
  console.log('🔧 Fixing Gallery Placement\n');
  
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
  
  console.log(`📸 Processing ${Object.keys(venueImages).length} venues\n`);
  
  // Read file
  let content = fs.readFileSync(VENUES_PATH, 'utf-8');
  let fixed = 0;
  
  // First, fix any galleries that were incorrectly placed inside coordinates
  content = content.replace(
    /"longitude":\s*-?[\d.]+,\s*"gallery":\s*\[[^\]]+\]\s*}/g,
    (match) => {
      fixed++;
      return match.replace(/,\s*"gallery":\s*\[[^\]]+\]/, '');
    }
  );
  
  if (fixed > 0) {
    console.log(`  🔧 Removed ${fixed} incorrectly placed galleries\n`);
  }
  
  // Now add galleries in the correct place
  let added = 0;
  
  Object.entries(venueImages).forEach(([imageBaseName, galleryFiles]) => {
    const sortedFiles = galleryFiles.sort();
    const galleryRequires = sortedFiles
      .map(img => `require("../../assets/images/venues/${img}")`)
      .join(',\n      ');
    
    const imageBaseEscaped = imageBaseName.replace(/-/g, '[-‑]');
    
    // Find: heroImage ... coordinates { lat, long }, optionally goodToKnow/whereToGoIf, then }
    // Add gallery just before the final }
    const venuePattern = new RegExp(
      `("heroImage":\\s*require\\("../../assets/images/venues/${imageBaseEscaped}-hero\\.jpg"\\)[\\s\\S]*?"coordinates":\\s*\\{[^}]+\\}\\s*,?\\s*(?:"(?:goodToKnow|whereToGoIf|accolades)":\\s*"[^"]*"(?:\\s*,\\s*)?)*)(\\s*})(\\s*(?:,|\\]))`,
      'i'
    );
    
    const match = content.match(venuePattern);
    if (match) {
      // Check if gallery already exists
      if (match[1].includes('"gallery":')) {
        console.log(`  ⏭️  ${imageBaseName} - already has gallery`);
        return;
      }
      
      const replacement = `$1,\n    "gallery": [\n      ${galleryRequires}\n    ]$2$3`;
      content = content.replace(venuePattern, replacement);
      console.log(`  ✓ ${imageBaseName}`);
      added++;
    } else {
      console.log(`  ⚠️  ${imageBaseName} - could not find`);
    }
  });
  
  fs.writeFileSync(VENUES_PATH, content);
  console.log(`\n✅ Fixed ${fixed} placements, added ${added} galleries\n`);
}

main();

