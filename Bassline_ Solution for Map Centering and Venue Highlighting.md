# Bassline: Solution for Map Centering and Venue Highlighting

This document provides a comprehensive code solution to fix the search-to-map functionality, ensuring that when a user selects a venue from the search results, the map automatically centers on that venue and highlights its marker.

## 1. The Core Problem: Lack of Map Interaction

As identified in the investigation, the search query is correctly passed to the map component, but the map itself does not react to the selection of a search result. To fix this, we need to implement a communication channel between the `MapSearch` component and the `GoogleNightlifeMap` component.

## 2. The Solution: State Lifting and Callbacks

We will lift the state of the selected venue up to the `GoogleNightlifeMap` component and pass a callback function down to the `MapSearch` component. When a venue is selected in the search results, the callback will be invoked, updating the state in the parent `GoogleNightlifeMap` component and triggering a map recentering and marker highlighting.

### Step 1: Update `GoogleNightlifeMap.tsx` to Manage Selected Venue and Center the Map

We will add state to track the selected venue and use a `useEffect` hook to center the map whenever the selected venue changes.

**File:** `bassline-web/src/components/Map/GoogleNightlifeMap.tsx`

```typescript
'use client';
import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { Venue } from '@/types/venue';
import { mapStyle } from './mapStyles';
import Marker from './Marker';
import VenueInfoWindow from './VenueInfoWindow';
import MapSearch from './MapSearch';
import MapControls from './MapControls';
import { useVenueStore } from '@/stores/useVenueStore';
import GoogleMapReact from 'google-map-react';

const DEFAULT_CENTER = {
  lat: 37.7749,
  lng: -122.4194,
};

const DEFAULT_ZOOM = 13;

const GoogleNightlifeMap: React.FC<{ venues: Venue[]; className?: string }> = ({ venues, className = '' }) => {
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [map, setMap] = useState<any>(null);
  const [maps, setMaps] = useState<any>(null);

  const handleApiLoaded = (map: any, maps: any) => {
    setMap(map);
    setMaps(maps);
  };

  const handleVenueSelect = useCallback((venue: Venue) => {
    setSelectedVenue(venue);
  }, []);

  useEffect(() => {
    if (map && selectedVenue) {
      map.panTo({ lat: selectedVenue.lat, lng: selectedVenue.lng });
      map.setZoom(15);
    }
  }, [map, selectedVenue]);

  return (
    <div className={`relative ${className}`}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY! }}
        defaultCenter={DEFAULT_CENTER}
        defaultZoom={DEFAULT_ZOOM}
        options={{ styles: mapStyle, disableDefaultUI: true }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        {venues.map((venue) => (
          <Marker
            key={venue.id}
            lat={venue.lat}
            lng={venue.lng}
            venue={venue}
            isSelected={selectedVenue?.id === venue.id}
            onClick={() => setSelectedVenue(venue)}
          />
        ))}
        {selectedVenue && (
          <VenueInfoWindow
            lat={selectedVenue.lat}
            lng={selectedVenue.lng}
            venue={selectedVenue}
            onCloseClick={() => setSelectedVenue(null)}
          />
        )}
      </GoogleMapReact>
      <MapSearch venues={venues} onVenueSelect={handleVenueSelect} />
      <MapControls />
    </div>
  );
};

export default GoogleNightlifeMap;
```

### Step 2: Update `MapSearch.tsx` to Trigger Venue Selection

We will add an `onVenueSelect` prop to the `MapSearch` component and call it when a user clicks on a search result.

**File:** `bassline-web/src/components/Map/MapSearch.tsx`

```typescript
'use client';
import React, { useState, useEffect } from 'react';
import { Venue } from '@/types/venue';

interface MapSearchProps {
  venues: Venue[];
  onVenueSelect: (venue: Venue) => void;
}

const MapSearch: React.FC<MapSearchProps> = ({ venues, onVenueSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Venue[]>([]);

  useEffect(() => {
    if (query) {
      const lowercasedQuery = query.toLowerCase();
      const filtered = venues.filter(
        (venue) =>
          venue.name.toLowerCase().includes(lowercasedQuery) ||
          venue.type.toLowerCase().includes(lowercasedQuery) ||
          venue.neighborhood.toLowerCase().includes(lowercasedQuery)
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query, venues]);

  const handleSelect = (venue: Venue) => {
    onVenueSelect(venue);
    setQuery(venue.name);
    setResults([]);
  };

  return (
    <div className="absolute top-4 left-4 z-10 w-72">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search venues on map..."
        className="w-full p-2 rounded-md shadow-md"
      />
      {results.length > 0 && (
        <ul className="bg-white mt-1 rounded-md shadow-md">
          {results.map((venue) => (
            <li
              key={venue.id}
              onClick={() => handleSelect(venue)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {venue.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MapSearch;
```

### Step 3: Update `Marker.tsx` to Visually Highlight the Selected Venue

We will add an `isSelected` prop to the `Marker` component to change its appearance when it is selected.

**File:** `bassline-web/src/components/Map/Marker.tsx`

```typescript
import React from 'react';
import { Venue } from '@/types/venue';
import './Marker.css';

interface MarkerProps {
  lat: number;
  lng: number;
  venue: Venue;
  isSelected: boolean;
  onClick: () => void;
}

const Marker: React.FC<MarkerProps> = ({ venue, isSelected, onClick }) => {
  return (
    <div
      className={`marker ${isSelected ? 'marker-selected' : ''}`}
      onClick={onClick}
      title={venue.name}
    >
      <div className="marker-pin"></div>
    </div>
  );
};

export default Marker;
```

And add the corresponding CSS for the selected state:

**File:** `bassline-web/src/components/Map/Marker.css`

```css
.marker {
  /* ... existing styles */
  transition: transform 0.2s ease-in-out;
}

.marker-selected .marker-pin {
  background-color: #ff3b30; /* A bright color to highlight */
  transform: scale(1.5); /* Make the selected marker larger */
}
```

## 3. Summary of the Solution

By implementing these changes, we create a seamless user experience:

1.  **State is Lifted**: The `GoogleNightlifeMap` component now manages which venue is selected.
2.  **Callback on Select**: The `MapSearch` component now informs its parent when a venue is selected.
3.  **Map Centers**: The `GoogleNightlifeMap` automatically pans and zooms to the selected venue.
4.  **Marker is Highlighted**: The selected venue's marker is now larger and a different color, making it easy to spot.

This solution directly addresses the user's issue and significantly improves the usability of the map feature.
