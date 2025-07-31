'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { DivIcon } from 'leaflet';
import { Venue } from '@/types/venue';

// Fix for default markers in react-leaflet
import L from 'leaflet';
delete (L.Icon.Default.prototype as any)._getIconUrl;


const typeColors = {
  Bar: '#E53935',        // Red
  Restaurant: '#4CAF50', // Green  
  Club: '#9C27B0',       // Purple
};

// Cache icons by color to avoid recreating
const iconCache: Record<string, DivIcon> = {};

const getColoredIcon = (color: string): DivIcon => {
  if (iconCache[color]) return iconCache[color];
  const icon = new DivIcon({
    html: `<div style="width:20px;height:20px;background:${color};border-radius:50%;border:2px solid #fff;box-shadow:0 2px 4px rgba(0,0,0,0.3);transform:translate(-50%,-50%);"></div>`,
    className: 'custom-marker',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10],
  });
  iconCache[color] = icon;
  return icon;
};

const getMarkerColor = (venue: Venue) => {
  return typeColors[venue.type as keyof typeof typeColors] || typeColors.Bar;
};

// Helper component to auto-fit the map to current venues
function AutoFitBounds({ venues }: { venues: Venue[] }) {
  const map = useMap();
  
  useEffect(() => {
    if (!venues || venues.length === 0) return;
    
    try {
      const bounds = L.latLngBounds(
        venues.map((v) => [v.coordinates.latitude, v.coordinates.longitude] as [number, number])
      );
      
      map.fitBounds(bounds, { 
        padding: [30, 30],
        maxZoom: 15,
        animate: true,
        duration: 1
      });
    } catch (error) {
      console.error('Error fitting bounds:', error);
    }
  }, [venues, map]);
  
  return null;
}

interface MapProps {
  venues: Venue[];
  selectedVenue: Venue | null;
  onVenueSelect: (venue: Venue) => void;
}

export default function Map({ venues, selectedVenue, onVenueSelect }: MapProps) {
  const [mapError, setMapError] = useState<string | null>(null);
  
  // Set up Leaflet icons properly
  useEffect(() => {
    try {
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
    } catch (error) {
      console.error('Error setting up icons:', error);
    }
  }, []);
  
  // Filter venues based on props
  const filteredVenues = venues || [];

  console.log('Map component rendered with venues:', venues?.length || 0, 'filtered:', filteredVenues.length);

  if (mapError) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100">
        <div className="text-center p-4">
          <p className="text-red-600 mb-2">Map failed to load</p>
          <p className="text-gray-600 text-sm">{mapError}</p>
          <button 
            onClick={() => setMapError(null)}
            className="mt-2 px-4 py-2 bg-[#E53935] text-white rounded hover:bg-[#C62D2D]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  try {
    return (
      <div className="h-full w-full relative">
        <MapContainer
          center={[37.7749, -122.4194]}
          zoom={13}
          style={{ height: '100%', width: '100%', minHeight: '400px' }}
          zoomControl={true}
          attributionControl={false}
          scrollWheelZoom={true}
          touchZoom={true}
          doubleClickZoom={true}
          dragging={true}
          zoomSnap={0.5}
          zoomDelta={0.5}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={19}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <AutoFitBounds venues={filteredVenues} />
          
          {filteredVenues.map((venue) => (
            <Marker
              key={venue.id}
              position={[venue.coordinates.latitude, venue.coordinates.longitude]}
              icon={getColoredIcon(getMarkerColor(venue))}
              eventHandlers={{
                click: () => onVenueSelect(venue),
              }}
            >
              <Popup>
                <div className="p-3 max-w-xs">
                  <h3 className="font-bold text-[#E53935] mb-2 text-base">{venue.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{venue.type} • {venue.neighborhood}</p>
                  <p className="text-sm text-gray-600 mb-2">⭐ {venue.rating} • {venue.pricing}</p>
                  {venue.shortDescription && (
                    <p className="text-xs text-gray-500 mb-2 leading-relaxed">{venue.shortDescription}</p>
                  )}
                  <div className="flex gap-1 flex-wrap">
                    {venue.musicGenre.slice(0, 2).map((genre) => (
                      <span key={genre} className="px-2 py-1 bg-[#E53935]/10 text-[#E53935] rounded text-xs font-medium">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>


      </div>
    );
  } catch (error) {
    setMapError(error instanceof Error ? error.message : 'Unknown error occurred');
    return null;
  }
} 