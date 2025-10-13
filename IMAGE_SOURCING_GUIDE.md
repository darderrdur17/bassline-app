# Image Sourcing Guide for Bassline Venues

## Overview
This guide provides instructions for adding high-quality images to all venues in the Bassline app.

## Current Status
- **Total Venues**: 66 (36 bars, 7 clubs, 23 restaurants)
- **Current Images**: Placeholder Unsplash images
- **Target**: Real venue photos for each location

## Image Requirements

### Technical Specifications
- **Format**: JPG or PNG
- **Size**: Minimum 1200x800px (landscape orientation)
- **Aspect Ratio**: 3:2 or 16:9
- **File Size**: < 500KB (optimized)
- **Quality**: High resolution, well-lit, professional

### Content Guidelines
- Show the venue's interior or exterior
- Capture the ambiance and atmosphere
- Avoid photos with too many people (for privacy)
- Ensure proper lighting
- Highlight unique features

## Sourcing Options

### 1. Direct from Venues
**Best Option**: Contact venues directly via Instagram or email
- Check their Instagram/social media for existing photos
- Request permission to use photos
- Many venues have press kits available

### 2. Unsplash/Pexels (Free Stock)
**Current Approach**: Using generic bar/restaurant photos
- Search for venue type (e.g., "wine bar", "nightclub")
- Filter by SF or urban settings
- Free to use commercially

### 3. Google Places API
**Automated Option**: Use Google Places API to fetch venue photos
- Requires API key ($0.007 per photo request)
- Provides real venue images
- Automatically updated

### 4. Professional Photography
**Premium Option**: Hire photographer for original content
- Cost: ~$150-300 per venue
- Best quality and uniqueness
- Full rights to images

## Implementation Steps

### Option A: Manual Update (Recommended for Start)

1. **For Each Venue**:
   - Visit venue's Instagram/website
   - Download 1 hero image + 3 gallery images
   - Save with naming convention: `{venue-id}-hero.jpg`, `{venue-id}-1.jpg`, etc.

2. **Image Organization**:
   ```
   bassline-app/assets/images/venues/
   ├── bars/
   │   ├── bar-part-time-hero.jpg
   │   ├── bar-part-time-1.jpg
   │   └── ...
   ├── clubs/
   └── restaurants/
   ```

3. **Update Venue Data**:
   ```javascript
   heroImage: require('../../assets/images/venues/bars/bar-part-time-hero.jpg'),
   gallery: [
     require('../../assets/images/venues/bars/bar-part-time-1.jpg'),
     require('../../assets/images/venues/bars/bar-part-time-2.jpg'),
     require('../../assets/images/venues/bars/bar-part-time-3.jpg'),
   ]
   ```

### Option B: Google Places API Integration

1. **Setup**:
   ```bash
   npm install @googlemaps/google-maps-services-js
   ```

2. **Create Image Fetcher Script**:
   ```javascript
   // scripts/fetch-venue-images.mjs
   import { Client } from "@googlemaps/google-maps-services-js";
   
   const client = new Client({});
   const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
   
   async function fetchVenueImages(venueName, address) {
     const response = await client.findPlaceFromText({
       params: {
         input: `${venueName}, ${address}, San Francisco`,
         inputtype: "textquery",
         fields: ["photos", "place_id"],
         key: API_KEY
       }
     });
     
     // Process and save images
     // ...
   }
   ```

3. **Run Script**:
   ```bash
   GOOGLE_PLACES_API_KEY=your_key node scripts/fetch-venue-images.mjs
   ```

### Option C: Hybrid Approach (Recommended)

1. Start with free stock photos for ambiance
2. Gradually replace with real venue photos
3. Prioritize top 20 most popular venues
4. Contact venues for permission/photos

## Next Steps

1. ✅ Database updated with new CSV data
2. ✅ UI updated to match design requirements
3. ⏳ Choose image sourcing strategy
4. ⏳ Implement image pipeline
5. ⏳ Test image loading performance

## Cost Estimates

| Option | Cost | Time | Quality |
|--------|------|------|---------|
| Manual (Instagram) | Free | ~30 min/venue | Medium-High |
| Stock Photos | Free | ~5 min/venue | Low-Medium |
| Google Places API | ~$0.50 | Automated | Medium |
| Professional Photos | $10,000+ | 1-2 months | Highest |

## Recommended Workflow

**Phase 1: Quick Start (1-2 days)**
- Use curated Unsplash photos for each venue type
- Ensure all venues have relevant imagery

**Phase 2: Real Photos (1-2 weeks)**
- Contact top 20 venues for photos
- Use Google Places API for remaining venues
- Test and optimize image loading

**Phase 3: Polish (Ongoing)**
- Replace with higher quality images
- Update as venues change
- Add seasonal/event photos

## Contact Information

For venues requiring permission:
- Template email available in `/docs/photo-permission-template.txt`
- Track responses in `/docs/venue-image-tracking.xlsx`

## Technical Notes

### Image Optimization
```bash
# Install imagemin
npm install -g imagemin-cli imagemin-mozjpeg

# Optimize images
imagemin input.jpg --plugin=mozjpeg > output.jpg
```

### CDN Setup (Future)
- Consider using Cloudinary or Imgix for image hosting
- Enables dynamic resizing and optimization
- Reduces app bundle size

---

**Last Updated**: October 13, 2025
**Status**: Database updated, images pending


