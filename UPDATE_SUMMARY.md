# Bassline Database Update - Summary

## ✅ Completed Updates (October 13, 2025)

### 1. Database Migration
**Status**: ✅ Complete

- **Source Files**: 
  - `FINAL Database - Bars-2.csv` (36 bars)
  - `FINAL Database - Clubs-2.csv` (7 clubs)
  - `FINAL Database - Munchies-2.csv` (23 restaurants)
  
- **Total Venues**: 66 venues across all categories

- **Data Fields Captured**:
  - **Bars**: Name, Type, Neighborhood, Pricing, Avg Drink Price, Hours, Description, Tags, Cuisine, Drinks, Recommendations, Where to go if, You can expect, Accolades, Instagram, Good to know
  - **Clubs**: Name, Genre, Hours, Neighborhood, Open past 2am status, Where to go if, Type/Vibe
  - **Restaurants**: Name, Price, Cuisine, Neighborhood, Hours, Recommendations

### 2. Mobile App Updates (bassline-app)
**Status**: ✅ Complete

**Files Updated**:
- ✅ `bassline-app/src/data/venues.js` - New venue data with all CSV fields
- ✅ `bassline-app/src/screens/VenueDetailScreen.js` - Updated UI layout

**UI Changes Made** (as per image requirements):
- ✅ **Removed**: Crowd Level indicator (was showing "Moderate" with colored dot)
- ✅ **Removed**: Wait Time field
- ✅ **Removed**: Estimated Uber cost
- ✅ **Updated**: Quick Stats now shows Hours, Pricing, Area instead
- ✅ **Reorganized**: Detail cards to show:
  - "WHERE TO GO IF" - from CSV "Where you go if" field
  - "YOU CAN EXPECT" - from CSV "You can expect" field  
  - "MUSIC GENRE" - for clubs (e.g., "House, techno, EDM")
  - "CUISINE" - with average drink price
  - "DRINKS" - recommended drinks
  - "RECOMMENDATIONS" - specific menu items
  - "ACCOLADES" - awards and recognition
  - "GOOD TO KNOW" - special notes

### 3. Web App Updates (bassline-web)
**Status**: ✅ Complete

**Files Updated**:
- ✅ `bassline-web/src/data/venues.ts` - TypeScript version with same data structure

### 4. Build Script
**Status**: ✅ Complete

**Created**: `scripts/build-venues-from-csv.mjs`
- Automated CSV parsing and venue data generation
- Handles all three venue types (bars, clubs, restaurants)
- Generates both JavaScript (mobile) and TypeScript (web) outputs
- Preserves all CSV field data
- Run with: `node scripts/build-venues-from-csv.mjs`

---

## Data Structure Example

### Bar Example (Verjus):
```javascript
{
  "id": 3,
  "name": "Verjus",
  "type": "Wine Bar",
  "neighborhood": "Financial District",
  "rating": 4.3,
  "pricing": "$$$",
  "averageDrinkPrice": "$16–18 per glass",
  "hours": "Tue–Wed 4–10; Thu 11:30–10; Fri–Sat 11:30–11; Sun–Mon Closed",
  "description": "Parisian cave à manger with open kitchen and vintage hi‑fi; feels like a dinner party.",
  "tags": ["wine bar", "vinyl", "small plates", "date spot"],
  "cuisine": "French",
  "ambiance": ["Weekly menu", "unique bottles", "great food"],
  "recommendedDrinks": ["Wine", "Cocktails"],
  "recommendations": ["Pain perdu", "pâté en croûte", "charred sausage w/ manchego"],
  "whereToGoIf": "you miss euro summer",
  "accolades": "Michelin Guide; James Beard nominee",
  "instagram": "https://www.instagram.com/verjus_sf",
  "goodToKnow": "Same group as Quince & Cotogna; vinyl à Verjus on weekends"
}
```

### Club Example (Audio):
```javascript
{
  "id": 38,
  "name": "Audio",
  "type": "Club",
  "neighborhood": "SoMa",
  "rating": 4.3,
  "pricing": "$$",
  "hours": "10pm–2am+",
  "tags": ["nightlife", "dancing"],
  "musicGenre": ["House", "techno", "EDM"],
  "openPast2AM": true,
  "whereToGoIf": "you want the best sound system"
}
```

### Restaurant Example (Pinecrest):
```javascript
{
  "id": 44,
  "name": "Pinecrest",
  "type": "Restaurant",
  "neighborhood": "Union Square",
  "rating": 4.3,
  "pricing": "$",
  "hours": "Mon–Wed 7am–11pm; Thu 7am–12am; Fri–Sat 24h; Sun 12am–11pm",
  "description": "Late night Western spot in Union Square",
  "tags": ["late night", "food", "western"],
  "cuisine": "Western",
  "recommendations": ["Steak & eggs", "chili hash browns", "banana pancakes"],
  "whereToGoIf": "you need late night food"
}
```

