#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, '..', 'bassline-app', 'assets', 'images', 'venues');
const WEB_PUBLIC_DIR = path.join(__dirname, '..', 'bassline-web', 'public', 'images', 'venues');
const VENUES_PATH = path.join(__dirname, '..', 'bassline-web', 'src', 'data', 'venues.ts');

function main() {
  console.log('🌐 Updating Web Images\n');
  
  // Create web public directory
  if (!fs.existsSync(WEB_PUBLIC_DIR)) {
    fs.mkdirSync(WEB_PUBLIC_DIR, { recursive: true });
  }
  
  // Copy all images from app assets to web public
  console.log('📁 Copying images to web public folder...');
  const files = fs.readdirSync(ASSETS_DIR);
  let copied = 0;
  
  files.forEach(file => {
    if (/\.(jpg|jpeg|png)$/i.test(file)) {
      fs.copyFileSync(
        path.join(ASSETS_DIR, file),
        path.join(WEB_PUBLIC_DIR, file)
      );
      copied++;
    }
  });
  
  console.log(`   ✓ ${copied} images copied`);
  
  // Update venues.ts
  console.log('\n🔄 Updating venues.ts...');
  let content = fs.readFileSync(VENUES_PATH, 'utf-8');
  
  // Replace all heroImage and gallery URLs
  let updates = 0;
  
  files.forEach(file => {
    if (/\.(jpg|jpeg|png)$/i.test(file)) {
      const isHero = file.includes('-hero');
      const venueName = file.split('-hero')[0].split('-')[0];
      
      if (isHero) {
        // Replace heroImage URLs
        const pattern = new RegExp(
          `("name":\\s*"[^"]*${venueName.replace(/-/g, '[- ]')}[^"]*"[\\s\\S]*?)"heroImage":\\s*"[^"]*"`,
          'i'
        );
        
        if (pattern.test(content)) {
          content = content.replace(pattern, `$1"heroImage": "/images/venues/${file}"`);
          updates++;
        }
      }
    }
  });
  
  // Add gallery arrays for venues with multiple images
  const venueImages = {};
  files.forEach(file => {
    if (/\.(jpg|jpeg|png)$/i.test(file)) {
      const parts = file.replace(/\.(jpg|jpeg|png)$/i, '').split('-');
      const isHero = file.includes('-hero');
      const lastPart = parts[parts.length - 1];
      
      if (!isHero && /^\d+$/.test(lastPart)) {
        const venueName = parts.slice(0, -1).join('-');
        if (!venueImages[venueName]) {
          venueImages[venueName] = [];
        }
        venueImages[venueName].push(file);
      }
    }
  });
  
  Object.entries(venueImages).forEach(([venueName, images]) => {
    const imageList = images.map(img => `"/images/venues/${img}"`).join(',\n      ');
    
    // Check if gallery already exists
    const hasGalleryPattern = new RegExp(
      `"name":\\s*"[^"]*${venueName.replace(/-/g, '[- ]')}[^"]*"[\\s\\S]*?"gallery":\\s*\\[`,
      'i'
    );
    
    if (hasGalleryPattern.test(content)) {
      // Update existing gallery
      const pattern = new RegExp(
        `("name":\\s*"[^"]*${venueName.replace(/-/g, '[- ]')}[^"]*"[\\s\\S]*?)"gallery":\\s*\\[[^\\]]*\\]`,
        'i'
      );
      content = content.replace(pattern, `$1"gallery": [\n      ${imageList}\n    ]`);
    } else {
      // Add gallery before closing brace
      const pattern = new RegExp(
        `("name":\\s*"[^"]*${venueName.replace(/-/g, '[- ]')}[^"]*"[\\s\\S]*?)(\\s*}\\s*[,\\]])`,
        'i'
      );
      content = content.replace(pattern, `$1,\n    "gallery": [\n      ${imageList}\n    ]$2`);
    }
  });
  
  fs.writeFileSync(VENUES_PATH, content);
  console.log(`   ✓ ${updates} venues updated with images`);
  
  console.log('\n✅ Web images ready!\n');
}

main();

