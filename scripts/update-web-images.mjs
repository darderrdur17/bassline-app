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
      const baseName = file.replace(/\.(jpg|jpeg|png)$/i, '');
      const isHero = /-hero$/i.test(baseName);
      const venueSlug = baseName.replace(/-hero$/i, '').replace(/-\d+$/i, '');
      
      if (isHero) {
        const slugPattern = venueSlug.replace(/-/g, '[- \u00A0]');
        const pattern = new RegExp(
          `(\"name\":\\s*\"[^\"]*${slugPattern}[^\"]*\"[\\s\\S]*?)\"heroImage\":\\s*(?:\"[^\"]*\")`,
          'i'
        );
        if (pattern.test(content)) {
          content = content.replace(pattern, `$1\"heroImage\": \"/images/venues/${file}\"`);
          updates++;
        }
      }
    }
  });
  
  // Add gallery arrays for venues with multiple images
  const venueImages = {};
  files.forEach(file => {
    if (/\.(jpg|jpeg|png)$/i.test(file)) {
      const withoutExt = file.replace(/\.(jpg|jpeg|png)$/i, '');
      const isHero = /-hero$/i.test(withoutExt);
      const numberMatch = withoutExt.match(/-(\d+)$/);
      if (!isHero && numberMatch) {
        const venueSlug = withoutExt.replace(/-(\d+)$/i, '');
        if (!venueImages[venueSlug]) {
          venueImages[venueSlug] = [];
        }
        venueImages[venueSlug].push(file);
      }
    }
  });
  
  Object.entries(venueImages).forEach(([venueSlug, images]) => {
    const imageList = images.map(img => `\"/images/venues/${img}\"`).join(',\n      ');
    const slugPattern = venueSlug.replace(/-/g, '[- \u00A0]');
    const hasGalleryPattern = new RegExp(
      `\"name\":\\s*\"[^\"]*${slugPattern}[^\"]*\"[\\s\\S]*?\"gallery\":\\s*\\[`,
      'i'
    );
    if (hasGalleryPattern.test(content)) {
      const pattern = new RegExp(
        `(\"name\":\\s*\"[^\"]*${slugPattern}[^\"]*\"[\\s\\S]*?)\"gallery\":\\s*\\[[^\\]]*\\]`,
        'i'
      );
      content = content.replace(pattern, `$1\"gallery\": [\n      ${imageList}\n    ]`);
    } else {
      const pattern = new RegExp(
        `(\"name\":\\s*\"[^\"]*${slugPattern}[^\"]*\"[\\s\\S]*?)(\\s*}\\s*[,\\]])`,
        'i'
      );
      content = content.replace(pattern, `$1,\n    \"gallery\": [\n      ${imageList}\n    ]$2`);
    }
  });
  
  fs.writeFileSync(VENUES_PATH, content);
  console.log(`   ✓ ${updates} venues updated with images`);
  
  console.log('\n✅ Web images ready!\n');
}

main();

