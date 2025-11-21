// MapLibre configuration
// Using free OpenStreetMap-based style - no API key needed!
// This is completely free and doesn't require any authentication
export const MAPLIBRE_STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty';

// API endpoints (for future backend integration)
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

// Venue data simulation settings
export const VENUE_UPDATE_INTERVAL = 30000; // 30 seconds
export const CROWD_SIMULATION_ENABLED = true;

// Map settings
export const DEFAULT_CENTER: [number, number] = [37.7749, -122.4194]; // San Francisco
export const DEFAULT_ZOOM = 13;
export const MAX_ZOOM = 20;
export const MIN_ZOOM = 10;

// Venue marker settings
export const MARKER_SIZES = {
  small: 24,
  medium: 32,
  large: 40,
} as const;

// Clustering settings
export const CLUSTER_RADIUS = 50;
export const CLUSTER_MAX_ZOOM = 14;

// Heatmap settings
export const HEATMAP_RADIUS = 30;
export const HEATMAP_MAX_ZOOM = 16;
export const HEATMAP_INTENSITY = 0.8;

// Animation settings
export const MAP_TRANSITION_DURATION = 1000;
export const MARKER_ANIMATION_DURATION = 300;

// UI settings
export const MOBILE_BREAKPOINT = 768;
export const TABLET_BREAKPOINT = 1024;

// Feature flags
export const FEATURES = {
  ENABLE_REAL_TIME_DATA: true,
  ENABLE_SOCIAL_FEATURES: true,
  ENABLE_ADVANCED_FILTERS: true,
  ENABLE_HEATMAP: true,
  ENABLE_3D_BUILDINGS: true,
  ENABLE_CLUSTERING: true,
  ENABLE_PWA: false, // Enable when PWA is implemented
} as const;
