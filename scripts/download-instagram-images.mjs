#!/usr/bin/env node
/**
 * Instagram Image Download Helper
 * 
 * This script generates a list of all venue Instagram accounts
 * to help you manually download images.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getVenues() {
  const venuesPath = path.join(__dirname, '..', 'bassline-app', 'src', 'data', 'venues.js');
  const content = fs.readFileSync(venuesPath, 'utf-8');
  const match = content.match(/export const venues = (\[[\s\S]*?\]);/);
  if (match) {
    return JSON.parse(match[1]);
  }
  return [];
}

function main() {
  console.log('📱 Instagram Image Download Helper\n');
  
  const venues = getVenues();
  const venuesWithInstagram = venues.filter(v => v.instagram);
  
  console.log(`Found ${venuesWithInstagram.length} venues with Instagram accounts\n`);
  
  const outputDir = path.join(__dirname, '..', 'venue-images');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Create markdown guide
  let guide = '# Instagram Image Download Guide\n\n';
  guide += `Total venues with Instagram: ${venuesWithInstagram.length}\n\n`;
  guide += '## How to Download\n\n';
  guide += '1. Visit each Instagram URL below\n';
  guide += '2. Find a good hero image (interior/exterior shot)\n';
  guide += '3. Right-click and "Save Image As..."\n';
  guide += '4. Save as: `{venue-id}-hero.jpg` in the `venue-images/` folder\n';
  guide += '5. Optionally, save 2-3 more images as `{venue-id}-1.jpg`, `{venue-id}-2.jpg`, etc.\n\n';
  guide += '## Venues\n\n';

  // Group by type
  const byType = {};
  venuesWithInstagram.forEach(v => {
    if (!byType[v.type]) byType[v.type] = [];
    byType[v.type].push(v);
  });

  let checklist = '';
  
  Object.keys(byType).sort().forEach(type => {
    guide += `### ${type}\n\n`;
    checklist += `### ${type}\n\n`;
    
    byType[type].forEach(venue => {
      guide += `**${venue.name}** (ID: ${venue.id})\n`;
      guide += `- Location: ${venue.neighborhood}\n`;
      guide += `- Instagram: ${venue.instagram}\n`;
      guide += `- Save as: \`${venue.id}-hero.jpg\`, \`${venue.id}-1.jpg\`, \`${venue.id}-2.jpg\`\n`;
      guide += `- [ ] Downloaded\n\n`;
      
      checklist += `- [ ] **${venue.name}** (${venue.id}) - [Instagram](${venue.instagram})\n`;
    });
    
    guide += '\n';
    checklist += '\n';
  });

  guide += '## Quick Checklist\n\n';
  guide += checklist;

  guide += '\n## After Downloading\n\n';
  guide += 'Run the update script to regenerate venue data with local image paths:\n';
  guide += '```bash\n';
  guide += 'node scripts/update-venue-images.mjs\n';
  guide += '```\n';

  const guidePath = path.join(outputDir, 'INSTAGRAM-DOWNLOAD-GUIDE.md');
  fs.writeFileSync(guidePath, guide);

  // Create a simple CSV for tracking
  const csv = 'ID,Name,Type,Neighborhood,Instagram,Downloaded\n' + 
    venuesWithInstagram.map(v => 
      `${v.id},"${v.name}","${v.type}","${v.neighborhood}","${v.instagram}",No`
    ).join('\n');
  
  const csvPath = path.join(outputDir, 'instagram-tracking.csv');
  fs.writeFileSync(csvPath, csv);

  // Create HTML page with clickable links
  let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Bassline - Instagram Image Downloads</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; }
    h1 { color: #333; }
    .venue { border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 8px; }
    .venue h3 { margin: 0 0 10px 0; color: #0066cc; }
    .venue .meta { color: #666; font-size: 14px; margin: 5px 0; }
    .venue a { color: #e1306c; text-decoration: none; font-weight: bold; }
    .venue a:hover { text-decoration: underline; }
    .venue .instructions { background: #f5f5f5; padding: 10px; margin-top: 10px; border-radius: 4px; font-size: 13px; }
    .type-section { margin: 30px 0; }
    .stats { background: #e8f4f8; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
    input[type="checkbox"] { margin-right: 10px; }
  </style>
  <script>
    function markDownloaded(venueId) {
      localStorage.setItem('venue-' + venueId, 'downloaded');
      updateStats();
    }
    
    function updateStats() {
      const total = document.querySelectorAll('.venue').length;
      let downloaded = 0;
      document.querySelectorAll('.venue').forEach(v => {
        const id = v.dataset.venueId;
        if (localStorage.getItem('venue-' + id)) {
          downloaded++;
          v.querySelector('input').checked = true;
          v.style.opacity = '0.6';
        }
      });
      document.getElementById('progress').textContent = \`\${downloaded} / \${total} completed (\${Math.round(downloaded/total*100)}%)\`;
    }
    
    window.onload = updateStats;
  </script>
</head>
<body>
  <h1>📱 Bassline Venue Images - Instagram Download</h1>
  <div class="stats">
    <strong>Progress:</strong> <span id="progress">0 / ${venuesWithInstagram.length} completed</span>
  </div>
  <p><strong>Instructions:</strong> Click on Instagram links, download hero image + 2-3 additional photos, save as <code>{id}-hero.jpg</code>, <code>{id}-1.jpg</code>, etc.</p>
`;

  Object.keys(byType).sort().forEach(type => {
    html += `<div class="type-section"><h2>${type}</h2>`;
    byType[type].forEach(venue => {
      html += `<div class="venue" data-venue-id="${venue.id}">
        <h3><input type="checkbox" onchange="markDownloaded(${venue.id})"> ${venue.name}</h3>
        <div class="meta">ID: ${venue.id} | ${venue.neighborhood}</div>
        <div><a href="${venue.instagram}" target="_blank">📷 Open Instagram →</a></div>
        <div class="instructions">
          <strong>Save as:</strong> <code>${venue.id}-hero.jpg</code>, <code>${venue.id}-1.jpg</code>, <code>${venue.id}-2.jpg</code>, <code>${venue.id}-3.jpg</code>
        </div>
      </div>`;
    });
    html += '</div>';
  });

  html += '</body></html>';

  const htmlPath = path.join(outputDir, 'instagram-downloads.html');
  fs.writeFileSync(htmlPath, html);

  console.log('✅ Generated files:\n');
  console.log(`   📄 ${csvPath}`);
  console.log(`   📝 ${guidePath}`);
  console.log(`   🌐 ${htmlPath}\n`);
  console.log(`💡 Open instagram-downloads.html in your browser to start downloading!\n`);
}

main();


