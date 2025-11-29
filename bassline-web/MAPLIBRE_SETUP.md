# MapLibre GL JS Setup Guide

## ✅ Current Status: Token-Free and Ready!

MapLibre GL JS is **already set up and working** in your Bassline web application using free OpenStreetMap tiles. No vendor-specific access token is required.

## 📦 What's Installed

```json
{
  "dependencies": {
    "maplibre-gl": "^4.7.1",
    "react-map-gl": "^7.1.7"
  },
  "devDependencies": {
    "@types/react": "^18.3.12"
  }
}
```

## 🗺️ Current Configuration

**Location**: `src/lib/config.ts`

```typescript
export const MAP_STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty';
```

This uses the free **OpenStreetMap Liberty** style, which works out of the box with MapLibre GL JS.

## 🎨 Customizing Map Styles

### Option 1: Use Free MapLibre Styles

You can switch to different free styles by changing the `MAP_STYLE_URL`:

```typescript
// Current (free OpenStreetMap Liberty style)
export const MAP_STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty';

// Alternative free styles:
// MapLibre demo style
export const MAP_STYLE_URL = 'https://demotiles.maplibre.org/style.json';

// Positron style (light)
export const MAP_STYLE_URL = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

// Dark Matter style (dark)
export const MAP_STYLE_URL = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

// Voyager style (may require third-party token - avoid!)
export const MAP_STYLE_URL = 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json';
```

### Option 2: Use OpenStreetMap (OSM) Tiles

For a completely free, community-maintained option:

```typescript
export const MAP_STYLE_URL = {
  version: 8,
  sources: {
    'osm-tiles': {
      type: 'raster',
      tiles: [
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
      ],
      tileSize: 256,
      attribution: '© OpenStreetMap contributors'
    }
  },
  layers: [
    {
      id: 'osm-tiles',
      type: 'raster',
      source: 'osm-tiles'
    }
  ]
};
```

### Option 3: Create Custom Style with MapTiler (Free Tier)

1. Sign up at [MapTiler](https://www.maptiler.com/) (free tier available)
2. Get your free API key
3. Use their style URL:

```typescript
export const MAP_STYLE_URL = `https://api.maptiler.com/maps/streets-v2/style.json?key=YOUR_KEY_HERE`;
```

### Option 4: Self-Hosted Style Server

For production, you can host your own style server:

```typescript
export const MAP_STYLE_URL = 'https://your-domain.com/styles/your-style.json';
```

## ⚙️ Advanced Configuration

### Map Settings

Edit `src/lib/config.ts` to customize:

```typescript
// Default map center (San Francisco)
export const DEFAULT_CENTER: [number, number] = [37.7749, -122.4194];

// Default zoom level
export const DEFAULT_ZOOM = 13;

// Zoom limits
export const MAX_ZOOM = 20;
export const MIN_ZOOM = 10;

// Map transition duration (ms)
export const MAP_TRANSITION_DURATION = 1000;
```

### Marker Configuration

```typescript
// Marker sizes
export const MARKER_SIZES = {
  small: 24,
  medium: 32,
  large: 40,
} as const;
```

### Clustering Settings

```typescript
export const CLUSTER_RADIUS = 50;
export const CLUSTER_MAX_ZOOM = 14;
```

## 🚀 Quick Style Switch

To quickly change the map style, edit `src/lib/config.ts`:

```typescript
// For a dark theme (great for nightlife app!)
export const MAP_STYLE_URL = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

// For a light, clean look
export const MAP_STYLE_URL = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

// For colorful, detailed maps
export const MAP_STYLE_URL = 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json';
```

## 📱 Testing Your Changes

1. **Local Development**:
   ```bash
   cd bassline-web
   npm run dev
   ```

2. **Build Test**:
   ```bash
   npm run build
   ```

3. **Deploy to Vercel**:
   ```bash
   vercel --prod
   ```

## 🎯 Recommended for Nightlife App

For a Bassline nightlife app, I recommend the **Liberty** style (currently active):

```typescript
export const MAP_STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty';
```

This gives a clean, modern look that's perfect for nightlife apps and is completely free!

Alternatively, for a darker theme, you could use **Dark Matter**:

```typescript
export const MAP_STYLE_URL = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';
```

⚠️ **Note**: Avoid CartoDB Voyager style as it may require credentials from CartoDB.

## 🔧 Troubleshooting

### Map Not Loading?

1. Check browser console for errors
2. Verify the style URL is accessible
3. Ensure `maplibre-gl` CSS is imported (already done in `NightlifeMap.tsx`)

### Style Not Applying?

1. Clear browser cache
2. Check network tab for failed requests
3. Verify the style JSON is valid

### Performance Issues?

1. Reduce `MAX_ZOOM` level
2. Enable clustering for many markers
3. Use lighter style (Positron instead of Voyager)

## 📚 Resources

- [MapLibre GL JS Docs](https://maplibre.org/maplibre-gl-js-docs/)
- [React Map GL Docs](https://visgl.github.io/react-map-gl/)
- [Free Map Styles](https://github.com/maplibre/maplibre-gl-js/blob/main/DEVELOPING.md#free-map-styles)
- [MapTiler Free Tier](https://www.maptiler.com/cloud/)

## ✅ Summary

**You're all set!** MapLibre is already configured and working. Just customize the style URL in `src/lib/config.ts` if you want a different look.

No API keys, no costs, no limits! 🎉


