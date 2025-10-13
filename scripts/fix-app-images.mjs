#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, '..', 'bassline-app', 'assets', 'images', 'venues');
const VENUES_PATH = path.join(__dirname, '..', 'bassline-app', 'src', 'data', 'venues.js');

function normalizeVenueName(name) {
  return name.toLowerCase()
    .replace(/['\u2019]/g, '')  // Remove apostrophes
    .replace(/[&]/g, 'and')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
}

function main() {
  console.log('🔧 Fixing Mobile App Images\n');
  
  // Get all image files
  const files = fs.readdirSync(ASSETS_DIR);
  const venueImages = {};
  
  files.forEach(file => {
    if (!/\.(jpg|jpeg|png)$/i.test(file)) return;
    
    const isHero = file.includes('-hero');
    let venueName;
    
    if (isHero) {
      venueName = file.replace('-hero.jpg', '').replace('-hero.jpeg', '').replace('-hero.png', '');
    } else {
      // Gallery image like "abv-1.jpg"
      const match = file.match(/^(.+)-\d+\.(jpg|jpeg|png)$/i);
      if (match) {
        venueName = match[1];
      } else {
        return;
      }
    }
    
    if (!venueImages[venueName]) {
      venueImages[venueName] = { hero: null, gallery: [] };
    }
    
    if (isHero) {
      venueImages[venueName].hero = file;
    } else {
      venueImages[venueName].gallery.push(file);
    }
  });
  
  console.log(`📸 Found images for ${Object.keys(venueImages).length} venues`);
  
  // Read venues.js
  let content = fs.readFileSync(VENUES_PATH, 'utf-8');
  let updates = 0;
  
  // Parse the venues array to get exact venue names
  const venuesMatch = content.match(/export const venues = \[([\s\S]*)\];/);
  if (!venuesMatch) {
    console.log('❌ Could not parse venues.js');
    return;
  }
  
  // For each venue with images
  Object.entries(venueImages).forEach(([imageVenueName, images]) => {
    if (!images.hero) return;
    
    // Try to find a matching venue by name
    const venueRegex = new RegExp(`\\{[^}]*"name":\\s*"([^"]+)"[^}]*"heroImage":\\s*"[^"]*"[^}]*\\}`, 'g');
    let match;
    
    while ((match = venueRegex.exec(content)) !== null) {
      const actualVenueName = match[1];
      const normalizedName = normalizeVenueName(actualVenueName);
      
      if (normalizedName === imageVenueName || normalizedName.includes(imageVenueName) || imageVenueName.includes(normalizedName)) {
        // Found a match! Replace the heroImage
        const venueBlock = match[0];
        const updatedBlock = venueBlock.replace(
          /"heroImage":\s*"[^"]*"/,
          `"heroImage": require("../../assets/images/venues/${images.hero}")`
        );
        
        content = content.replace(venueBlock, updatedBlock);
        updates++;
        console.log(`  ✓ Updated ${actualVenueName} with ${images.hero}`);
        
        // Add gallery if exists
        if (images.gallery.length > 0) {
          const galleryRequires = images.gallery
            .sort()
            .map(img => `require("../../assets/images/venues/${img}")`)
            .join(',\n      ');
          
          // Check if venue already has gallery
          if (updatedBlock.includes('"gallery":')) {
            // Replace existing gallery
            const withGallery = updatedBlock.replace(
              /"gallery":\s*\[[^\]]*\]/,
              `"gallery": [\n      ${galleryRequires}\n    ]`
            );
            content = content.replace(updatedBlock, withGallery);
          } else {
            // Add gallery before closing brace
            const withGallery = updatedBlock.replace(
              /(\s*)}(\s*[,\]])/,
              `,\n    "gallery": [\n      ${galleryRequires}\n    ]$1}$2`
            );
            content = content.replace(updatedBlock, withGallery);
          }
        }
        
        break;
      }
    }
  });
  
  fs.writeFileSync(VENUES_PATH, content);
  console.log(`\n✅ Updated ${updates} venues in mobile app\n`);
}

main();

