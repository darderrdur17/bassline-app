'use client';

import React, { useMemo, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Venue } from '@/types/venue';
import { mapStyle } from './mapStyles';
import Marker from './Marker';
import VenueInfoWindow from './VenueInfoWindow';

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

const GoogleNightlifeMap: React.FC<GoogleNightlifeMapProps> = ({ venues, className = '' }) => {
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

  const defaultCenter = useMemo(() => {
    if (selectedVenue) {
      return {
        lat: selectedVenue.coordinates.latitude,
        lng: selectedVenue.coordinates.longitude,
      };
    }
    if (venues.length > 0) {
      return {
        lat: venues[0].coordinates.latitude,
        lng: venues[0].coordinates.longitude,
      };
    }
    return DEFAULT_CENTER;
  }, [venues, selectedVenue]);

  const handleMarkerClick = useCallback((venue: Venue) => {
    setSelectedVenue(venue);
  }, []);

  const handleMapClick = useCallback(() => {
    setSelectedVenue(null);
  }, []);

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
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY }}
        defaultCenter={defaultCenter}
        defaultZoom={DEFAULT_ZOOM}
        options={{
          styles: mapStyle,
          clickableIcons: false,
          gestureHandling: 'greedy',
          zoomControl: true,
          fullscreenControl: false,
        }}
        onClick={handleMapClick}
      >
        {venues.map((venue) => (
          <Marker
            key={venue.id}
            lat={venue.coordinates.latitude}
            lng={venue.coordinates.longitude}
            onClick={() => handleMarkerClick(venue)}
            isSelected={selectedVenue?.id === venue.id}
          />
        ))}

        {selectedVenue && (
          <VenueInfoWindow
            lat={selectedVenue.coordinates.latitude}
            lng={selectedVenue.coordinates.longitude}
            venue={selectedVenue}
            onClose={() => setSelectedVenue(null)}
          />
        )}
      </GoogleMapReact>
    </div>
  );
};

export default GoogleNightlifeMap;

