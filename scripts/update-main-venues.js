#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MAIN_VENUES_JS = path.join(__dirname, '..', 'src', 'data', 'venues.js');
const VENUE_IMAGES_JS = path.join(__dirname, '..', 'src', 'data', 'venueImages.js');

// Read the venueImages file to get the available images
const venueImagesContent = fs.readFileSync(VENUE_IMAGES_JS, 'utf-8');
const venueImages = {};

// Extract venue names and their image data
const venueRegex = /"([^"]+)":\s*\{\s*hero:\s*require\([^)]+\)/g;
let match;
while ((match = venueRegex.exec(venueImagesContent)) !== null) {
  const venueName = match[1];
  // Check if this venue has images
  if (venueImagesContent.includes(`"${venueName}": {`)) {
    venueImages[venueName] = true;
  }
}

console.log(`Found ${Object.keys(venueImages).length} venues with images`);

// Read the main venues file
let content = fs.readFileSync(MAIN_VENUES_JS, 'utf-8');

// Use a simpler approach - replace heroImage and gallery line by line
const lines = content.split('\n');
const updatedLines = [];

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];

  // Check if this line contains a heroImage with unsplash URL
  if (line.includes('"heroImage":') && line.includes('unsplash.com')) {
    // Find the venue name by looking backwards for the name field
    let venueName = null;
    for (let j = i - 1; j >= 0 && j > i - 20; j--) { // Look back up to 20 lines
      if (lines[j].includes('"name":')) {
        const nameMatch = lines[j].match(/"name":\s*"([^"]+)"/);
        if (nameMatch) {
          venueName = nameMatch[1];
          break;
        }
      }
    }

    if (venueName && venueImages[venueName]) {
      line = line.replace(
        /"heroImage":\s*"https:\/\/images\.unsplash\.com[^"]*"/,
        `"heroImage": venueImages[nameToImageKey('${venueName}')]?.hero || require('../../assets/icon.png')`
      );
    }
  }

  // Check if this line starts a gallery array
  if (line.includes('"gallery":') && line.includes('[')) {
    // Check if this gallery contains unsplash URLs (either on this line or next few lines)
    let hasUnsplash = line.includes('unsplash.com');
    if (!hasUnsplash) {
      // Check the next few lines for unsplash URLs
      for (let checkIndex = i + 1; checkIndex < lines.length && checkIndex < i + 10; checkIndex++) {
        if (lines[checkIndex].includes('unsplash.com')) {
          hasUnsplash = true;
          break;
        }
        if (lines[checkIndex].includes(']')) break; // Stop if we hit the end of the array
      }
    }

    if (!hasUnsplash) continue; // Skip if no unsplash URLs found
    // Find the venue name by looking backwards for the name field
    let venueName = null;
    for (let j = i - 1; j >= 0 && j > i - 20; j--) { // Look back up to 20 lines
      if (lines[j].includes('"name":')) {
        const nameMatch = lines[j].match(/"name":\s*"([^"]+)"/);
        if (nameMatch) {
          venueName = nameMatch[1];
          break;
        }
      }
    }

    if (venueName && venueImages[venueName]) {
      // Find the end of the gallery array
      let galleryEndIndex = i;
      let bracketCount = (line.match(/\[/g) || []).length - (line.match(/\]/g) || []).length;

      while (galleryEndIndex < lines.length && bracketCount > 0) {
        galleryEndIndex++;
        if (lines[galleryEndIndex].includes('[')) bracketCount++;
        if (lines[galleryEndIndex].includes(']')) bracketCount--;
      }

      if (galleryEndIndex < lines.length) {
        // Replace the entire gallery block with the new reference
        updatedLines[i] = `    "gallery": venueImages[nameToImageKey('${venueName}')]?.gallery || [],`;

        // Remove the gallery content lines
        for (let k = i + 1; k <= galleryEndIndex; k++) {
          updatedLines[k] = null; // Mark for removal
        }

        // Skip processing the removed lines
        i = galleryEndIndex;
      }
    }
  }

  updatedLines.push(line);
}

content = updatedLines.filter(line => line !== null).join('\n');

fs.writeFileSync(MAIN_VENUES_JS, content);
console.log('✅ Updated main venues.js with actual venue images');