---

## UI Changes Summary

### Before (Old Design):
```
Quick Stats:
├── Hours
├── Crowd Level (colored dot + "Moderate")  ❌ REMOVED
└── Uber Cost                                ❌ REMOVED

Detail Cards:
├── MUSIC & VIBES
│   ├── Genre                                ❌ REMOVED (moved)
│   ├── Ambiance                             ✓ KEPT (renamed)
│   └── Best Time                            ❌ REMOVED
├── CROWD & DRESS                            ❌ REMOVED
│   ├── Crowd                                ❌ REMOVED
│   ├── Dress Code                           ❌ REMOVED
│   └── Wait Time                            ❌ REMOVED
└── FOOD & DRINKS
    ├── Food                                 ✓ KEPT (renamed)
    └── Recommended                          ✓ KEPT
```

### After (New Design):
```
Quick Stats:
├── Hours                                    ✓ KEPT
├── Pricing                                  ✅ NEW
└── Area (Neighborhood)                      ✅ NEW

Detail Cards (Dynamic - only show if data exists):
├── WHERE TO GO IF                           ✅ NEW
├── YOU CAN EXPECT                           ✅ NEW (was "Ambiance")
├── MUSIC GENRE                              ✅ NEW (for clubs)
├── CUISINE                                  ✅ NEW (with avg price)
├── DRINKS                                   ✓ KEPT
├── RECOMMENDATIONS                          ✅ NEW
├── ACCOLADES                                ✅ NEW
└── GOOD TO KNOW                             ✅ NEW
```

---

## Next Steps

### 🎨 Images (Pending)
Currently all venues use placeholder Unsplash images. See `IMAGE_SOURCING_GUIDE.md` for:
- Image requirements and specifications
- Sourcing strategies (manual, API, stock photos)
- Implementation instructions
- Cost estimates for different approaches

**Recommended Approach**: Start with curated stock photos, then gradually replace with real venue photos.

### 📍 Coordinates (Future Enhancement)
All venues currently use default SF coordinates (37.7749, -122.4194). To add real coordinates:

**Option 1 - Google Places API**:
```javascript
// Can be integrated into build script
const response = await client.findPlaceFromText({
  params: {
    input: `${venueName}, ${neighborhood}, San Francisco`,
    inputtype: "textquery",
    fields: ["geometry"],
    key: API_KEY
  }
});
```

**Option 2 - Manual Entry**:
Update CSV files with latitude/longitude columns.

### 🔄 Future Updates
When adding new venues or updating existing ones:

1. **Update CSV Files**:
   - Edit the appropriate CSV file (Bars-2, Clubs-2, or Munchies-2)
   - Maintain the same column structure

2. **Regenerate Venue Data**:
   ```bash
   node scripts/build-venues-from-csv.mjs
   ```

3. **Commit Changes**:
   ```bash
   git add bassline-app/src/data/venues.js
   git add bassline-web/src/data/venues.ts
   git commit -m "Update venue database"
   ```

---

## Testing Checklist

- [ ] Mobile app loads all 66 venues
- [ ] Venue details show correct information
- [ ] "WHERE TO GO IF" displays for bars
- [ ] "MUSIC GENRE" displays for clubs
- [ ] "RECOMMENDATIONS" displays for restaurants
- [ ] Tags display correctly
- [ ] Instagram links work
- [ ] No crowd level or wait time shown
- [ ] Web app displays same venues
- [ ] Filters work with new venue types

---

## File Changes Summary

### Created:
- ✅ `scripts/build-venues-from-csv.mjs` - Venue data generator
- ✅ `IMAGE_SOURCING_GUIDE.md` - Image sourcing documentation
- ✅ `UPDATE_SUMMARY.md` - This file

### Modified:
- ✅ `bassline-app/src/data/venues.js` - New venue data (66 venues)
- ✅ `bassline-app/src/screens/VenueDetailScreen.js` - Updated UI
- ✅ `bassline-web/src/data/venues.ts` - New venue data (TypeScript)

### Source Data:
- ✅ `FINAL Database - Bars-2.csv` - 36 bars
- ✅ `FINAL Database - Clubs-2.csv` - 7 clubs
- ✅ `FINAL Database - Munchies-2.csv` - 23 restaurants

---

**Last Updated**: October 13, 2025  
**Status**: Database updated, UI updated, Images pending


