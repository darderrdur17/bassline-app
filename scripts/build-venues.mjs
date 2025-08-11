#!/usr/bin/env node
/*
  Build venues data for both web and app from CSV sources by merging updates
  into the current datasets using venue name as the key.
*/

import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import vm from 'vm';

const ROOT = path.resolve(process.cwd());
const CSV_FILES = [
  path.join(ROOT, 'Database - Bars V2.csv'),
  path.join(ROOT, 'Database - Oakland.csv'),
  path.join(ROOT, 'Database - SF Afters_Restaurants.csv'),
  path.join(ROOT, 'Database - SF.csv'),
];

const existingWebPath = path.join(ROOT, 'bassline-web/src/data/venues.ts');
const existingWebJsPath = path.join(ROOT, 'bassline-web/src/data/venues.js');
const existingAppPath = path.join(ROOT, 'bassline-app/src/data/venues.js');
const existingRootPath = path.join(ROOT, 'src/data/venues.js');

function readText(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
}

function parseExistingArrayJS(jsText) {
  // Extract the venues array literal between export const venues = [ ... ]; allow optional type annotation
  const match = jsText.match(/export const venues(?:\s*:\s*[^=]+)?\s*=\s*(\[[\s\S]*?\]);/);
  if (!match) return [];
  try {
    const arrayLiteral = match[1];
    const sandbox = {
      module: { exports: null },
      exports: {},
      require: () => '',
      console,
    };
    const code = `module.exports = ${arrayLiteral};`;
    vm.createContext(sandbox);
    const script = new vm.Script(code, { timeout: 1000 });
    script.runInContext(sandbox, { timeout: 1000 });
    const result = sandbox.module.exports;
    if (Array.isArray(result)) return result;
    return [];
  } catch (e) {
    return [];
  }
}

function parseCSV(filePath) {
  if (!fs.existsSync(filePath)) return [];
  let content = fs.readFileSync(filePath, 'utf8');
  // Normalize BOM and drop a leading empty header line (commas only) if present
  content = content.replace(/^\uFEFF/, '');
  const lines = content.split(/\r?\n/);
  if (lines.length > 1 && /^(""|\s|,)*$/.test(lines[0])) {
    // First line is just commas/empty cells → remove so the next line becomes header
    lines.shift();
    content = lines.join('\n');
  }
  const parsed = Papa.parse(content, { header: true, skipEmptyLines: 'greedy' });
  const rows = parsed.data || [];
  // Some CSVs have a leading empty column; drop empty-key fields and trim keys
  return rows.map((row) => {
    const cleaned = {};
    for (const [key, valueRaw] of Object.entries(row)) {
      const keyTrim = (key || '').trim();
      if (!keyTrim) continue;
      const value = typeof valueRaw === 'string' ? valueRaw.trim() : valueRaw;
      if (value === '' || value == null) continue;
      cleaned[keyTrim] = value;
    }
    if (Object.keys(cleaned).length === 0) return null;
    cleaned.__source = path.basename(filePath);
    return cleaned;
  });
}

function splitList(val) {
  if (!val) return [];
  // split on commas, semicolons, 'and', ampersands
  return String(val)
    .split(/,|;|\band\b|\&/i)
    .map((s) => s.trim())
    .filter(Boolean);
}

