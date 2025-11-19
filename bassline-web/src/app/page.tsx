'use client';

import { useState, useEffect } from 'react';
import { venues } from '@/data/venues';
import { moodMapping } from '@/data/venues';
import dynamic from 'next/dynamic';
const DynamicMap = dynamic(() => import('@/components/Map'), { 
  ssr: false, 
  loading: () => (
    <div className="h-96 sm:h-[600px] bg-gray-100 rounded-lg animate-pulse flex items-center justify-center text-gray-500">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E53935] mx-auto mb-2"></div>
        <p>Loading map...</p>
      </div>
    </div>
  )
});
import VenueModal from '@/components/VenueModal';
import React from 'react';
import FilterDrawer from '@/components/FilterDrawer';
import { formatVenueHours } from '@/utils/formatHours';

export default function Home() {
  const [searchText, setSearchText] = useState('');
  const [filteredVenues, setFilteredVenues] = useState(venues);
  const [selectedVenue, setSelectedVenue] = useState(null as any);
  const [activeTypes, setActiveTypes] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [advFilters, setAdvFilters] = useState({ neighborhood: [], pricing: [], musicGenre: [] } as { neighborhood: string[]; pricing: string[]; musicGenre: string[] });
  const [showMap, setShowMap] = useState(true); // Changed to true to show map by default
  const [showAllVenues, setShowAllVenues] = useState(false);

  const handleSearch = (text: string) => {
    setSearchText(text);
    setShowMap(true); // Always show map when searching
  };

  const toggleType = (type: string) => {
    setActiveTypes((prev) => {
      const newTypes = prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type];
      setShowMap(true); // Always show map when filtering
      return newTypes;
    });
  };

  const handleMoodSelection = (mood: string) => {
    const moodVenues = moodMapping[mood];
    if (moodVenues) {
      const filtered = venues.filter(venue => moodVenues.includes(venue.name));
      setFilteredVenues(filtered);
      setShowMap(true);
      // Scroll to map
      setTimeout(() => {
        const mapElement = document.getElementById('venue-map');
        if (mapElement) {
          mapElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleShowAllVenues = () => {
    setFilteredVenues(venues);
    setShowMap(true);
    setSearchText('');
    setActiveTypes([]);
    setAdvFilters({ neighborhood: [], pricing: [], musicGenre: [] });
    // Scroll to map
    setTimeout(() => {
      const mapElement = document.getElementById('venue-map');
      if (mapElement) {
        mapElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleShowAllVenuesList = () => {
    setShowAllVenues(true);
    setTimeout(() => {
      const allVenuesElement = document.getElementById('all-venues');
      if (allVenuesElement) {
        allVenuesElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Compute filtered venues when search or filters change
  React.useEffect(() => {
    let filtered = venues;

    if (searchText.trim()) {
      const term = searchText.toLowerCase();
      filtered = filtered.filter((venue: any) =>
        venue.name.toLowerCase().includes(term) ||
        venue.neighborhood.toLowerCase().includes(term) ||
        venue.type.toLowerCase().includes(term) ||
        (venue.musicGenre || []).some((g: string) => g.toLowerCase().includes(term)) ||
        venue.tags.some((t: string) => t.toLowerCase().includes(term))
      );
    }

    if (activeTypes.length) {
      filtered = filtered.filter((v: any) => activeTypes.includes(v.type));
    }

    // Neighborhood filter
    if (advFilters.neighborhood.length) {
      filtered = filtered.filter((v: any) => advFilters.neighborhood.includes(v.neighborhood));
    }

    // Pricing filter
    if (advFilters.pricing.length) {
      filtered = filtered.filter((v: any) => advFilters.pricing.includes(v.pricing));
    }

    // Music genre filter
    if (advFilters.musicGenre.length) {
      filtered = filtered.filter((v: any) => (v.musicGenre || []).some((g: string) => advFilters.musicGenre.includes(g)));
    }

    setFilteredVenues(filtered);
  }, [searchText, activeTypes, advFilters]);

  const featuredVenues = venues.slice(0, 3);
  const moodOptions = ['chill', 'party', 'date', 'classy', 'music', 'drinks'];

  // Component for venue card
  const VenueCard = ({ venue, index = 0 }: { venue: any; index?: number }) => (
    <div 
      key={venue.id}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={() => setSelectedVenue(venue)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setSelectedVenue(venue);
        }
      }}
      aria-label={`View details for ${venue.name}`}
    >
      <div className="relative overflow-hidden">
        <img 
          src={venue.heroImage} 
          alt={`${venue.name} interior`}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 bg-black/70 text-white text-xs rounded-full font-body">
            {venue.type}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-brand mb-3 text-[#E53935] group-hover:text-[#C62D2D] transition-colors">
          {venue.name}
        </h3>
        <p className="text-gray-600 mb-4 text-sm font-body line-clamp-2 leading-relaxed">
          {(() => {
            const text = venue.shortDescription || '';
            // Ensure sentence case: capitalize first letter if not already
            if (!text) return '';
            return text.charAt(0).toUpperCase() + text.slice(1);
          })()}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-500 font-body mb-4">
          <span className="flex items-center gap-1">📍 {venue.neighborhood}</span>
          <span className="flex items-center gap-1">
            <span aria-label="Rating">⭐</span> {venue.rating}
          </span>
        </div>
        <div className="flex items-center justify-between mb-4 gap-3">
          <span className="text-sm font-semibold text-gray-700 font-body">{venue.pricing} </span>
          <span className="text-xs text-gray-500 font-body">{formatVenueHours(venue.hours)}</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {(venue.musicGenre || []).slice(0, 2).map((genre: string) => (
            <span key={genre} className="px-2 py-1 bg-[#E53935]/10 text-[#E53935] rounded text-xs font-medium font-body">
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F5F5DC]">
      {/* Hero Section */}
      <div className="bg-[#E53935] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="text-center animate-fade-in-up">
            {/* Milkshake Logo */}
            <div className="flex justify-center mb-4">
              <img 
                src="/images/milkshake-logo.png" 
                alt="Bassline Logo" 
                className="h-32 sm:h-40 md:h-48 w-auto object-contain"
                onError={(e) => {
                  // Fallback if image doesn't exist yet
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-brand mb-4">
              BASSLINE
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-2 opacity-90 font-tagline">
              THE CITY NEVER SLEEPS, NEITHER SHOULD YOU.
            </p>
            <p className="text-base sm:text-lg mb-8 sm:mb-12 opacity-80 max-w-2xl mx-auto font-body">
              Discover San Francisco's best nightlife venues with mood-based discovery
            </p>
            
            <div className="mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl mb-6 font-label whitespace-nowrap">
                WHAT ARE YOU FEELING TONIGHT?
              </h2>
              
              {/* Search Bar */}
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
                <input 
                  type="text"
                  placeholder="Search venues, moods, music..."
                  className="flex-1 px-4 py-3 rounded-lg border-2 border-white bg-white text-gray-800 placeholder-gray-500 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-white/50 font-body"
                  aria-label="Search venues"
                  value={searchText}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <button 
                  className="px-6 py-3 bg-white text-[#E53935] rounded-lg font-semibold text-lg hover:bg-gray-100 focus:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 font-button"
                  aria-label="Search"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              {/* Mood Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3 max-w-2xl mx-auto mb-6">
                {moodOptions.map((mood) => (
                  <button
                    key={mood}
                    onClick={() => handleMoodSelection(mood)}
                    className="px-3 py-2 sm:px-4 sm:py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 focus:bg-white/20 transition-all capitalize font-semibold text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white/50 font-button"
                    aria-label={`Find ${mood} venues`}
                  >
                    {mood}
                  </button>
                ))}
              </div>
              
              {/* Type Filters */}
              <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
                {['Bar', 'Restaurant', 'Club'].map((type) => (
                  <button
                    key={type}
                    onClick={() => toggleType(type)}
                    className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full border-2 font-semibold text-sm sm:text-base transition-all focus:outline-none focus:ring-2 focus:ring-white/50 font-button ${
                      activeTypes.includes(type)
                        ? 'bg-white text-[#E53935] border-white'
                        : 'bg-transparent text-white border-white hover:scale-105 focus:scale-105'
                    }`}
                    aria-label={`Filter by ${type}`}
                    aria-pressed={activeTypes.includes(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section - Always visible */}
      <div id="venue-map" className="bg-white shadow-lg animate-fade-in-up">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 p-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-title text-[#E53935]">
              VENUE MAP
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setDrawerOpen(true)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 font-button"
                aria-label="Open filters"
              >
                Filters
              </button>
            </div>
          </div>
          <div className="h-96 sm:h-[600px] rounded-lg overflow-hidden shadow-md touch-pan-x touch-pan-y">
            <DynamicMap
              venues={filteredVenues as any}
              selectedVenue={selectedVenue}
              onVenueSelect={(v) => setSelectedVenue(v)}
            />
          </div>
          {filteredVenues.length > 0 && (
            <p className="text-center mt-4 text-gray-600 font-body p-4">
              Showing {filteredVenues.length} venue{filteredVenues.length !== 1 ? 's' : ''}
            </p>
          )}
          {filteredVenues.length === 0 && (searchText.trim() || activeTypes.length > 0) && (
            <p className="text-center mt-4 text-gray-600 font-body p-4">
              No venues found matching your criteria. Try adjusting your search or filters.
            </p>
          )}
          {/* Avocado Logo under the map */}
          <div className="flex justify-center mt-6 mb-4">
            <img 
              src="/images/avocado-logo.png" 
              alt="Bassline Mascot" 
              className="h-24 w-auto object-contain"
              onError={(e) => {
                // Fallback if image doesn't exist yet
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>

      {/* All Venues Section - Always visible */}
      <div id="all-venues" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 bg-white">
        <h2 className="text-3xl sm:text-4xl font-title text-center mb-12 sm:mb-16 text-[#E53935]">
          ALL VENUES ({filteredVenues.length})
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-8">
          {filteredVenues.map((venue, index) => (
            <VenueCard key={venue.id} venue={venue} index={index} />
          ))}
        </div>
      </div>

      {/* Featured Venues Section - Always visible */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="text-3xl sm:text-4xl font-title text-center mb-8 sm:mb-12 text-[#E53935] animate-fade-in-up">
          FEATURED VENUES
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredVenues.map((venue, index) => (
            <VenueCard key={venue.id} venue={venue} index={index} />
          ))}
        </div>
        
        <div className="text-center mt-8 sm:mt-12 space-y-4">
          <button 
            onClick={() => {
              const mapElement = document.getElementById('venue-map');
              if (mapElement) {
                mapElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-[#E53935] text-white rounded-lg font-semibold text-base sm:text-lg hover:bg-[#C62D2D] focus:bg-[#C62D2D] transition-colors focus:outline-none focus:ring-2 focus:ring-[#E53935]/50 font-button mr-4"
          >
            Explore Map
          </button>
          <button 
            onClick={() => {
              const allVenuesElement = document.getElementById('all-venues');
              if (allVenuesElement) {
                allVenuesElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#E53935] border-2 border-[#E53935] rounded-lg font-semibold text-base sm:text-lg hover:bg-[#E53935] hover:text-white focus:bg-[#E53935] focus:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#E53935]/50 font-button"
          >
            View All Venues
          </button>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-[#E53935] text-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-title mb-4">
            READY TO EXPLORE?
          </h2>
          <p className="text-base sm:text-lg mb-6 sm:mb-8 font-body">
            Discover your perfect night out in San Francisco
          </p>
          <button 
            onClick={handleShowAllVenues}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#E53935] rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-100 focus:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 font-button"
          >
            Start Exploring
          </button>
        </div>
      </div>

      {/* Venue Modal */}
      {selectedVenue && (
        <VenueModal venue={selectedVenue} onClose={() => setSelectedVenue(null)} />
      )}

      {/* Filter Drawer */}
      <FilterDrawer 
        open={drawerOpen} 
        onClose={() => setDrawerOpen(false)}
        filters={advFilters}
        onFiltersChange={setAdvFilters}
      />
    </div>
  );
}


