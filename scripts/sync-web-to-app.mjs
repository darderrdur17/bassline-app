import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const webVenuesPath = path.join(repoRoot, 'bassline-web', 'src', 'data', 'venues.ts');
const appVenuesPath = path.join(repoRoot, 'bassline-app', 'src', 'data', 'venues.js');

// Read web data
const webSrc = fs.readFileSync(webVenuesPath, 'utf8');
const webVenuesMatch = webSrc.match(/export const venues: Venue\[\] = (\[[\s\S]*?\n\]);/);
if (!webVenuesMatch) throw new Error('Could not parse web venues');

// Parse web JSON (removing TypeScript annotations)
const webJson = JSON.parse(webVenuesMatch[1]
  .replace(/,(\s*[}\]])/g, '$1') // trailing commas
);

console.log(`Loaded ${webJson.length} venues from web`);

// Helper to normalize venue name to image key
function nameToImageKey(name) {
  if (!name) return '';
  return name
    .replace(/'s\b/gi, 's')
    .replace(/‑/g, '-')
    .replace(/[^A-Za-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');
}

// Convert web venue to app format
function convertVenue(webVenue) {
  const imageKey = nameToImageKey(webVenue.name);
  
  // Determine if we have local images based on heroImage path
  const hasLocalImages = webVenue.heroImage && webVenue.heroImage.startsWith('/images/venues/');
  
  const appVenue = {
    id: webVenue.id,
    name: webVenue.name,
    type: webVenue.type,
    neighborhood: webVenue.neighborhood,
    rating: webVenue.rating,
    pricing: webVenue.pricing,
    averageDrinkPrice: webVenue.averageDrinkPrice,
    hours: webVenue.hours,
    heroImage: hasLocalImages 
      ? `require('../data/venueImages').venueImages['${imageKey}']?.hero || require('../../assets/icon.png')`
      : (webVenue.heroImage ? `'${webVenue.heroImage}'` : `require('../../assets/icon.png')`),
    description: webVenue.description,
    tags: webVenue.tags || [],
    cuisine: webVenue.cuisine,
    shortDescription: webVenue.shortDescription,
    instagram: webVenue.instagram,
    ambiance: webVenue.ambiance,
    recommendedDrinks: webVenue.recommendedDrinks,
    recommendations: webVenue.recommendations,
    coordinates: webVenue.coordinates,
    goodToKnow: webVenue.goodToKnow,
    whereToGoIf: webVenue.whereToGoIf,
    accolades: webVenue.accolades,
    yelpUrl: webVenue.yelpUrl,
    resyUrl: webVenue.resyUrl,
    musicGenre: webVenue.musicGenre,
    openPast2AM: webVenue.openPast2AM,
  };
  
  // Add gallery if exists
  if (hasLocalImages && webVenue.gallery && webVenue.gallery.length > 0) {
    appVenue.gallery = `require('../data/venueImages').venueImages['${imageKey}']?.gallery || []`;
  }
  
  // Remove undefined/null values
  Object.keys(appVenue).forEach(key => {
    if (appVenue[key] === undefined || appVenue[key] === null) {
      delete appVenue[key];
    }
  });
  
  return appVenue;
}

// Convert all venues
const appVenues = webJson.map(convertVenue);

// Generate JS file content
function generateAppVenuesFile(venues) {
  const lines = [];
  lines.push('import { venueImages, nameToImageKey } from \'./venueImages\';');
  lines.push('');
  lines.push('export const venues = [');
  
  for (const venue of venues) {
    lines.push('  {');
    
    // Write each field
    for (const [key, value] of Object.entries(venue)) {
      if (key === 'heroImage' && typeof value === 'string' && value.startsWith('require(')) {
        // Raw require statement
        lines.push(`    "${key}": venueImages[nameToImageKey('${venue.name}')]?.hero || require('../../assets/icon.png'),`);
      } else if (key === 'gallery' && typeof value === 'string' && value.startsWith('require(')) {
        lines.push(`    "${key}": venueImages[nameToImageKey('${venue.name}')]?.gallery || [],`);
      } else {
        lines.push(`    "${key}": ${JSON.stringify(value, null, 2).replace(/\n/g, '\n    ')},`);
      }
    }
    
    lines.push('  },');
  }
  
  lines.push('];');
  lines.push('');
  
  // Add filter options and mood mapping from web
  const filterMatch = webSrc.match(/export const filterOptions: FilterOptions = ({[\s\S]*?\n});/);
  if (filterMatch) {
    const filterJson = JSON.parse(filterMatch[1].replace(/,(\s*[}\]])/g, '$1'));
    lines.push(`export const filterOptions = ${JSON.stringify(filterJson, null, 2)};`);
    lines.push('');
  }
  
  const moodMatch = webSrc.match(/export const moodMapping: MoodMapping = ({[\s\S]*?\n});/);
  if (moodMatch) {
    const moodJson = JSON.parse(moodMatch[1].replace(/,(\s*[}\]])/g, '$1'));
    lines.push(`export const moodMapping = ${JSON.stringify(moodJson, null, 2)};`);
  }
  
  return lines.join('\n');
}

const output = generateAppVenuesFile(appVenues);
fs.writeFileSync(appVenuesPath, output);

console.log(`✅ Synced ${appVenues.length} venues from web to app`);
console.log(`📝 Written to ${appVenuesPath}`);


