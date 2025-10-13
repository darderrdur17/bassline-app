# 🖼️ Venue Images Workflow Guide

## ✅ Success! Bar Part Time Images Integrated

You've successfully added images for **Bar Part Time** (ID: 1)! Here's what happened:

### What Was Done:
1. ✅ Downloaded 3 images from Bar Part Time's Instagram
2. ✅ Renamed to proper format: `bar-part-time-hero.jpg`, `bar-part-time-1.jpg`, `bar-part-time-2.jpg`
3. ✅ Ran update script to integrate images
4. ✅ Images copied to `bassline-app/assets/images/venues/`
5. ✅ Venue data updated to use local paths

### Result in `venues.js`:
```javascript
{
  "id": 1,
  "name": "Bar Part Time",
  "heroImage": "./assets/images/venues/bar-part-time-hero.jpg",
  "gallery": [
    "./assets/images/venues/bar-part-time-2.jpg"
  ]
  // ... other fields
}
```

---

## 📸 How to Add Images for Other Venues

### Quick Process (3 Steps):

#### **Step 1: Download Images**

Open the HTML helper tool:
```bash
open venue-images/instagram-downloads.html
```

For each venue:
1. Click the Instagram link
2. Download 1 hero image + 2-3 gallery images
3. Save them in the `venue-images/` folder

#### **Step 2: Name Files Correctly**

Use this naming convention:
```
{venue-name-lowercase-with-dashes}-hero.jpg
{venue-name-lowercase-with-dashes}-1.jpg
{venue-name-lowercase-with-dashes}-2.jpg
```

**Examples:**
- `key-klub-hero.jpg`
- `verjus-hero.jpg`
- `harlan-records-hero.jpg`
- `anchovy-bar-hero.jpg`

Or use venue ID:
```
{venue-id}-hero.jpg
{venue-id}-1.jpg
{venue-id}-2.jpg
```

**Examples:**
- `2-hero.jpg` (Key Klub)
- `3-hero.jpg` (Verjus)
- `4-hero.jpg` (Harlan Records)

#### **Step 3: Run Update Script**

```bash
node scripts/update-venue-images.mjs
```

This will:
- ✅ Find all properly named images
- ✅ Copy them to app assets folder
- ✅ Update venue data automatically
- ✅ Show summary of what was updated

---

## 🎯 Batch Processing Tips

### Download Multiple Venues at Once

1. **Open the helper**:
   ```bash
   open venue-images/instagram-downloads.html
   ```

2. **Download in batches** (by type):
   - Do all **Wine Bars** first (11 venues with Instagram)
   - Then **Cocktail Bars** (11 venues)
   - Then **Clubs** (3 venues)
   - Then remaining venues

3. **Name consistently** as you download

4. **Run update script periodically**:
   ```bash
   node scripts/update-venue-images.mjs
   ```

### Tracking Progress

The HTML tool tracks your progress automatically! Check off venues as you complete them.

---

## 📁 File Organization

### Current Structure:
```
Bassline-main/
├── venue-images/                    # 👈 Download images here
│   ├── bar-part-time-hero.jpg      ✅ Done
│   ├── bar-part-time-1.jpg         ✅ Done
│   ├── bar-part-time-2.jpg         ✅ Done
│   ├── key-klub-hero.jpg           ⏳ Todo
│   ├── verjus-hero.jpg             ⏳ Todo
│   └── ...
│
├── bassline-app/assets/images/venues/  # 👈 Script copies here
│   ├── bar-part-time-hero.jpg
│   └── bar-part-time-2.jpg
│
└── bassline-app/src/data/venues.js    # 👈 Script updates here
```

---

## 🔄 Alternative: Use Venue IDs

If venue names are too long, use IDs instead:

### Venue ID Reference (Top 10):
1. Bar Part Time ✅
2. Key Klub
3. Verjus
4. Harlan Records
5. Bodega North Beach
6. Anchovy Bar
7. Millay
8. Celeste
9. Mothership
10. Bar Gemini

**Naming with IDs:**
```
1-hero.jpg   (Bar Part Time) ✅
2-hero.jpg   (Key Klub)
3-hero.jpg   (Verjus)
```

