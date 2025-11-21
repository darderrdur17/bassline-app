#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';

const root = '/Users/derr/Documents/Random/Bassline-main';
const inputDirs = [
  path.join(root, 'venue-images', 'Bars 2'),
  path.join(root, 'venue-images', 'Clubs 2'),
  path.join(root, 'venue-images', 'Munchies 2'),
];
const processedDir = path.join(root, 'venue-images', '_processed');
const assetsDir = path.join(root, 'bassline-app', 'assets', 'images', 'venues');

fs.mkdirSync(processedDir, { recursive: true });
fs.mkdirSync(assetsDir, { recursive: true });

function slugify(part) {
  return part
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[–—]/g, '-')
    .replace(/[_\s]+/g, '-')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function convertToJpegIfNeeded(srcPath, outPath) {
  const ext = path.extname(srcPath).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg') {
    fs.copyFileSync(srcPath, outPath);
    return true;
  }
  // Use macOS sips to convert png/webp to jpg
  const res = spawnSync('sips', ['-s', 'format', 'jpeg', srcPath, '--out', outPath], { encoding: 'utf8' });
  if (res.status !== 0) {
    try {
      fs.copyFileSync(srcPath, outPath);
      return true;
    } catch (e) {
      return false;
    }
  }
  return true;
}

let copied = 0;
let errors = 0;

for (const dir of inputDirs) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.toLowerCase().match(/\.(jpg|jpeg|png|webp)$/));
  for (const file of files) {
    const full = path.join(dir, file);
    const base = path.basename(file, path.extname(file));
    // Pattern: Name_1, Name_2, Name_3 → slug-hero.jpg, slug-1.jpg, slug-2.jpg
    const m = base.match(/^(.*)_(\d+)$/);
    const idx = m ? parseInt(m[2], 10) : 1;
    const namePart = m ? m[1] : base;
    const slug = slugify(namePart);
    const targetName = idx === 1 ? `${slug}-hero.jpg` : `${slug}-${idx - 1}.jpg`;
    const tempOut = path.join(processedDir, targetName);
    const dest = path.join(assetsDir, targetName);

    try {
      const ok = convertToJpegIfNeeded(full, tempOut);
      if (!ok) {
        errors++;
        continue;
      }
      fs.copyFileSync(tempOut, dest);
      copied++;
    } catch (e) {
      errors++;
    }
  }
}

console.log(JSON.stringify({ copied, errors, assetsDir }, null, 2));
