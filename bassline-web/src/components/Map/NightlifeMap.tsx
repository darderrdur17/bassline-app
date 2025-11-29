'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Map, { NavigationControl, FullscreenControl, ScaleControl } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Venue, VenueLight, MapViewport } from '@/types/venue';
import { useVenueStore, useVenueSelectors } from '@/stores/useVenueStore';
import VenueMarker from './VenueMarker';
import VenuePopup from './VenuePopup';
import MapControls from './MapControls';
import HeatmapLayer from './HeatmapLayer';
import ClusterLayer from './ClusterLayer';
import { MAP_STYLE_URL } from '@/lib/config';
import { getMapShareUrl } from '@/utils/mapLinks';

const FALLBACK_MAP_STYLE_URL = 'https://demotiles.maplibre.org/style.json';

interface NightlifeMapProps {
  className?: string;
  enable3DBuildings?: boolean;
}

const NightlifeMap: React.FC<NightlifeMapProps> = ({
  className = '',
  enable3DBuildings = true,
}) => {
  const mapRef = useRef<any>();
  const boundsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [viewport, setViewport] = useState<MapViewport>({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 12, // Slightly zoomed out to show more of SF initially
  });
  const [mapStyleUrl, setMapStyleUrl] = useState(MAP_STYLE_URL);
  const [hasTriedFallback, setHasTriedFallback] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [hoveredVenue, setHoveredVenue] = useState<Venue | VenueLight | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapBounds, setMapBounds] = useState<any>(null);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showClusters, setShowClusters] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  const { mapCenter, mapZoom, setMapCenter, setMapZoom, mapFocusVenueId, setMapFocusVenueId } = useVenueStore();
  const { getFilteredVenues } = useVenueSelectors();

  // Get filtered venues from store
  const allVenues = getFilteredVenues();

  // Optimized venue filtering with progressive loading
  const venues = React.useMemo(() => {
    // Show limited venues initially for faster loading
    if (!isMapLoaded) {
      return allVenues.slice(0, 20); // Show first 20 venues while loading
    }

    // During map movement, show cached results to prevent flickering
    if (isMoving && mapBounds) {
      return allVenues.filter(venue => {
        const { latitude, longitude } = venue.coordinates;
        return mapBounds.contains([longitude, latitude]);
      });
    }

    // Normal viewport culling for performance
    if (mapBounds && allVenues.length > 50) {
      // Add a small buffer around viewport for smoother experience
      const bufferedBounds = {
        ...mapBounds,
        _sw: {
          lng: mapBounds._sw.lng - 0.01,
          lat: mapBounds._sw.lat - 0.01
        },
        _ne: {
          lng: mapBounds._ne.lng + 0.01,
          lat: mapBounds._ne.lat + 0.01
        },
        contains: (point: [number, number]) => {
          return point[0] >= bufferedBounds._sw.lng &&
                 point[0] <= bufferedBounds._ne.lng &&
                 point[1] >= bufferedBounds._sw.lat &&
                 point[1] <= bufferedBounds._ne.lat;
        }
      };

      return allVenues.filter(venue => {
        const { latitude, longitude } = venue.coordinates;
        return bufferedBounds.contains([longitude, latitude]);
      });
    }

    return allVenues;
  }, [allVenues, mapBounds, isMapLoaded, isMoving]);

  const focusOnVenue = useCallback((venue: Venue, zoomOverride?: number) => {
    if (!mapRef.current) return;
    
    const targetZoom = zoomOverride ?? Math.max(viewport.zoom, 15);
    
    // Use flyTo for smooth animation
    mapRef.current.flyTo({
      center: [venue.coordinates.longitude, venue.coordinates.latitude],
      zoom: targetZoom,
      duration: 1000,
      essential: true,
    });
    
    // Also update viewport state for consistency
    setViewport(prev => ({
      ...prev,
      latitude: venue.coordinates.latitude,
      longitude: venue.coordinates.longitude,
      zoom: targetZoom,
    }));
  }, [viewport.zoom]);

  // Focus specific venue requests (e.g., from "Get Directions")
  useEffect(() => {
    if (!mapFocusVenueId) return;
    const venueToFocus = allVenues.find((venue) => venue.id === mapFocusVenueId);
    if (!venueToFocus) {
      return;
    }

    focusOnVenue(venueToFocus, 16);
    setSelectedVenue(venueToFocus);
    setMapFocusVenueId(null);
  }, [mapFocusVenueId, allVenues, setMapFocusVenueId, focusOnVenue]);

  // Update viewport when store changes
  useEffect(() => {
    // Ensure valid coordinates (not NaN)
    if (isNaN(mapCenter[0]) || isNaN(mapCenter[1]) || isNaN(mapZoom)) {
      return; // Don't update if invalid
    }
    setViewport(prev => ({
      ...prev,
      latitude: mapCenter[0],
      longitude: mapCenter[1],
      zoom: mapZoom,
    }));
  }, [mapCenter, mapZoom]);

  // Debounced bounds update to prevent excessive filtering during map movement
  const debouncedSetBounds = useCallback((bounds: any) => {
    if (boundsTimeoutRef.current) {
      clearTimeout(boundsTimeoutRef.current);
    }
    boundsTimeoutRef.current = setTimeout(() => {
      setMapBounds(bounds);
      setIsMoving(false);
    }, 150);
  }, [setMapBounds, setIsMoving]);

  useEffect(() => {
    return () => {
      if (boundsTimeoutRef.current) {
        clearTimeout(boundsTimeoutRef.current);
      }
    };
  }, []);

  // Handle viewport changes - only update store, let useEffect handle viewport updates
  const handleViewportChange = useCallback((newViewport: any) => {
    setMapCenter([newViewport.latitude, newViewport.longitude]);
    setMapZoom(newViewport.zoom);
    setIsMoving(true);

    // Update map bounds with debouncing for performance
    if (mapRef.current) {
      const bounds = mapRef.current.getBounds();
      debouncedSetBounds(bounds);
    }
  }, [setMapCenter, setMapZoom, debouncedSetBounds]);

  // Fit bounds to show all venues
  const fitBoundsToVenues = useCallback(() => {
    if (venues.length === 0 || !mapRef.current) return;

    const bounds = venues.reduce(
      (acc, venue) => {
        const { latitude, longitude } = venue.coordinates;
        return {
          minLat: Math.min(acc.minLat, latitude),
          maxLat: Math.max(acc.maxLat, latitude),
          minLng: Math.min(acc.minLng, longitude),
          maxLng: Math.max(acc.maxLng, longitude),
        };
      },
      {
        minLat: venues[0].coordinates.latitude,
        maxLat: venues[0].coordinates.latitude,
        minLng: venues[0].coordinates.longitude,
        maxLng: venues[0].coordinates.longitude,
      }
    );

    mapRef.current.fitBounds(
      [
        [bounds.minLng, bounds.minLat],
        [bounds.maxLng, bounds.maxLat],
      ],
      { padding: 50, duration: 1000 }
    );
  }, [venues]);

  // Auto-fit bounds when venues change and map is loaded
  useEffect(() => {
    if (venues.length > 0 && isMapLoaded) {
      // Immediate fit bounds instead of delayed
      fitBoundsToVenues();
    }
  }, [venues, isMapLoaded, fitBoundsToVenues]);

  useEffect(() => {
    if (isMapLoaded || mapError) return;
    const timer = setTimeout(() => {
      if (!isMapLoaded) {
        setMapError('Still loading map… please check your connection or refresh.');
      }
    }, 6000);
    return () => clearTimeout(timer);
  }, [isMapLoaded, mapError]);

  // Handle venue selection
  const handleVenueSelect = useCallback((venue: Venue) => {
    setSelectedVenue(venue);
    focusOnVenue(venue, 16);
  }, [focusOnVenue]);

  // Handle venue hover
  const handleVenueHover = useCallback((venue: Venue | VenueLight | null) => {
    setHoveredVenue(venue);
  }, []);

  const selectedIndex = selectedVenue ? allVenues.findIndex(v => v.id === selectedVenue.id) : -1;

  const selectRelativeVenue = useCallback((offset: number) => {
    if (!allVenues.length) return;
    let nextIndex = selectedIndex;
    if (nextIndex === -1) {
      nextIndex = 0;
    }
    nextIndex = (nextIndex + offset + allVenues.length) % allVenues.length;
    const nextVenue = allVenues[nextIndex];
    if (nextVenue) {
      setSelectedVenue(nextVenue);
      focusOnVenue(nextVenue, 16);
    }
  }, [selectedIndex, allVenues, focusOnVenue]);

  const handleOpenInMaps = useCallback((venue: Venue) => {
    if (typeof window === 'undefined') return;
    const shareUrl = getMapShareUrl(
      venue.coordinates.latitude,
      venue.coordinates.longitude,
      Math.round(viewport.zoom ?? 15)
    );
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  }, [viewport.zoom]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Loading skeleton */}
      {!isMapLoaded && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-2xl flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-brand-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-body">Loading map...</p>
          </div>
        </div>
      )}
      {mapError && (
        <div className="absolute inset-0 rounded-2xl border border-red-200 bg-white/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center px-6 text-center">
          <p className="text-brand-red font-semibold mb-2">{mapError}</p>
          <button
            onClick={() => {
              setMapError(null);
              setIsMapLoaded(false);
              setHasTriedFallback(false);
              setMapStyleUrl(MAP_STYLE_URL);
              setTimeout(() => mapRef.current?.resize(), 0);
            }}
            className="btn-primary px-4 py-2 text-sm"
          >
            Retry
          </button>
        </div>
      )}

      <Map
        ref={mapRef}
        {...viewport}
        onMove={handleViewportChange}
        style={{ width: '100%', height: '100%', cursor: isMoving ? 'grabbing' : 'grab' }}
        mapStyle={mapStyleUrl}
        mapLib={maplibregl as any}
        dragPan={true}
        dragRotate={false}
        scrollZoom={true}
        touchZoomRotate={true}
        touchPitch={false}
        keyboard={false}
        doubleClickZoom={true}
        onLoad={() => {
          setIsMapLoaded(true);
          setIsMoving(false);
          mapRef.current?.resize();
          // Initialize map bounds
          if (mapRef.current) {
            const bounds = mapRef.current.getBounds();
            setMapBounds(bounds);
          }
        }}
        onMoveStart={() => {
          setIsMoving(true);
        }}
        onMoveEnd={() => {
          setIsMoving(false);
          // Update bounds after movement stops for more accurate culling
          if (mapRef.current) {
            const bounds = mapRef.current.getBounds();
            setMapBounds(bounds);
          }
        }}
        // Performance optimizations
        maxTileCacheSize={50}
        preserveDrawingBuffer={false}
        trackResize={true}
        pitchWithRotate={true}
        onError={(error) => {
          console.error('Map error:', error);
          if (!hasTriedFallback) {
            setHasTriedFallback(true);
            setMapStyleUrl(FALLBACK_MAP_STYLE_URL);
            return;
          }
          setMapError(error?.error?.message || 'Unable to load map right now.');
        }}
        interactiveLayerIds={['venue-markers']}
        pitch={enable3DBuildings ? 45 : 0}
        bearing={0}
        antialias={enable3DBuildings}
        maxZoom={20}
        minZoom={10}
        fog={enable3DBuildings ? {
          color: 'rgb(186, 210, 235)',
          'high-color': 'rgb(36, 92, 223)',
          'horizon-blend': 0.02,
          'space-color': 'rgb(11, 11, 25)',
          'star-intensity': 0.6
        } : undefined}
        onMouseLeave={() => handleVenueHover(null)}
        onTouchEnd={() => handleVenueHover(null)}
      >
        {/* Controls */}
        <NavigationControl position="top-right" />
        <FullscreenControl position="top-right" />
        <ScaleControl position="bottom-left" />

        {/* Heatmap Layer */}
        {showHeatmap && <HeatmapLayer venues={venues} />}

        {/* Cluster Layer */}
        {showClusters && venues.length > 20 && <ClusterLayer venues={venues} />}

        {/* Individual Venue Markers */}
        {(!showClusters || venues.length <= 20) && venues.map((venue) => (
          <VenueMarker
            key={venue.id}
            venue={venue}
            isSelected={selectedVenue?.id === venue.id}
            isHovered={hoveredVenue?.id === venue.id}
            onClick={() => handleVenueSelect(venue)}
            onHover={handleVenueHover}
          />
        ))}

        {/* Venue Popup */}
        {selectedVenue && (
          <VenuePopup
            venue={selectedVenue}
            onClose={() => setSelectedVenue(null)}
            anchor="bottom"
            onSelectNext={() => selectRelativeVenue(1)}
            onSelectPrev={() => selectRelativeVenue(-1)}
            onOpenInMaps={handleOpenInMaps}
          />
        )}
      </Map>

      {/* Custom Controls Overlay */}
      <MapControls
        onFitBounds={fitBoundsToVenues}
        onToggleHeatmap={() => setShowHeatmap(!showHeatmap)}
        onToggleClusters={() => setShowClusters(!showClusters)}
        showHeatmap={showHeatmap}
        showClusters={showClusters}
        venueCount={venues.length}
      />


      {/* Venue Count Badge */}
      <div className="absolute top-4 left-4 bg-ui-surface/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg border border-ui-border pointer-events-none select-none">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📍</span>
          {venues.length > 0 ? (
            <div className="flex flex-col">
              <span className="text-ui-text font-semibold font-body">
                {venues.length} venue{venues.length !== 1 ? 's' : ''}
                {isMoving && <span className="text-xs text-brand-red ml-1">•</span>}
              </span>
              <span className="text-xs text-ui-text-secondary">
                {isMoving ? 'Updating...' : 'Click markers for details'}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-brand-red border-t-transparent"></div>
              <span className="text-ui-text-secondary font-body text-sm">
                {isMoving ? 'Filtering venues...' : 'Loading venues...'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NightlifeMap;
