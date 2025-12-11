'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Venue } from '@/types/venue';
import { mapStyle } from './mapStyles';
import Marker from './Marker';
import VenueInfoWindow from './VenueInfoWindow';
import MapSearch from './MapSearch';
import MapControls from './MapControls';
import { useVenueStore } from '@/stores/useVenueStore';

// google-map-react depends on window, so load it client-side only
const GoogleMapReact = dynamic(() => import('google-map-react'), { ssr: false });

interface GoogleNightlifeMapProps {
  venues: Venue[];
  className?: string;
}

const DEFAULT_CENTER = {
  lat: 37.7749,
  lng: -122.4194,
};

const DEFAULT_ZOOM = 13;

const typeColorMap: Record<string, string> = {
  bar: '#E53935', // red
  restaurant: '#F59E0B', // amber/yellow
  club: '#2E7D32', // green
};

const getMarkerColor = (type: string) => {
  const normalized = type.toLowerCase();
  if (normalized.includes('bar')) return typeColorMap.bar;
  if (normalized.includes('restaurant')) return typeColorMap.restaurant;
  if (normalized.includes('club')) return typeColorMap.club;
  return '#4285F4'; // default blue
};

const GoogleNightlifeMap: React.FC<GoogleNightlifeMapProps> = ({ venues, className = '' }) => {
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [hoveredVenueId, setHoveredVenueId] = useState<number | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const globalSearchQuery = useVenueStore((state) => state.searchQuery);
  const setSearchQuery = useVenueStore((state) => state.setSearchQuery);
  const setStoreSelectedVenue = useVenueStore((state) => state.setSelectedVenue);
  const [searchInput, setSearchInput] = useState(globalSearchQuery);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Venue[]>(venues);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const [mapZoom, setMapZoom] = useState(DEFAULT_ZOOM);
  const [isMapReady, setIsMapReady] = useState(false);
  const geocoderRef = useRef<any>(null);
  const geocodeCacheRef = useRef<Map<number, { lat: number; lng: number }>>(new Map());

  const coordsEqual = useCallback(
    (a: { lat: number; lng: number } | undefined, b: { lat: number; lng: number }) => {
      if (!a) return false;
      const EPS = 1e-6;
      return Math.abs(a.lat - b.lat) < EPS && Math.abs(a.lng - b.lng) < EPS;
    },
    []
  );

  const applySearch = useCallback((baseVenues: Venue[], query: string) => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return baseVenues;

    // Keep search fields in sync with the global filter (useVenueSelectors)
    return baseVenues.filter((venue) => {
      return (
        venue.name.toLowerCase().includes(trimmed) ||
        venue.neighborhood.toLowerCase().includes(trimmed) ||
        venue.type.toLowerCase().includes(trimmed) ||
        venue.description?.toLowerCase().includes(trimmed) ||
        venue.musicGenre?.some((genre) => genre.toLowerCase().includes(trimmed)) ||
        venue.tags?.some((tag) => tag.toLowerCase().includes(trimmed))
      );
    });
  }, []);

  const focusOnVenue = useCallback((venue: Venue, zoom: number = 15) => {
    setMapCenter({
      lat: venue.coordinates.latitude,
      lng: venue.coordinates.longitude,
    });
    setMapZoom((prev) => {
      if (!zoom) return prev;
      // Preserve user zoom unless we need to zoom in; never zoom out automatically
      return Math.max(prev, zoom);
    });
  }, []);

  const handleApiLoaded = useCallback(({ map }: { map: any }) => {
    mapInstanceRef.current = map;
    setIsMapReady(true);
  }, []);

  const ensureGeocoder = useCallback(() => {
    if (geocoderRef.current) return geocoderRef.current;
    if (typeof window !== 'undefined' && (window as any)?.google?.maps?.Geocoder) {
      geocoderRef.current = new (window as any).google.maps.Geocoder();
    }
    return geocoderRef.current;
  }, []);

  const geocodeVenue = useCallback(
    async (venue: Venue): Promise<{ lat: number; lng: number } | null> => {
      const cached = geocodeCacheRef.current.get(venue.id);
      if (cached) return cached;

      const geocoder = ensureGeocoder();
      if (!geocoder) return null;

      const query = `${venue.name} ${venue.neighborhood ?? ''} San Francisco`.trim();

      return new Promise((resolve) => {
        geocoder.geocode({ address: query }, (results: any, status: any) => {
          if (status === 'OK' && results?.[0]?.geometry?.location) {
            const loc = results[0].geometry.location;
            const coords = { lat: loc.lat(), lng: loc.lng() };
            geocodeCacheRef.current.set(venue.id, coords);
            resolve(coords);
          } else {
            resolve(null);
          }
        });
      });
    },
    [ensureGeocoder]
  );

  const handleSearchChange = useCallback(
    (query: string) => {
      setSearchInput(query);
      setSearchQuery(query);
    },
    [setSearchQuery]
  );

  // Debounce search input for performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchInput);
    }, 180);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Sync map search input with global search state (e.g., hero search bar)
  useEffect(() => {
    setSearchInput(globalSearchQuery);
    setDebouncedQuery(globalSearchQuery);
  }, [globalSearchQuery]);

  // Re-run search when the base venue list or query changes
  useEffect(() => {
    let isCancelled = false;

    const run = async () => {
      let results = applySearch(venues, debouncedQuery);
      if (isCancelled) return;

      const hasQuery = debouncedQuery.trim().length > 0;

      if (results.length === 0) {
        setSelectedVenue(null);
        setCurrentIndex(0);
        return;
      }

      const currentSelectedIndex = selectedVenue
        ? results.findIndex((venue) => venue.id === selectedVenue.id)
        : -1;

      const nextIndex = currentSelectedIndex >= 0 ? currentSelectedIndex : 0;
      setCurrentIndex(nextIndex);

      const targetVenue = results[nextIndex];
      const shouldRecenter = hasQuery || selectedVenue === null;

      if (shouldRecenter) {
        let newCenter = {
          lat: targetVenue.coordinates.latitude,
          lng: targetVenue.coordinates.longitude,
        };
        let targetVenueWithGeo = targetVenue;

        if (hasQuery && isMapReady) {
          const geocoded = await geocodeVenue(targetVenue);
          if (geocoded && !isCancelled) {
            newCenter = geocoded;
            targetVenueWithGeo = {
              ...targetVenue,
              coordinates: {
                latitude: geocoded.lat,
                longitude: geocoded.lng,
              },
            };

            // Update results so markers & info windows use accurate coords
            results = results.map((v) =>
              v.id === targetVenue.id
                ? {
                    ...v,
                    coordinates: {
                      latitude: geocoded.lat,
                      longitude: geocoded.lng,
                    },
                  }
                : v
            );
          }
        }

        if (isCancelled) return;

        setSearchResults(results);

        setMapCenter(newCenter);

        // Use map instance to pan to location if available, otherwise state update will handle it
        if (isMapReady && mapInstanceRef.current) {
          mapInstanceRef.current.panTo(newCenter);
          
          // Set zoom if needed
          const currentZoom = mapInstanceRef.current.getZoom?.();
          const targetZoom = hasQuery ? Math.max(12, typeof currentZoom === 'number' ? currentZoom : mapZoom) : mapZoom;

          if (typeof currentZoom === 'number' && currentZoom < targetZoom) {
            mapInstanceRef.current.setZoom(targetZoom);
          }

          if (hasQuery) {
            setMapZoom((prev) => Math.max(prev, 12));
          }
        } else {
          // Preserve user zoom unless the search explicitly zooms; only bump if zoomed very far out
          if (hasQuery && mapZoom < 12) {
            setMapZoom((prev) => (prev < 12 ? 12 : prev));
          }
        }

        // Auto-select the first search result to show info window (avoid infinite re-render if already selected)
        if (
          hasQuery &&
          (!selectedVenue || selectedVenue.id !== targetVenueWithGeo.id || !coordsEqual(
            {
              lat: selectedVenue.coordinates.latitude,
              lng: selectedVenue.coordinates.longitude,
            },
            newCenter
          ))
        ) {
          setSelectedVenue(targetVenueWithGeo);
        }
      }
    };

    run();

    return () => {
      isCancelled = true;
    };
  }, [applySearch, venues, debouncedQuery, selectedVenue, mapZoom, isMapReady, geocodeVenue]);

  const handleVenueSelect = useCallback(
    (venue: Venue) => {
      setSelectedVenue(venue);
      setStoreSelectedVenue(venue);
      focusOnVenue(venue, 15);
      const index = searchResults.findIndex((v) => v.id === venue.id);
      if (index >= 0) {
        setCurrentIndex(index);
      }
    },
    [focusOnVenue, searchResults, setStoreSelectedVenue]
  );

  const handleMarkerClick = useCallback(
    (venue: Venue) => {
      handleVenueSelect(venue);
    },
    [handleVenueSelect]
  );

  const handleMapClick = useCallback(() => {
    setSelectedVenue(null);
    setHoveredVenueId(null);
  }, []);

  const handleNext = useCallback(() => {
    if (!searchResults.length) return;
    const nextIndex = Math.min(currentIndex + 1, searchResults.length - 1);
    if (nextIndex === currentIndex) return;
    const venue = searchResults[nextIndex];
    setCurrentIndex(nextIndex);
    setSelectedVenue(venue);
    focusOnVenue(venue, 15);
  }, [currentIndex, searchResults, focusOnVenue]);

  const handlePrevious = useCallback(() => {
    if (!searchResults.length) return;
    const prevIndex = Math.max(currentIndex - 1, 0);
    if (prevIndex === currentIndex) return;
    const venue = searchResults[prevIndex];
    setCurrentIndex(prevIndex);
    setSelectedVenue(venue);
    focusOnVenue(venue, 15);
  }, [currentIndex, searchResults, focusOnVenue]);

  const activeVenues = useMemo(() => searchResults, [searchResults]);

  // Center the map on the selected venue when available
  // This ensures the map pans to venue when selected (from clicks, navigation, etc.)
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedVenue || !isMapReady) return;

    mapInstanceRef.current.panTo({
      lat: selectedVenue.coordinates.latitude,
      lng: selectedVenue.coordinates.longitude,
    });

    const currentZoom = mapInstanceRef.current.getZoom?.();
    if (typeof currentZoom === 'number' && currentZoom < 15) {
      mapInstanceRef.current.setZoom(15);
    }
  }, [selectedVenue, isMapReady]);

  // If the API key is missing, render a helpful message instead of a broken map
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gray-100 text-center text-sm text-gray-600 px-6">
        <div>
          <p className="font-semibold text-gray-800 mb-2">Google Maps API key not configured</p>
          <p>Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to .env.local to enable the Google map.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative h-full w-full ${className}`}>
      <MapSearch
        venues={activeVenues}
        query={searchInput}
        onQueryChange={handleSearchChange}
        onVenueSelect={handleVenueSelect}
        onHoverVenue={setHoveredVenueId}
      />

      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, libraries: ['places'] as any }}
        center={mapCenter}
        zoom={mapZoom}
        options={{
          styles: mapStyle,
          clickableIcons: false,
          gestureHandling: 'greedy',
          zoomControl: true,
          fullscreenControl: false,
        }}
        onClick={handleMapClick}
        onChange={({ center, zoom }) => {
          if (center?.lat && center?.lng) {
            setMapCenter({ lat: center.lat, lng: center.lng });
          }
          if (typeof zoom === 'number') {
            setMapZoom(zoom);
          }
        }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={handleApiLoaded}
      >
        {activeVenues.map((venue) => (
          <Marker
            key={venue.id}
            lat={venue.coordinates.latitude}
            lng={venue.coordinates.longitude}
            onClick={() => handleMarkerClick(venue)}
            isSelected={selectedVenue?.id === venue.id}
            isHighlighted={hoveredVenueId === venue.id}
            color={getMarkerColor(venue.type)}
          />
        ))}

        {selectedVenue && (
          <VenueInfoWindow
            lat={selectedVenue.coordinates.latitude}
            lng={selectedVenue.coordinates.longitude}
            venue={selectedVenue}
            onClose={() => setSelectedVenue(null)}
            onViewDetails={(venue) => {
              setStoreSelectedVenue(venue);
              // Keep info window venue selected locally too
              setSelectedVenue(venue);
            }}
          />
        )}
      </GoogleMapReact>

      <MapControls
        venueCount={activeVenues.length}
        onNext={activeVenues.length > 1 ? handleNext : undefined}
        onPrevious={activeVenues.length > 1 ? handlePrevious : undefined}
        currentIndex={activeVenues.length ? currentIndex : 0}
        totalVenues={activeVenues.length}
      />
    </div>
  );
};

export default GoogleNightlifeMap;

