import fs from 'fs';
import path from 'path';

const projectRoot = '/Users/derr/Documents/Random/Bassline-main';

const checks = [
  {
    name: 'web',
    imagesDir: path.join(projectRoot, 'bassline-web/public/images/venues'),
    dataFiles: [path.join(projectRoot, 'bassline-web/src/data/venues.ts')],
    referenceRegex: /\/images\/venues\/([^"\)\]\s]+)/g,
  },
  {
    name: 'app',
    imagesDir: path.join(projectRoot, 'bassline-app/assets/images/venues'),
    dataFiles: [path.join(projectRoot, 'bassline-app/src/data/venues.js')],
    referenceRegex: /assets\/images\/venues\/([^"\)\]\s]+)/g,
  },
];

function listImages(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter((name) => /\.(jpg|jpeg|png|webp)$/i.test(name))
    .sort((a, b) => a.localeCompare(b));
}

function extractRefs(files, regex) {
  const refs = new Set();
  for (const file of files) {
    if (!fs.existsSync(file)) continue;
    const content = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = regex.exec(content))) {
      const basename = path.basename(match[1]);
      refs.add(basename);
    }
  }
  return refs;
}

for (const cfg of checks) {
  const images = listImages(cfg.imagesDir);
  const refs = extractRefs(cfg.dataFiles, cfg.referenceRegex);
  const unused = images.filter((img) => !refs.has(img));
  const missing = Array.from(refs).filter((ref) => !images.includes(ref));

  console.log(`=== ${cfg.name.toUpperCase()} ===`);
  console.log(`Images on disk: ${images.length}`);
  console.log(`Referenced in data: ${refs.size}`);
  console.log('Unused images (present but not referenced):');
  if (unused.length === 0) console.log('- NONE');
  else unused.forEach((u) => console.log(`- ${u}`));
  console.log('Missing images (referenced but not present):');
  if (missing.length === 0) console.log('- NONE');
  else missing.forEach((m) => console.log(`- ${m}`));
  console.log('');
}


