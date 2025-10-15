import fs from 'fs';
import path from 'path';

// Sync app venues heroImage/gallery to use @venue-images assets analogous to web data
const repoRoot = path.resolve(process.cwd());
const appVenuesPath = path.join(repoRoot, 'bassline-app', 'src', 'data', 'venues.js');
const webVenuesPath = path.join(repoRoot, 'bassline-web', 'src', 'data', 'venues.ts');

function toSlugFile(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function mapWebImageToAlias(webPath, venueName) {
  if (!webPath || typeof webPath !== 'string') return null;
  // Try to map by filename hints to our curated folders
  const barSlug = toSlugFile(venueName);
  const filename = path.basename(webPath);

  // Heuristic mapping from web file names to curated @venue-images folders
  const candidates = [
    `@venue-images/Bars/${venueName.replace(/[^A-Za-z0-9]+/g, '_')}_1.jpg`,
    `@venue-images/Clubs/${venueName.replace(/[^A-Za-z0-9]+/g, '_')}_1.jpg`,
    `@venue-images/Munchies/${venueName.replace(/[^A-Za-z0-9]+/g, '_')}_1.jpg`,
  ];
  return candidates[0];
}

function updateAppVenues() {
  const appSrc = fs.readFileSync(appVenuesPath, 'utf8');
  const webSrc = fs.readFileSync(webVenuesPath, 'utf8');

  // Parse rough JSON arrays from both files
  const webJson = JSON.parse('[' + webSrc.split('export const venues: Venue[] = [')[1].split('];')[0] + ']');
  const appJson = JSON.parse(appSrc.split('export const venues = ')[1].split('];')[0] + ']');

  const appById = new Map(appJson.map(v => [v.id, v]));

  for (const w of webJson) {
    const a = appById.get(w.id);
    if (!a) continue;
    // Sync text fields
    a.type = w.type;
    a.neighborhood = w.neighborhood;
    a.pricing = w.pricing;
    a.hours = w.hours;
    a.description = w.description ?? a.description;
    a.shortDescription = w.shortDescription ?? a.shortDescription;
    a.tags = w.tags ?? a.tags;
    a.cuisine = w.cuisine ?? a.cuisine ?? null;
    a.instagram = w.instagram ?? a.instagram;
    a.musicGenre = w.musicGenre ?? a.musicGenre;
    a.ambiance = w.ambiance ?? a.ambiance;
    a.recommendedDrinks = w.recommendedDrinks ?? a.recommendedDrinks;
    a.recommendations = w.recommendations ?? a.recommendations;
    a.goodToKnow = w.goodToKnow ?? a.goodToKnow;
    a.whereToGoIf = w.whereToGoIf ?? a.whereToGoIf;
    a.openPast2AM = w.openPast2AM ?? a.openPast2AM;

    // Map hero image to @venue-images alias if web uses local path
    if (typeof w.heroImage === 'string' && w.heroImage.startsWith('/images/venues/')) {
      a.heroImage = `@venue-images/${guessFolder(w)}/${normalizeName(w.name)}_1.jpg`;
    }
    // Map gallery similarly
    if (Array.isArray(w.gallery) && w.gallery.length > 0) {
      a.gallery = [1,2,3].map(i => `@venue-images/${guessFolder(w)}/${normalizeName(w.name)}_${i}.jpg`);
    }
  }

  // Serialize back to JS (keep require for non-alias for now by wrapping alias strings)
  function serializeImage(img) {
    if (!img) return 'null';
    if (typeof img === 'string' && img.startsWith('@venue-images/')) {
      return `require('${img}')`;
    }
    return typeof img === 'string' ? `'${img}'` : 'null';
  }

  function normalizeName(name) {
    return name.replace(/[^A-Za-z0-9]+/g, '_');
  }
  function guessFolder(w) {
    const t = (w.type || '').toLowerCase();
    if (['club','nightclub','warehouse','mega-club','multi-room','club/lounge','music venue / bar'].some(k=>t.includes(k))) return 'Clubs';
    if (['restaurant'].some(k=>t.includes(k))) return 'Munchies';
    return 'Bars';
  }

  const updated = JSON.stringify(appJson, null, 2)
    .replace(/"heroImage":\s*"@venue-images\/[^"]+"/g, m => {
      const p = m.split(':')[1].trim().replace(/^"|"$/g,'');
      return `"heroImage": ${serializeImage(p)}`;
    })
    .replace(/"gallery":\s*\[[^\]]*\]/g, m => {
      // turn '@venue-images/x_1.jpg' into require calls
      return m.replace(/"(@venue-images\/[^"]+)"/g, (_,p) => `require('${p}')`);
    });

  const output = appSrc.replace(
    /export const venues = [([\s\S]*?)];/,
    `export const venues = ${updated};`
  );

  fs.writeFileSync(appVenuesPath, output);
  console.log('Synced app venues with web data and @venue-images assets.');
}

updateAppVenues();



