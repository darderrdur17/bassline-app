'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Map, { Marker, Popup, NavigationControl, GeolocateControl, FullscreenControl, ScaleControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Venue, Coordinates, MapViewport } from '@/types/venue';
import { useVenueStore, useVenueSelectors } from '@/stores/useVenueStore';
import VenueMarker from './VenueMarker';
import VenuePopup from './VenuePopup';
import MapControls from './MapControls';
import HeatmapLayer from './HeatmapLayer';
import ClusterLayer from './ClusterLayer';
import { MAPBOX_ACCESS_TOKEN } from '@/lib/config';

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

  const { filteredVenues, mapCenter, mapZoom, setMapCenter, setMapZoom } = useVenueStore();
  const { getFilteredVenues } = useVenueSelectors();

  // Get filtered venues from store
  const venues = getFilteredVenues();

  // Update viewport when store changes
  useEffect(() => {
    setViewport(prev => ({
      ...prev,
      latitude: mapCenter[0],
      longitude: mapCenter[1],
      zoom: mapZoom,
    }));
  }, [mapCenter, mapZoom]);

  // Handle viewport changes
  const handleViewportChange = useCallback((newViewport: any) => {
    setViewport(newViewport);
    setMapCenter([newViewport.latitude, newViewport.longitude]);
    setMapZoom(newViewport.zoom);
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

  // Map style based on features
  const getMapStyle = () => {
    if (enable3DBuildings) {
      return 'mapbox://styles/mapbox/streets-v12';
    }
    return 'mapbox://styles/mapbox/light-v11';
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Map
        ref={mapRef}
        {...viewport}
        onMove={handleViewportChange}
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        style={{ width: '100%', height: '100%' }}
        mapStyle={getMapStyle()}
        onLoad={() => setIsLoading(false)}
        interactiveLayerIds={['venue-markers']}
        pitch={enable3DBuildings ? 45 : 0}
        bearing={0}
        antialias={enable3DBuildings}
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
        <GeolocateControl
          position="top-right"
          trackUserLocation
          showUserHeading
        />
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
