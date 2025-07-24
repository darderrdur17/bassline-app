'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { DivIcon } from 'leaflet';
import { Venue } from '@/types/venue';
import { colors } from '@/lib/theme';

// Fix for default markers in react-leaflet
import L from 'leaflet';
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapProps {
  venues: Venue[];
  selectedVenue: Venue | null;
  onVenueSelect: (venue: Venue) => void;
}

const pinColors = {
  Bar: '#2196F3',        // Blue
  Restaurant: '#E53935', // Red (brand)
  Lounge: '#FFEB3B',     // Yellow
  Club: '#4CAF50',       // Green
};

// Cache icons by color to avoid recreating
const iconCache: Record<string, DivIcon> = {};

const getColoredIcon = (color: string): DivIcon => {
  if (iconCache[color]) return iconCache[color];
  const icon = new DivIcon({
    html: `<span style="display:inline-block;width:18px;height:18px;background:${color};border-radius:50%;border:2px solid #fff;"></span>`,
    iconSize: [18, 18],
    className: 'bassline-marker-icon',
  });
  iconCache[color] = icon;
  return icon;
};

const getMarkerColor = (venue: Venue) => {
  return pinColors[venue.type as keyof typeof pinColors] || colors.primary;
};

export default function Map({ venues, selectedVenue, onVenueSelect }: MapProps) {
  return (
    <div className="relative w-full h-full">
      {/* Pin Directory Overlay */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center space-y-1">
        {/* Results Count */}
        <div className="px-4 py-1 bg-white border-2 border-red-600 rounded-full shadow-sm text-sm font-semibold" style={{ fontFamily: 'var(--font-body)', color: '#E53935' }}>
          {venues.length} venues found
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-4 bg-white border-2 border-red-600 rounded-full px-4 py-1">
          {([
              { label: 'Bar', color: '#2196F3' },
              { label: 'Restaurant', color: '#E53935' },
              { label: 'Lounge', color: '#FFEB3B', outline: true },
              { label: 'Club', color: '#4CAF50' },
            ] as Array<{ label: string; color: string; outline?: boolean }>)
          .map((item) => (
            <div key={item.label} className="flex items-center text-sm font-semibold" style={{ fontFamily: 'var(--font-body)', color: '#E53935' }}>
              <span
                className="inline-block mr-1"
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 9999,
                  backgroundColor: item.color,
                  border: item.outline ? '1px solid #000' : undefined,
                }}
              />
              {item.label}
            </div>
          ))}
        </div>
      </div>

      <MapContainer
        center={[37.7749, -122.4194]} // San Francisco
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {venues.map((venue) => (
          <Marker
            key={venue.id}
            position={[venue.coordinates.latitude, venue.coordinates.longitude]}
            icon={getColoredIcon(getMarkerColor(venue))}
            eventHandlers={{
              click: () => onVenueSelect(venue),
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg">{venue.name}</h3>
                <p className="text-sm text-gray-600">{venue.type}</p>
                <p className="text-sm text-gray-600">{venue.neighborhood}</p>
                {venue.shortDescription && (
                  <p className="text-sm mt-2">{venue.shortDescription}</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {selectedVenue && (
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="font-bold text-lg">{selectedVenue.name}</h3>
            <p className="text-sm text-gray-600">{selectedVenue.type}</p>
            <p className="text-sm text-gray-600">{selectedVenue.neighborhood}</p>
            {selectedVenue.shortDescription && (
              <p className="text-sm mt-2">{selectedVenue.shortDescription}</p>
            )}
            <button 
              onClick={() => onVenueSelect(null as any)}
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 