---

## 🎨 Image Guidelines

### Technical Requirements:
- **Format**: JPG or PNG
- **Size**: At least 1200x800px
- **Orientation**: Landscape (horizontal)
- **File Size**: < 500KB each (will be optimized)

### Content Guidelines:
- ✅ Good interior/exterior shots
- ✅ Shows the venue's vibe
- ✅ Well-lit and clear
- ❌ Avoid photos with too many faces (privacy)
- ❌ Avoid blurry or dark photos

### Where to Get Images:

1. **Instagram** (Best) - Real venue photos
2. **Venue Website** - Official photos
3. **Google Maps** - User photos
4. **Yelp** - User photos

---

## 🚀 Next Steps

### Priority Venues (Have Instagram):

**Wine Bars (11 venues):**
- [ ] Key Klub (ID: 2)
- [ ] Verjus (ID: 3)
- [ ] Bodega North Beach (ID: 5)
- [ ] Anchovy Bar (ID: 6)
- [ ] Millay (ID: 7)
- [ ] Celeste (ID: 8)
- [ ] Bar Gemini (ID: 10)
- [ ] El Chato (ID: 13)
- [ ] High Treason (ID: 28)
- [ ] Palm City (ID: 29)
- [ ] Ungrafted (ID: 30)

**Cocktail Bars (11 venues):**
- [ ] Harlan Records (ID: 4)
- [ ] Mothership (ID: 9)
- [ ] Peacekeeper (ID: 15)
- [ ] PCH (ID: 17)
- [ ] Bar Sprezzatura (ID: 18)
- [ ] Trick Dog (ID: 19)
- [ ] Chambers (ID: 20)
- [ ] ABV (ID: 21)
- [ ] Smuggler's Cove (ID: 22)
- [ ] True Laurel (ID: 23)
- [ ] Wildhawk (ID: 25)

**Other Types (12 venues):**
- [ ] Buddy (ID: 14)
- [ ] Tommy's Mexican Restaurant (ID: 24)
- [ ] Bar Crenn (ID: 26)
- [ ] Press Club (ID: 27)
- [ ] Shoji (ID: 36)
- [ ] Anina (ID: 35)
- [ ] Dalva (ID: 36)
- [ ] Beaux (ID: 34)
- [ ] Hi-Tops (ID: 33)
- [ ] Make-Out Room (ID: 32)
- [ ] Charmaine's (ID: 12)
- [ ] Gigi's (ID: 11)

**Total: 34 venues with Instagram**

---

## 🔧 Troubleshooting

### Images Not Found?

Check naming:
```bash
ls venue-images/ | grep -i "venue-name"
```

### Script Doesn't Find Images?

Make sure names match exactly:
- Use lowercase
- Replace spaces with hyphens
- Remove special characters

### Want to Re-run for One Venue?

Just delete its assets and run again:
```bash
rm bassline-app/assets/images/venues/bar-part-time*
node scripts/update-venue-images.mjs
```

---

## 📊 Progress Tracking

### Current Status:
- ✅ 1 venue complete (Bar Part Time)
- ⏳ 33 venues with Instagram remaining
- ⏳ 32 venues without Instagram (will need manual sourcing)

### Estimated Time:
- ~5 minutes per venue to download images
- ~3 hours total for all 34 venues with Instagram
- Run update script once: ~10 seconds

---

## 💡 Pro Tips

1. **Download in bulk**: Open multiple Instagram tabs, download 5-10 at once
2. **Use browser download manager**: Makes it easier to rename
3. **Name as you download**: Saves time later
4. **Run update script every 10 venues**: See progress incrementally
5. **Check the HTML tool**: It tracks what you've done

---

## 🎉 When You're Done

After adding all images:

1. **Verify** mobile app shows images correctly
2. **Test** gallery functionality
3. **Check** web version also updated
4. **Commit** changes:
   ```bash
   git add bassline-app/assets/images/venues/
   git add bassline-app/src/data/venues.js
   git add bassline-web/src/data/venues.ts
   git commit -m "Add venue images for [X] venues"
   ```

---

**Happy image hunting! 📸**

For questions or issues, check the scripts in `scripts/` folder.


