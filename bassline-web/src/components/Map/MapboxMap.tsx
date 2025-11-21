'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Map, { Marker, Popup, NavigationControl, FullscreenControl, ScaleControl } from 'react-map-gl';
import maplibreGl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Venue, Coordinates, MapViewport } from '@/types/venue';
import { useVenueStore, useVenueSelectors } from '@/stores/useVenueStore';
import VenueMarker from './VenueMarker';
import VenuePopup from './VenuePopup';
import MapControls from './MapControls';
import HeatmapLayer from './HeatmapLayer';
import ClusterLayer from './ClusterLayer';
import { MAPLIBRE_STYLE_URL } from '@/lib/config';

interface MapboxMapProps {
  className?: string;
  showHeatmap?: boolean;
  showClusters?: boolean;
  enable3DBuildings?: boolean;
}

const MapboxMap: React.FC<MapboxMapProps> = ({
  className = '',
  showHeatmap = false,
  showClusters = true,
  enable3DBuildings = true,
}) => {
  const mapRef = useRef<any>();
  const [viewport, setViewport] = useState<MapViewport>({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 13,
  });
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [hoveredVenue, setHoveredVenue] = useState<Venue | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mapBounds, setMapBounds] = useState<any>(null);

  const { filteredVenues, mapCenter, mapZoom, setMapCenter, setMapZoom } = useVenueStore();
  const { getFilteredVenues } = useVenueSelectors();

  // Get filtered venues from store
  const allVenues = getFilteredVenues();

  // Filter venues by viewport for performance (only show venues in current map bounds)
  const venues = React.useMemo(() => {
    if (!mapBounds || allVenues.length <= 50) {
      // Show all venues if bounds not set yet or small dataset
      return allVenues;
    }

    // For larger datasets, only show venues within current viewport + small buffer
    return allVenues.filter(venue => {
      const { latitude, longitude } = venue.coordinates;
      return mapBounds.contains([longitude, latitude]);
    });
  }, [allVenues, mapBounds]);

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

  // Handle viewport changes - only update store, let useEffect handle viewport updates
  const handleViewportChange = useCallback((newViewport: any) => {
    setMapCenter([newViewport.latitude, newViewport.longitude]);
    setMapZoom(newViewport.zoom);

    // Update map bounds for viewport culling
    if (mapRef.current) {
      const bounds = mapRef.current.getBounds();
      setMapBounds(bounds);
    }
  }, [setMapCenter, setMapZoom]);

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

  // Auto-fit bounds when venues change
  useEffect(() => {
    if (venues.length > 0 && isLoading) {
      setTimeout(fitBoundsToVenues, 500);
      setIsLoading(false);
    }
  }, [venues, isLoading, fitBoundsToVenues]);

  // Handle venue selection
  const handleVenueSelect = useCallback((venue: Venue) => {
    setSelectedVenue(venue);
    setViewport(prev => ({
      ...prev,
      latitude: venue.coordinates.latitude,
      longitude: venue.coordinates.longitude,
      zoom: Math.max(prev.zoom, 16),
    }));
  }, []);

  // Handle venue hover
  const handleVenueHover = useCallback((venue: Venue | null) => {
    setHoveredVenue(venue);
  }, []);

  // Using MapLibre - single style URL
  const getMapStyle = () => {
    return MAPLIBRE_STYLE_URL;
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Map
        ref={mapRef}
        {...viewport}
        onMove={handleViewportChange}
        onMoveEnd={() => {
          // Update bounds after movement stops for more accurate culling
          if (mapRef.current) {
            const bounds = mapRef.current.getBounds();
            setMapBounds(bounds);
          }
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle={MAPLIBRE_STYLE_URL}
        onLoad={() => {
          setIsLoading(false);
          // Initialize map bounds
          if (mapRef.current) {
            const bounds = mapRef.current.getBounds();
            setMapBounds(bounds);
          }
        }}
        onError={(error) => {
          console.error('Map error:', error);
          setIsLoading(false);
        }}
        interactiveLayerIds={['venue-markers']}
        pitch={enable3DBuildings ? 45 : 0}
        bearing={0}
        antialias={enable3DBuildings}
        maxZoom={20}
        minZoom={10}
        // Performance optimizations
        maxTileCacheSize={50}
        preserveDrawingBuffer={false}
        fog={enable3DBuildings ? {
          color: 'rgb(186, 210, 235)',
          'high-color': 'rgb(36, 92, 223)',
          'horizon-blend': 0.02,
          'space-color': 'rgb(11, 11, 25)',
          'star-intensity': 0.6
        } : undefined}
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
          />
        )}
      </Map>

      {/* Custom Controls Overlay */}
      <MapControls
        onFitBounds={fitBoundsToVenues}
        onToggleHeatmap={() => {}}
        onToggleClusters={() => {}}
        showHeatmap={showHeatmap}
        showClusters={showClusters}
        venueCount={venues.length}
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-ui-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-red border-t-transparent"></div>
            <p className="text-ui-text font-body">Loading venues...</p>
          </div>
        </div>
      )}

      {/* Venue Count Badge */}
      {venues.length > 0 && (
        <div className="absolute top-4 left-4 bg-ui-surface/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg border border-ui-border">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📍</span>
            <span className="text-ui-text font-semibold font-body">
              {venues.length} venue{venues.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapboxMap;
