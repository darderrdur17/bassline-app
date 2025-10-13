#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || 'YOUR_KEY_HERE';
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY || null;

// Image type mappings for better stock photos
const IMAGE_SEARCH_TERMS = {
  'Wine Bar': ['wine bar interior', 'cozy wine bar', 'natural wine bar'],
  'Cocktail Bar': ['cocktail bar interior', 'craft cocktail bar', 'mixology bar'],
  'Bar': ['san francisco bar', 'neighborhood bar', 'dive bar'],
  'Club': ['nightclub interior', 'dance club', 'nightlife'],
  'Restaurant': ['restaurant interior', 'late night restaurant'],
  'Tiki Bar': ['tiki bar', 'tropical bar interior'],
  'Rooftop Bar': ['rooftop bar view', 'rooftop lounge'],
  'Speakeasy / Listening Bar': ['speakeasy bar', 'listening bar vinyl'],
  'Sake Bar / Wine Bar': ['sake bar', 'japanese bar interior']
};

// Helper function to download image
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(filepath);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

// Fetch from Unsplash
async function fetchUnsplashImage(searchTerm, index = 0) {
  if (UNSPLASH_ACCESS_KEY === 'YOUR_KEY_HERE') {
    console.log('⚠️  No Unsplash API key provided, using placeholder URLs');
    return null;
  }

  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchTerm)}&per_page=30&client_id=${UNSPLASH_ACCESS_KEY}`;
  
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.results && json.results.length > index) {
            resolve({
              url: json.results[index].urls.regular,
              downloadUrl: json.results[index].urls.raw + '&w=1200&h=800&fit=crop',
              photographer: json.results[index].user.name,
              unsplashUrl: json.results[index].links.html
            });
          } else {
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

// Search Google Places for venue
async function searchGooglePlaces(venueName, neighborhood) {
  if (!GOOGLE_PLACES_API_KEY) {
    return null;
  }

  const searchQuery = `${venueName} ${neighborhood} San Francisco`;
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(searchQuery)}&inputtype=textquery&fields=place_id,photos&key=${GOOGLE_PLACES_API_KEY}`;

  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.candidates && json.candidates.length > 0 && json.candidates[0].photos) {
            const photoReference = json.candidates[0].photos[0].photo_reference;
            const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1200&photo_reference=${photoReference}&key=${GOOGLE_PLACES_API_KEY}`;
            resolve({
              placeId: json.candidates[0].place_id,
              photoUrl: photoUrl
            });
          } else {
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

// Read venues from JSON
function getVenues() {
  const venuesPath = path.join(__dirname, '..', 'bassline-app', 'src', 'data', 'venues.js');
  const content = fs.readFileSync(venuesPath, 'utf-8');
  
  // Extract the JSON array from the export statement
  const match = content.match(/export const venues = (\[[\s\S]*?\]);/);
  if (match) {
    return JSON.parse(match[1]);
  }
  return [];
}

// Main function
async function main() {
  console.log('🖼️  Bassline Venue Image Finder\n');
  console.log('📊 Loading venues...\n');

  const venues = getVenues();
  console.log(`Found ${venues.length} venues\n`);

  const results = [];
  const outputDir = path.join(__dirname, '..', 'venue-images');
  
  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('🔍 Searching for images...\n');

  for (let i = 0; i < venues.length; i++) {
    const venue = venues[i];
    const progress = `[${i + 1}/${venues.length}]`;
    
    console.log(`${progress} ${venue.name} (${venue.type})`);

    let imageSource = 'placeholder';
    let imageUrl = venue.heroImage;
    let notes = [];

    // Try Google Places first (if API key provided)
    if (GOOGLE_PLACES_API_KEY) {
      console.log(`  → Searching Google Places...`);
      const googleResult = await searchGooglePlaces(venue.name, venue.neighborhood);
      if (googleResult) {
        imageUrl = googleResult.photoUrl;
        imageSource = 'google_places';
        notes.push(`Google Place ID: ${googleResult.placeId}`);
        console.log(`  ✓ Found on Google Places`);
      }
    }

    // If no Google result, try Unsplash
    if (imageSource === 'placeholder' && UNSPLASH_ACCESS_KEY !== 'YOUR_KEY_HERE') {
      const searchTerms = IMAGE_SEARCH_TERMS[venue.type] || ['bar interior', 'restaurant'];
      const searchTerm = `${searchTerms[i % searchTerms.length]} san francisco`;
      
      console.log(`  → Searching Unsplash for "${searchTerm}"...`);
      const unsplashResult = await fetchUnsplashImage(searchTerm, i % 10);
      
      if (unsplashResult) {
        imageUrl = unsplashResult.url;
        imageSource = 'unsplash';
        notes.push(`Photographer: ${unsplashResult.photographer}`);
        notes.push(`Unsplash: ${unsplashResult.unsplashUrl}`);
        console.log(`  ✓ Found on Unsplash`);
      }
    }

    // Check if venue has Instagram
    if (venue.instagram) {
      notes.push(`Instagram: ${venue.instagram}`);
      console.log(`  ℹ️  Has Instagram account`);
    }

    results.push({
      id: venue.id,
      name: venue.name,
      type: venue.type,
      neighborhood: venue.neighborhood,
      imageUrl: imageUrl,
      imageSource: imageSource,
      instagram: venue.instagram || '',
      notes: notes.join('; ')
    });

    console.log('');
    
    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Generate CSV report
  const reportPath = path.join(outputDir, 'image-sources.csv');
  const csvHeader = 'ID,Name,Type,Neighborhood,Image Source,Image URL,Instagram,Notes\n';
  const csvRows = results.map(r => 
    `${r.id},"${r.name}","${r.type}","${r.neighborhood}",${r.imageSource},"${r.imageUrl}","${r.instagram}","${r.notes}"`
  ).join('\n');
  
  fs.writeFileSync(reportPath, csvHeader + csvRows);

  // Generate markdown report
  const mdPath = path.join(outputDir, 'IMAGE-REPORT.md');
  let markdown = '# Venue Image Sources Report\n\n';
  markdown += `Generated: ${new Date().toLocaleString()}\n\n`;
  markdown += `Total Venues: ${venues.length}\n\n`;
  
  const summary = {
    google_places: results.filter(r => r.imageSource === 'google_places').length,
    unsplash: results.filter(r => r.imageSource === 'unsplash').length,
    placeholder: results.filter(r => r.imageSource === 'placeholder').length,
    has_instagram: results.filter(r => r.instagram).length
  };
  
  markdown += '## Summary\n\n';
  markdown += `- ✅ Google Places: ${summary.google_places}\n`;
  markdown += `- 🎨 Unsplash: ${summary.unsplash}\n`;
  markdown += `- 📷 Placeholder: ${summary.placeholder}\n`;
  markdown += `- 📱 Has Instagram: ${summary.has_instagram}\n\n`;
  
  markdown += '## Venues by Type\n\n';
  const byType = {};
  results.forEach(r => {
    if (!byType[r.type]) byType[r.type] = [];
    byType[r.type].push(r);
  });
  
  Object.keys(byType).sort().forEach(type => {
    markdown += `### ${type} (${byType[type].length})\n\n`;
    byType[type].forEach(venue => {
      markdown += `**${venue.name}** - ${venue.neighborhood}\n`;
      markdown += `- Image: ${venue.imageSource}\n`;
      if (venue.instagram) {
        markdown += `- Instagram: ${venue.instagram}\n`;
      }
      markdown += `\n`;
    });
    markdown += '\n';
  });
  
  markdown += '## Next Steps\n\n';
  markdown += '1. **Review image-sources.csv** - Contains all venue image URLs\n';
  markdown += '2. **Manual Updates Needed**:\n';
  markdown += `   - ${summary.placeholder} venues still using placeholders\n`;
  markdown += `   - ${summary.has_instagram} venues have Instagram - download from there\n`;
  markdown += '3. **Download Real Photos**:\n';
  markdown += '   - Visit venue Instagram accounts\n';
  markdown += '   - Save 1 hero image + 3 gallery images per venue\n';
  markdown += '   - Use naming: `{venue-id}-hero.jpg`, `{venue-id}-1.jpg`, etc.\n';
  markdown += '4. **Update venues.js** with local image paths\n\n';
  
  fs.writeFileSync(mdPath, markdown);

  console.log('\n✅ Complete!\n');
  console.log(`📊 Summary:`);
  console.log(`   - Google Places: ${summary.google_places} venues`);
  console.log(`   - Unsplash: ${summary.unsplash} venues`);
  console.log(`   - Placeholder: ${summary.placeholder} venues`);
  console.log(`   - Has Instagram: ${summary.has_instagram} venues\n`);
  console.log(`📁 Reports saved to: ${outputDir}/`);
  console.log(`   - image-sources.csv`);
  console.log(`   - IMAGE-REPORT.md\n`);
  
  if (summary.placeholder === venues.length) {
    console.log('💡 Tip: Set UNSPLASH_ACCESS_KEY or GOOGLE_PLACES_API_KEY environment variable');
    console.log('   to fetch real images automatically.\n');
  }
}

main().catch(console.error);