function normalizeKey(k) {
  return String(k || '')
    .replace(/[\u200B-\u200D\uFEFF]/g, '') // zero-width
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

function getField(row, baseKey) {
  if (!row) return undefined;
  // Try exact, then suffixed forms that Papa might create for duplicate headers
  const candidates = [baseKey, `${baseKey}_1`, `${baseKey}_2`, `${baseKey}_3`];
  for (const k of candidates) {
    if (row[k] != null && String(row[k]).trim() !== '') return String(row[k]).trim();
  }
  // Try normalized match across all keys (case-insensitive, trimmed, zero-width removed)
  const target = normalizeKey(baseKey);
  for (const key of Object.keys(row)) {
    if (normalizeKey(key) === target) {
      const v = row[key];
      if (v != null && String(v).trim() !== '') return String(v).trim();
    }
  }
  return undefined;
}

function mergeFields(base, incoming) {
  const copy = { ...base };
  const pick = (obj, keys) => keys.reduce((acc, k) => {
    if (obj[k] != null && obj[k] !== '-') acc[k] = obj[k];
    return acc;
  }, {});

  // Column aliases across CSVs
  const aliases = {
    Pricing: 'pricing',
    Price: 'pricing',
    Description: 'description',
    'Extra Info': 'description',
    'Where you go if': 'whereIf',
    'Bar Type': 'type',
    Hours: 'hours',
    'Known for': 'knownFor',
    Ambiance: 'ambiance',
    'Music Genre': 'musicGenre',
    Cuisine: 'cuisine',
    Drinks: 'recommendedDrinks',
    Recs: 'recs',
    'As seen on': 'accolades',
    Accolades: 'accolades',
    Neighborhood: 'neighborhood',
    'Wait Time': 'waitTime',
    Tags: 'tags',
    'Social media': 'instagram',
    'Outdoor/Indoor?': 'outdoorIndoor',
    'Reservationh Difficulty': 'reservationDifficulty',
    Food: 'food',
    'Dress code': 'dressCode',
    'Crowd avail.': 'crowd',
    'Optimal time': 'optimalTime',
    'Rec. drinks': 'recommendedDrinks',
    Genre: 'genre',
  };

  const incomingNorm = {};
  for (const [k, v] of Object.entries(incoming)) {
    const mappedKey = aliases[k] || k;
    incomingNorm[mappedKey] = v;
  }

  // Merge core fields
  if (incomingNorm.pricing) copy.pricing = incomingNorm.pricing;
  if (incomingNorm.description) {
    copy.description = incomingNorm.description;
    copy.shortDescription = incomingNorm.description;
  }
  if (incomingNorm.type) copy.type = incomingNorm.type;
  if (incomingNorm.hours) copy.hours = incomingNorm.hours;
  if (incomingNorm.neighborhood) copy.neighborhood = incomingNorm.neighborhood;
  if (incomingNorm.cuisine) copy.cuisine = incomingNorm.cuisine;
  if (incomingNorm.dressCode) copy.dressCode = incomingNorm.dressCode;
  if (incomingNorm.instagram && String(incomingNorm.instagram).startsWith('http')) copy.instagram = incomingNorm.instagram;
  if (incomingNorm.accolades) copy.accolades = incomingNorm.accolades;
  if (incomingNorm.waitTime) {
    const n = parseInt(String(incomingNorm.waitTime).replace(/[^0-9]/g, ''), 10);
    if (!Number.isNaN(n)) copy.waitTime = n;
  }

  const mergedTags = new Set([
    ...(Array.isArray(copy.tags) ? copy.tags : []),
    ...splitList(incomingNorm.tags),
    ...splitList(incomingNorm.knownFor),
    ...splitList(incomingNorm.outdoorIndoor),
  ].map((t) => t.toLowerCase()))
  copy.tags = Array.from(mergedTags);

  const mergedAmbiance = new Set([...(copy.ambiance || []), ...splitList(incomingNorm.ambiance)]);
  copy.ambiance = Array.from(mergedAmbiance);

  const mergedMusic = new Set([...(copy.musicGenre || []), ...splitList(incomingNorm.musicGenre)]);
  copy.musicGenre = Array.from(mergedMusic);

  // Food vs cuisine normalization for app cards
  if (!copy.food && incomingNorm.food) copy.food = incomingNorm.food;

  // Recommended drinks
  if (incomingNorm.recommendedDrinks) {
    const drinks = splitList(incomingNorm.recommendedDrinks);
    const current = new Set([...(copy.recommendedDrinks || []), ...drinks]);
    copy.recommendedDrinks = Array.from(current);
  }

  return copy;
}

// Neighborhood to approximate coordinates (centroids) for SF/Oakland
const NEIGHBORHOOD_COORDS = {
  // San Francisco
  'mission': { latitude: 37.7599, longitude: -122.4148 },
  'soma': { latitude: 37.7786, longitude: -122.4059 },
  'castro': { latitude: 37.7627, longitude: -122.4350 },
  'financial district': { latitude: 37.7946, longitude: -122.3999 },
  'nob hill': { latitude: 37.7930, longitude: -122.4162 },
  'lower nob hill': { latitude: 37.7890, longitude: -122.4133 },
  'north beach': { latitude: 37.8061, longitude: -122.4106 },
  'japantown': { latitude: 37.7850, longitude: -122.4300 },
  'chinatown': { latitude: 37.7941, longitude: -122.4078 },
  'outer sunset': { latitude: 37.7534, longitude: -122.4944 },
  'inner richmond': { latitude: 37.7802, longitude: -122.4630 },
  'union square': { latitude: 37.7881, longitude: -122.4075 },
  'civic center': { latitude: 37.7793, longitude: -122.4193 },
  'ocean ave': { latitude: 37.7249, longitude: -122.4543 },
  'outer richmond': { latitude: 37.7787, longitude: -122.4871 },
  'noe valley': { latitude: 37.7502, longitude: -122.4337 },
  'marina': { latitude: 37.8021, longitude: -122.4360 },
  'haight': { latitude: 37.7690, longitude: -122.4469 },
  'lower pacific heights': { latitude: 37.7862, longitude: -122.4367 },
  'hayes valley': { latitude: 37.7763, longitude: -122.4240 },
  'potrero hill': { latitude: 37.7594, longitude: -122.4068 },
  'dogpatch': { latitude: 37.7577, longitude: -122.3885 },
  'bernals heights': { latitude: 37.7397, longitude: -122.4157 },
  'bernal heights': { latitude: 37.7397, longitude: -122.4157 },
  'sunset': { latitude: 37.7534, longitude: -122.4944 },
  'richmond': { latitude: 37.7802, longitude: -122.4630 },
  'inner sunset': { latitude: 37.7621, longitude: -122.4677 },
  'glen park': { latitude: 37.7336, longitude: -122.4337 },
  'pacific heights': { latitude: 37.7925, longitude: -122.4382 },
  'russian hill': { latitude: 37.8011, longitude: -122.4196 },
  // Oakland
  '__oakland__': { latitude: 37.8044, longitude: -122.2712 },
  'uptown': { latitude: 37.8091, longitude: -122.2712 },
  'downtown oakland': { latitude: 37.8044, longitude: -122.2712 },
  'temescal': { latitude: 37.8376, longitude: -122.2648 },
  'rockridge': { latitude: 37.8443, longitude: -122.2510 },
  'grand lake': { latitude: 37.8100, longitude: -122.2453 },
  'jack london square': { latitude: 37.7952, longitude: -122.2771 },
};

function inferType(row) {
  const type = getField(row, 'Bar Type') || row.type || getField(row, 'Genre') || '';
  if (/club/i.test(type)) return 'Club';
  if (/restaurant/i.test(type)) return 'Restaurant';
  if (/lounge/i.test(type)) return 'Lounge';
  if (/bar|speakeasy|sake/i.test(type)) return 'Bar';
  return 'Bar';
}

function inferNeighborhood(row, source) {
  const n = getField(row, 'Neighborhood');
  if (n) return n;
  // If Oakland CSV, default Oakland
  if (/Oakland\.csv$/i.test(source)) return 'Oakland';
  return 'San Francisco';
}

function inferCoordinates(neighborhood, source) {
  const key = (neighborhood || '').toLowerCase();
  if (NEIGHBORHOOD_COORDS[key]) return NEIGHBORHOOD_COORDS[key];
  if (/Oakland\.csv$/i.test(source)) return NEIGHBORHOOD_COORDS['__oakland__'];
  // Default SF center
  return { latitude: 37.7749, longitude: -122.4194 };
}

function assignHeroAndGallery(v) {
  if (v.heroImage && v.heroImage.length > 0) return v;
  const text = `${(v.tags || []).join(' ')} ${(v.musicGenre || []).join(' ')} ${(v.cuisine || '')} ${(v.description || '')}`.toLowerCase();
  const picks = [];
  const images = {
    rooftop: 'https://images.unsplash.com/photo-1491316037411-40279662960e?w=800',
    vinyl: 'https://images.unsplash.com/photo-1510735166794-1e22c7d230f1?w=800',
    records: 'https://images.unsplash.com/photo-1505925456422-1d8a438d4f88?w=800',
    club: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800',
    neon: 'https://images.unsplash.com/photo-1571266028243-b4e4d3d70130?w=800',
    cocktail: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800',
    wine: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800',
    seafood: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800',
    japanese: 'https://images.unsplash.com/photo-1595424762791-7ef88838ad01?w=800',
    mediterranean: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800',
    bar: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800',
  };
  if (/rooftop|view|panoramic/.test(text)) picks.push(images.rooftop);
  if (/vinyl|listening|records/.test(text)) picks.push(images.vinyl, images.records);
  if (/club|dj|electronic|synthwave|disco/.test(text)) picks.push(images.club, images.neon);
  if (/cocktail|aperitif|vermouth|negroni|martini/.test(text)) picks.push(images.cocktail);
  if (/natural wine|wine bar|wine/.test(text)) picks.push(images.wine);
  if (/oyster|seafood|anchovy/.test(text)) picks.push(images.seafood);
  if (/japanese|sake|izakaya|ramen/.test(text)) picks.push(images.japanese);
  if (/mediterranean|spanish|tapas|pintxos/.test(text)) picks.push(images.mediterranean);
  if (picks.length === 0) picks.push(images.bar);
  v.heroImage = picks[0];
  v.gallery = [picks[0], picks[1] || images.bar, picks[2] || images.cocktail].filter(Boolean);
  return v;
}

function createVenueFromRow(row, nextId) {
  const rawName = getField(row, 'Name') || row.name;
  if (!rawName) return null;
  const name = String(rawName).replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
  const neighborhood = inferNeighborhood(row, row.__source);
  const v = {
    id: nextId,
    name,
    coordinates: inferCoordinates(neighborhood, row.__source),
    type: inferType(row),
    neighborhood,
    rating: 4.3,
    pricing: getField(row, 'Pricing') || getField(row, 'Price') || '$$',
    hours: getField(row, 'Hours') || '',
    heroImage: '',
    musicGenre: splitList(getField(row, 'Music Genre')),
    tags: splitList(getField(row, 'Tags')),
    description: getField(row, 'Description') || getField(row, 'Extra Info') || '',
    ambiance: splitList(getField(row, 'Ambiance')),
    cuisine: getField(row, 'Cuisine') || null,
    dressCode: getField(row, 'Dress code') || undefined,
    waitTime: getField(row, 'Wait Time') ? String(parseInt(String(getField(row, 'Wait Time')).replace(/[^0-9]/g, ''), 10) || '') : undefined,
    shortDescription: undefined,
    accolades: getField(row, 'Accolades') || getField(row, 'As seen on') || undefined,
    yelpUrl: undefined,
    resyUrl: undefined,
    instagram: getField(row, 'Social media') && String(getField(row, 'Social media')).startsWith('http') ? getField(row, 'Social media') : undefined,
  };
  return v;
}

function deriveMoodBuckets(venues) {
  const buckets = {
    chill: [],
    party: [],
    date: [],
    classy: [],
    music: [],
    drinks: [],
  };
  for (const v of venues) {
    const source = `${v.description || ''} ${(v.tags || []).join(' ')} ${(v.shortDescription || '')}`.toLowerCase();
    const name = v.name;
    if (/dance|club|dj|floor/.test(source)) buckets.party.push(name);
    if (/date|romantic|intimate|cozy/.test(source)) buckets.date.push(name);
    if (/vinyl|listening|hifi|jazz|soul|funk|music/.test(source) || (v.musicGenre || []).length) buckets.music.push(name);
    if (/classy|elegant|rooftop|view|fine|michelin/.test(source)) buckets.classy.push(name);
    if (/natural wine|sake|cocktails|beer|aperitif|vermouth/.test(source)) buckets.drinks.push(name);
    if (/chill|laid-back|minimalist|cozy|lounge/.test(source)) buckets.chill.push(name);
  }
  // De-duplicate
  for (const key of Object.keys(buckets)) {
    buckets[key] = Array.from(new Set(buckets[key]));
  }
  return buckets;
}

function buildFilterOptions(venues) {
  const uniq = (arr) => Array.from(new Set(arr)).filter(Boolean);
  return {
    venueType: uniq(venues.map((v) => v.type).filter(Boolean)),
    pricing: uniq(venues.map((v) => v.pricing).filter(Boolean)),
    musicGenre: uniq(venues.flatMap((v) => v.musicGenre || [])),
    ambiance: uniq(venues.flatMap((v) => v.ambiance || [])),
    dressCode: uniq(venues.map((v) => v.dressCode).filter(Boolean)),
    neighborhood: uniq(venues.map((v) => v.neighborhood).filter(Boolean)),
    hours: ['Open Now', 'Past 2 AM', '24 Hours'],
    ambianceDensity: ['Chill', 'Lively', 'High-energy', 'VIP'],
    distance: ['<0.5 mi', '<1 mi', '<2 mi', '<5 mi'],
  };
}

function stableSortByName(arr) {
  return [...arr].sort((a, b) => a.name.localeCompare(b.name));
}

function formatWebTS(venues, filterOptions, moodMapping) {
  const body = venues.map((v, idx) => ({
    id: Number(v.id),
    name: v.name,
    coordinates: v.coordinates,
    type: v.type || 'Bar',
    neighborhood: v.neighborhood || '',
    rating: v.rating ?? 4.3,
    pricing: v.pricing || '$$',
    hours: v.hours || '',
    heroImage: typeof v.heroImage === 'string' ? v.heroImage : '',
    musicGenre: v.musicGenre || [],
    tags: v.tags || [],
    description: v.description || v.shortDescription || '',
    ambiance: v.ambiance || [],
    cuisine: v.cuisine || null,
    dressCode: v.dressCode || undefined,
    waitTime: v.waitTime ? String(v.waitTime) : undefined,
    shortDescription: v.shortDescription || undefined,
    accolades: v.accolades || undefined,
    yelpUrl: v.yelpUrl || undefined,
    resyUrl: v.resyUrl || undefined,
    instagram: v.instagram || undefined,
  }));
  return `import { Venue, FilterOptions, MoodMapping } from '@/types/venue';

export const venues: Venue[] = ${JSON.stringify(body, null, 2)};

export const filterOptions: FilterOptions = ${JSON.stringify(filterOptions, null, 2)};

export const moodMapping: MoodMapping = ${JSON.stringify(moodMapping, null, 2)};
`;
}

function formatJS(venues, filterOptions, moodMapping) {
  const cleaned = venues.map((v) => ({
    ...v,
    heroImage: typeof v.heroImage === 'string' ? v.heroImage : v.heroImage || '',
  }));
  return `export const venues = ${JSON.stringify(cleaned, null, 2)};

export const filterOptions = ${JSON.stringify(filterOptions, null, 2)};

export const moodMapping = ${JSON.stringify(moodMapping, null, 2)};
`;
}

function main() {
  // Load existing datasets as base (to keep coordinates and ids)
  const appBase = parseExistingArrayJS(readText(existingAppPath));
  const webBaseJS = parseExistingArrayJS(readText(existingWebJsPath));
  const webBaseTS = parseExistingArrayJS(readText(existingWebPath));
  const rootBase = parseExistingArrayJS(readText(existingRootPath));

  // Merge base records per name, preferring objects with more defined fields
  const candidatesByName = new Map();
  const pushCand = (arr, source) => {
    for (const v of arr) {
      if (!v || !v.name) continue;
      const key = v.name.toLowerCase();
      const list = candidatesByName.get(key) || [];
      list.push({ ...v });
      candidatesByName.set(key, list);
    }
  };
  pushCand(appBase, 'app');
  pushCand(webBaseTS, 'webts');
  pushCand(webBaseJS, 'webjs');
  pushCand(rootBase, 'root');

  const baseByName = new Map();
  const mergeObjects = (objs) => {
    return objs.reduce((acc, obj) => {
      for (const [k, val] of Object.entries(obj)) {
        if (acc[k] == null || acc[k] === '' || (Array.isArray(acc[k]) && acc[k].length === 0)) {
          acc[k] = val;
        }
      }
      return acc;
    }, {});
  };
  for (const [key, list] of candidatesByName.entries()) {
    // Merge in order: app -> webts -> webjs -> root
    const ordered = [
      list.find(() => true),
    ];
    // Simpler: just merge all
    const merged = mergeObjects(list);
    baseByName.set(key, merged);
  }
  // If still empty, bail out without writing
  if (baseByName.size === 0) {
    console.warn('No base venues found in existing data files; aborting to avoid writing empty datasets.');
    process.exit(0);
  }

  // Parse CSVs and merge into base where names match
  const perFile = CSV_FILES.map((f) => ({ file: path.basename(f), rows: parseCSV(f).filter(Boolean) }));
  const csvRows = perFile.flatMap((x) => x.rows);
  let updated = Array.from(baseByName.values());

  // Generate next id base
  let maxId = updated.reduce((m, v) => Math.max(m, Number(v.id) || 0), 0);

  let added = 0;
  let mergedCount = 0;
  let debugPrinted = 0;
  for (const row of csvRows) {
    const name = (getField(row, 'Name') || row.name || '').trim();
    if (!name) continue;
    const key = name.toLowerCase();
    const existing = baseByName.get(key);
    if (!existing) {
      // Create a new record from row with inferred fields
      const newVenue = createVenueFromRow(row, ++maxId);
      if (newVenue) {
        baseByName.set(key, newVenue);
        added++;
      }
    } else {
      const merged = mergeFields(existing, row);
      baseByName.set(key, merged);
      mergedCount++;
    }
  }

  updated = Array.from(baseByName.values());
  updated = stableSortByName(updated);

  // Enrich hero images and galleries where missing
  updated = updated.map((v) => assignHeroAndGallery(v));

  const filterOptions = buildFilterOptions(updated);
  const moodMapping = deriveMoodBuckets(updated);

  // Write web TS
  const webTS = formatWebTS(updated, filterOptions, moodMapping);
  fs.writeFileSync(existingWebPath, webTS, 'utf8');

  // Write web JS mirror (if exists)
  const webJS = formatJS(updated, filterOptions, moodMapping);
  if (fs.existsSync(existingWebJsPath)) fs.writeFileSync(existingWebJsPath, webJS, 'utf8');

  // Write app JS and root JS
  fs.writeFileSync(existingAppPath, webJS, 'utf8');
  if (fs.existsSync(existingRootPath)) fs.writeFileSync(existingRootPath, webJS, 'utf8');

  const totalRows = csvRows.length;
  const namedRows = csvRows.filter((r) => (getField(r, 'Name') || r.name || '').trim()).length;
  if (namedRows === 0 && totalRows > 0) {
    console.warn('No Name column detected; sample row keys:');
    for (const r of csvRows.slice(0, 3)) {
      console.warn(Object.keys(r));
    }
  }
  console.log(`Parsed CSV rows: ${totalRows} (with names: ${namedRows}). Added: ${added}, merged: ${mergedCount}.`);
  console.log(`Updated ${updated.length} venues. Files written:\n - ${existingWebPath}\n - ${existingWebJsPath}\n - ${existingAppPath}\n - ${existingRootPath}`);
}

main();

