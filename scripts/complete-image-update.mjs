#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, '..', 'bassline-app', 'assets', 'images', 'venues');
const VENUES_PATH = path.join(__dirname, '..', 'bassline-app', 'src', 'data', 'venues.js');

// Complete venue name to image name mapping
const VENUE_IMAGE_MAP = {
  'ABV': 'abv',
  'Anina': 'anina',
  'Bar Crenn': 'bar-crenn',
  'Bar Part Time': 'bar-part-time',
  'Bar Sprezzatura': 'bar-sprezzatura',
  'Beaux': 'beaux',
  'Chambers': 'chambers',
  'Dalva': 'dalva',
  'Hi‑Tops': 'hi-tops',
  'High Treason': 'high-treason',
  'Li Po Cocktail Lounge': 'li-po-cocktail-lounge',
  'Make‑Out Room': 'make-out-room',
  'Palm City': 'palm-city',
  'PCH (Pacific Cocktail Haven)': 'pch-pacific-cocktail-haven',
  'Peacekeeper': 'peacekeeper',
  'Press Club': 'press-club',
  'Shoji': 'shoji',
  "Smuggler's Cove": 'smugglers-cove',
  "Tommy's Mexican Restaurant": 'tommys-mexican-restaurant',
  'Trick Dog': 'trick-dog',
  'True Laurel': 'true-laurel',
  'Ungrafted': 'ungrafted',
  'Wildhawk': 'wildhawk',
  
  // Clubs
  '1015 Folsom': '1015-folsom',
  'Audio': 'audio',
  'Halcyon': 'halcyon',
  "Monroe's": 'monroes',
  'Public Works': 'public-works',
  'Temple': 'temple',
  'The Midway': 'the-midway',
  
  // Munchies
  'Cocobang': 'cocobang',
  'Grubstake': 'grubstake',
  'Hinodeya': 'hinodeya',
  'Joyful Garden': 'joyful-garden',
  'Pinecrest': 'pinecrest',
  'Public Izakaya': 'public-izakaya',
  'Taishan': 'taishan',
  'Taqueria El Farolito': 'taqueria-el-farolito',
  'Toyose': 'toyose'
};

function main() {
  console.log('🎯 Complete Image Update\n');
  
  // Get all available images
  const files = fs.readdirSync(ASSETS_DIR);
  const availableImages = {};
  
  files.forEach(file => {
    if (!/\.(jpg|jpeg|png)$/i.test(file)) return;
    
    const isHero = file.includes('-hero');
    let baseName;
    
    if (isHero) {
      baseName = file.replace('-hero.jpg', '').replace('-hero.jpeg', '').replace('-hero.png', '');
    } else {
      const match = file.match(/^(.+)-\d+\.(jpg|jpeg|png)$/i);
      if (match) {
        baseName = match[1];
      } else {
        return;
      }
    }
    
    if (!availableImages[baseName]) {
      availableImages[baseName] = { hero: null, gallery: [] };
    }
    
    if (isHero) {
      availableImages[baseName].hero = file;
    } else {
      availableImages[baseName].gallery.push(file);
    }
  });
  
  // Read and update venues.js
  let content = fs.readFileSync(VENUES_PATH, 'utf-8');
  let updates = 0;
  let galleryUpdates = 0;
  
  // Update each mapped venue
  Object.entries(VENUE_IMAGE_MAP).forEach(([venueName, imageBaseName]) => {
    const images = availableImages[imageBaseName];
    if (!images || !images.hero) {
      console.log(`  ⚠️  No images found for ${venueName} (${imageBaseName})`);
      return;
    }
    
    // Escape special regex characters in venue name
    const escapedName = venueName.replace(/[()[\]{}*+?^$|\\]/g, '\\$&');
    
    // Find and replace heroImage
    const heroRegex = new RegExp(
      `("name":\\s*"${escapedName}"[\\s\\S]*?)"heroImage":\\s*(?:"[^"]*"|require\\([^)]*\\))`,
      'g'
    );
    
    if (heroRegex.test(content)) {
      content = content.replace(
        heroRegex,
        `$1"heroImage": require("../../assets/images/venues/${images.hero}")`
      );
      console.log(`  ✓ ${venueName} → ${images.hero}`);
      updates++;
      
      // Add/update gallery if images exist
      if (images.gallery.length > 0) {
        const sortedGallery = images.gallery.sort();
        const galleryRequires = sortedGallery
          .map(img => `require("../../assets/images/venues/${img}")`)
          .join(',\n      ');
        
        // Check if gallery exists
        const hasGalleryRegex = new RegExp(
          `"name":\\s*"${escapedName}"[\\s\\S]*?"gallery":\\s*\\[`,
          'g'
        );
        
        if (hasGalleryRegex.test(content)) {
          // Replace existing gallery
          const galleryReplaceRegex = new RegExp(
            `("name":\\s*"${escapedName}"[\\s\\S]*?)"gallery":\\s*\\[[^\\]]*\\]`,
            'g'
          );
          content = content.replace(
            galleryReplaceRegex,
            `$1"gallery": [\n      ${galleryRequires}\n    ]`
          );
        } else {
          // Add gallery before closing brace
          const addGalleryRegex = new RegExp(
            `("name":\\s*"${escapedName}"[\\s\\S]*?)(\\s*}\\s*[,\\]])`,
            'g'
          );
          content = content.replace(
            addGalleryRegex,
            `$1,\n    "gallery": [\n      ${galleryRequires}\n    ]$2`
          );
        }
        console.log(`     + ${sortedGallery.length} gallery images`);
        galleryUpdates++;
      }
    } else {
      console.log(`  ⚠️  Could not find venue: ${venueName}`);
    }
  });
  
  fs.writeFileSync(VENUES_PATH, content);
  
  console.log(`\n✅ Complete!`);
  console.log(`   ${updates} venues updated with hero images`);
  console.log(`   ${galleryUpdates} venues updated with gallery images\n`);
}

main();

