'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { DivIcon } from 'leaflet';
import { Venue } from '@/types/venue';

// Fix for default markers in react-leaflet
import L from 'leaflet';
delete (L.Icon.Default.prototype as any)._getIconUrl;

const pinColors = {
  Bar: '#E53935',        // Red (matches mobile app)
  Restaurant: '#E53935', // Red (matches mobile app)
  Lounge: '#FF9800',     // Orange/Yellow
  Club: '#4CAF50',       // Green
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
  return pinColors[venue.type as keyof typeof pinColors] || pinColors.Bar;
};

// Helper component to auto-fit the map to current venues
function AutoFitBounds({ venues }: { venues: Venue[] }) {
  const map = useMap();
  
  useEffect(() => {
    if (!venues || venues.length === 0) return;
    
    const bounds = L.latLngBounds(
      venues.map((v) => [v.coordinates.latitude, v.coordinates.longitude] as [number, number])
    );
    
    map.fitBounds(bounds, { 
      padding: [30, 30],
      maxZoom: 15,
      animate: true,
      duration: 1
    });
  }, [venues, map]);
  
  return null;
}

interface MapProps {
  venues: Venue[];
  selectedVenue: Venue | null;
  onVenueSelect: (venue: Venue) => void;
}

export default function Map({ venues, selectedVenue, onVenueSelect }: MapProps) {
  const [searchText, setSearchText] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (type: string) => {
    setActiveFilters(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  // Filter venues based on search and active filters
  const filteredVenues = venues.filter(venue => {
    const matchesSearch = searchText.trim() === '' || 
      venue.name.toLowerCase().includes(searchText.toLowerCase()) ||
      venue.neighborhood.toLowerCase().includes(searchText.toLowerCase()) ||
      venue.tags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase()));
    
    const matchesFilter = activeFilters.length === 0 || activeFilters.includes(venue.type);
    
    return matchesSearch && matchesFilter;
  });

  console.log('Map component rendered with venues:', venues.length, 'filtered:', filteredVenues.length);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header - Red Banner */}
      <div className="bg-[#E53935] text-white px-4 pt-4 pb-4">
        <div className="text-center">
          <h1 className="text-2xl font-brand font-bold tracking-wider mb-1">
            BASSLINE
          </h1>
          <p className="text-xs opacity-90">
            THE CITY NEVER SLEEPS, NEITHER SHOULD YOU.
          </p>
        </div>
      </div>

      {/* Search Section - White Background */}
      <div className="bg-white px-4 py-3">
        <p className="text-center text-sm mb-3 text-black font-medium">
          WHAT ARE YOU FEELING TONIGHT?
        </p>

        <div className="flex gap-2 mb-3">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search venues, moods, music..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-800 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#E53935]"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
          <button 
            className="px-3 py-2 bg-gray-200 rounded-lg"
            aria-label="Open filters"
          >
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h4a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Venues count - Red pill */}
        <div className="mb-3">
          <div className="inline-block bg-[#E53935] text-white rounded-full px-3 py-1 text-xs font-medium">
            {filteredVenues.length} venues found
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 justify-center">
          {Object.entries(pinColors).map(([type, color]) => (
            <button
              key={type}
              onClick={() => toggleFilter(type)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeFilters.includes(type) 
                  ? 'bg-gray-200 shadow-sm' 
                  : 'bg-gray-100'
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: color }}
              />
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative" style={{ minHeight: '400px' }}>
        {typeof window !== 'undefined' && (
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
                  <div className="p-3 min-w-[200px]">
                    <h3 className="font-brand font-bold text-base text-[#E53935] mb-2">
                      {venue.name}
                    </h3>
                    <div className="space-y-1 text-xs text-gray-700">
                      <div className="flex justify-between">
                        <span className="font-medium">Type:</span>
                        <span>{venue.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Rating:</span>
                        <span>⭐ {venue.rating}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Price:</span>
                        <span>{venue.pricing}</span>
                      </div>
                    </div>
                    {venue.shortDescription && (
                      <p className="text-xs mt-2 text-gray-600 border-t pt-2">
                        {venue.shortDescription}
                      </p>
                    )}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onVenueSelect(venue);
                      }}
                      className="mt-2 w-full px-3 py-1.5 bg-[#E53935] text-white rounded text-xs font-medium hover:bg-[#C62D2D] transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>

      {/* Bottom navigation */}
      <div className="bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around items-center">
          {[
            { icon: '🏠', label: 'Home', active: true },
            { icon: '🗺️', label: 'Explore', active: false },
            { icon: '💾', label: 'Saved', active: false },
            { icon: '👥', label: 'Social', active: false },
            { icon: 'ℹ️', label: 'Info', active: false },
          ].map((item) => (
            <button
              key={item.label}
              className={`flex flex-col items-center py-1 px-2 ${
                item.active ? 'text-[#E53935]' : 'text-gray-500'
              }`}
            >
              <span className="text-lg mb-0.5">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected venue overlay */}
      {selectedVenue && (
        <div className="absolute bottom-20 left-4 right-4 z-[1000]">
          <div className="bg-white rounded-lg shadow-xl p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-brand font-bold text-lg text-[#E53935]">
                {selectedVenue.name}
              </h3>
              <button 
                onClick={() => onVenueSelect(null as any)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                ✕
              </button>
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              <p><span className="font-medium">Type:</span> {selectedVenue.type}</p>
              <p><span className="font-medium">Rating:</span> ⭐ {selectedVenue.rating}</p>
              <p><span className="font-medium">Neighborhood:</span> {selectedVenue.neighborhood}</p>
            </div>
            {selectedVenue.shortDescription && (
              <p className="text-sm mt-2 text-gray-700 border-t pt-2">
                {selectedVenue.shortDescription}
              </p>
            )}
            <button 
              onClick={() => onVenueSelect(selectedVenue)}
              className="w-full mt-3 px-4 py-2 bg-[#E53935] text-white rounded-lg font-medium hover:bg-[#C62D2D] transition-colors"
            >
              View Full Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 