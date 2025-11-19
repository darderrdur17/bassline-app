'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { DivIcon } from 'leaflet';
import { Venue } from '@/types/venue';
import { formatVenueHours } from '@/utils/formatHours';

// Fix for default markers in react-leaflet
import L from 'leaflet';
delete (L.Icon.Default.prototype as any)._getIconUrl;


const typeColors = {
  Bar: '#E53935',        // Red
  Restaurant: '#4CAF50', // Green
  Club: '#9C27B0',       // Purple
};

const fadedTypeColors = {
  Bar: '#E5393580',        // Red with opacity
  Restaurant: '#4CAF5080', // Green with opacity
  Club: '#9C27B080',       // Purple with opacity
};

// Cache icons by color to avoid recreating
const iconCache: Record<string, DivIcon> = {};

const getColoredIcon = (color: string, venue: Venue): DivIcon => {
  const cacheKey = `${color}-${venue.id}`;
  if (iconCache[cacheKey]) return iconCache[cacheKey];

  const icon = new DivIcon({
    html: `
      <div style="position:relative; width:24px; height:24px;">
        <div style="width:20px; height:20px; background:${color}; border-radius:50%; border:2px solid #fff; box-shadow:0 2px 6px rgba(0,0,0,0.4); transform:translate(-50%,-50%); position:absolute; top:50%; left:50%;"></div>
        <div style="position:absolute; top:-2px; left:50%; transform:translateX(-50%); width:8px; height:8px; background:#fff; border-radius:50%; box-shadow:0 1px 3px rgba(0,0,0,0.3);"></div>
      </div>
    `,
    className: 'custom-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
  iconCache[cacheKey] = icon;
  return icon;
};

const getMarkerColor = (venue: Venue, isFiltered: boolean = true) => {
  const colorMap = isFiltered ? typeColors : fadedTypeColors;
  return colorMap[venue.type as keyof typeof colorMap] || (isFiltered ? typeColors.Bar : fadedTypeColors.Bar);
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
  allVenues?: Venue[];
  selectedVenue: Venue | null;
  onVenueSelect: (venue: Venue) => void;
}

export default function Map({ venues, allVenues = [], selectedVenue, onVenueSelect }: MapProps) {
  const [mapError, setMapError] = useState<string | null>(null);
  const [currentVenueIndex, setCurrentVenueIndex] = useState<number | null>(null);
  
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
  const filteredVenueIds = new Set(filteredVenues.map(v => v.id));

  // Combine filtered and unfiltered venues, prioritizing filtered ones
  const allVenuesToShow = allVenues.length > 0 ? allVenues : filteredVenues;

  // Update current venue index when selectedVenue changes
  useEffect(() => {
    if (selectedVenue) {
      const index = filteredVenues.findIndex(v => v.id === selectedVenue.id);
      setCurrentVenueIndex(index >= 0 ? index : null);
    } else {
      setCurrentVenueIndex(null);
    }
  }, [selectedVenue, filteredVenues]);

  // Handle next button click
  const handleNext = () => {
    if (currentVenueIndex !== null && filteredVenues.length > 0) {
      const nextIndex = (currentVenueIndex + 1) % filteredVenues.length;
      setCurrentVenueIndex(nextIndex);
      onVenueSelect(filteredVenues[nextIndex]);
    }
  };

  // Handle previous button click
  const handlePrevious = () => {
    if (currentVenueIndex !== null && filteredVenues.length > 0) {
      const prevIndex = (currentVenueIndex - 1 + filteredVenues.length) % filteredVenues.length;
      setCurrentVenueIndex(prevIndex);
      onVenueSelect(filteredVenues[prevIndex]);
    }
  };

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

          {allVenuesToShow.map((venue) => {
            const isFiltered = filteredVenueIds.has(venue.id);
            return (
              <Marker
                key={venue.id}
                position={[venue.coordinates.latitude, venue.coordinates.longitude]}
                icon={getColoredIcon(getMarkerColor(venue, isFiltered), venue)}
                eventHandlers={{
                  click: () => onVenueSelect(venue),
                }}
              >
                <Popup>
                  <div className="p-4 max-w-sm">
                    {/* Venue Image */}
                    {venue.heroImage && (
                      <div className="mb-3 -mx-4 -mt-4">
                        <img
                          src={venue.heroImage}
                          alt={venue.name}
                          className="w-full h-32 object-cover rounded-t-lg"
                        />
                      </div>
                    )}

                    {/* Venue Header */}
                    <div className="mb-3">
                      <h3 className="font-bold text-[#E53935] mb-1 text-lg">{venue.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-[#E53935]/10 text-[#E53935] rounded text-xs font-medium">
                          {venue.type}
                        </span>
                        <span className="text-xs text-gray-500">📍 {venue.neighborhood}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <span className="text-yellow-500">⭐</span> {venue.rating}
                        </span>
                        <span>•</span>
                        <span className="font-medium">{venue.pricing}</span>
                      </div>
                    </div>

                    {/* Description */}
                    {venue.shortDescription && (
                      <p className="text-sm text-gray-600 mb-3 leading-relaxed line-clamp-2">
                        {venue.shortDescription}
                      </p>
                    )}

                    {/* Key Info */}
                    <div className="space-y-2 mb-4">
                      {venue.averageDrinkPrice && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">Avg. Price:</span>
                          <span className="font-medium text-gray-900">{venue.averageDrinkPrice}</span>
                        </div>
                      )}

                      {venue.musicGenre && venue.musicGenre.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {venue.musicGenre.slice(0, 2).map((genre) => (
                            <span key={genre} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                              {genre}
                            </span>
                          ))}
                        </div>
                      )}

                      {venue.hours && (
                        <div className="text-xs text-gray-500">
                          {formatVenueHours ? formatVenueHours(venue.hours).split(';')[0] : 'Hours available'}
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onVenueSelect(venue);
                        }}
                        className="w-full px-4 py-2 bg-[#E53935] text-white rounded-lg font-semibold text-sm hover:bg-[#C62D2D] transition-colors"
                      >
                        View Details
                      </button>

                      {isFiltered && filteredVenues.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNext();
                          }}
                          className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-200 transition-colors"
                        >
                          Next Venue →
                        </button>
                      )}
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* Map Navigation Overlay */}
        {filteredVenues.length > 1 && currentVenueIndex !== null && (
          <div className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 z-[1000] flex flex-col gap-2">
            <button
              onClick={handlePrevious}
              className="bg-white/90 backdrop-blur-sm hover:bg-white border border-gray-300 rounded-full p-2 sm:p-3 shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#E53935]/50 touch-manipulation"
              aria-label="Previous venue"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#E53935]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
        )}

        {filteredVenues.length > 1 && currentVenueIndex !== null && (
          <div className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 z-[1000] flex flex-col gap-2">
            <button
              onClick={handleNext}
              className="bg-white/90 backdrop-blur-sm hover:bg-white border border-gray-300 rounded-full p-2 sm:p-3 shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#E53935]/50 touch-manipulation"
              aria-label="Next venue"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#E53935]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Venue Counter */}
        {filteredVenues.length > 1 && currentVenueIndex !== null && (
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 z-[1000]">
            <div className="bg-white/90 backdrop-blur-sm border border-gray-300 rounded-full px-3 sm:px-4 py-1 sm:py-2 shadow-lg">
              <span className="text-xs sm:text-sm font-medium text-[#E53935]">
                {currentVenueIndex + 1} of {filteredVenues.length}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    setMapError(error instanceof Error ? error.message : 'Unknown error occurred');
    return null;
  }
} 