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
  const content = fs.readFileSync(filePath, 'utf8');
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
  const csvRows = CSV_FILES.flatMap(parseCSV);
  let updated = Array.from(baseByName.values());

  for (const row of csvRows) {
    const name = (row.Name || row.name || '').trim();
    if (!name) continue;
    const key = name.toLowerCase();
    const existing = baseByName.get(key);
    if (!existing) {
      // Skip adding new entries without coordinates
      continue;
    }
    const merged = mergeFields(existing, row);
    baseByName.set(key, merged);
  }

  updated = Array.from(baseByName.values());
  updated = stableSortByName(updated);

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

  console.log(`Updated ${updated.length} venues. Files written:\n - ${existingWebPath}\n - ${existingWebJsPath}\n - ${existingAppPath}\n - ${existingRootPath}`);
}

main();

