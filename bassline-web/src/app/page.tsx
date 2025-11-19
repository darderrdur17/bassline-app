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
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer group transform hover:-translate-y-1 border border-gray-100 venue-card animate-fade-in-scale"
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
          className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1.5 bg-black/80 backdrop-blur-sm text-white text-xs rounded-full font-medium font-body border border-white/20">
            {venue.type}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
          <div className="flex items-center gap-2 text-white text-sm">
            <span className="flex items-center gap-1">
              <span aria-label="Rating" className="text-yellow-400">⭐</span>
              <span className="font-semibold">{venue.rating}</span>
            </span>
            <span className="text-white/80">•</span>
            <span className="font-medium">{venue.pricing}</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-[#E53935] group-hover:text-[#C62D2D] transition-colors duration-300 font-brand">
          {venue.name}
        </h3>
        <p className="text-gray-600 mb-5 text-sm font-body leading-relaxed line-clamp-2">
          {(() => {
            const text = venue.shortDescription || '';
            // Ensure sentence case: capitalize first letter if not already
            if (!text) return '';
            return text.charAt(0).toUpperCase() + text.slice(1);
          })()}
        </p>

        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="flex items-center gap-1.5 text-gray-600 font-body">
              <span className="text-lg">📍</span>
              <span className="font-medium">{venue.neighborhood}</span>
            </span>
            <span className="text-xs text-gray-500 font-body bg-gray-50 px-2 py-1 rounded-full">
              {formatVenueHours(venue.hours)}
            </span>
          </div>

          {(venue.musicGenre || []).length > 0 && (
            <div className="flex gap-2 flex-wrap pt-2 border-t border-gray-100">
              {venue.musicGenre.slice(0, 2).map((genre: string) => (
                <span key={genre} className="px-3 py-1.5 bg-gradient-to-r from-[#E53935]/10 to-[#E53935]/5 text-[#E53935] rounded-full text-xs font-semibold font-body border border-[#E53935]/20 hover:from-[#E53935]/20 hover:to-[#E53935]/10 transition-all duration-200">
                  {genre}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-5 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-800 font-body">
              {venue.averageDrinkPrice || 'Check pricing'}
            </span>
            <button className="text-[#E53935] hover:text-[#C62D2D] transition-colors duration-200 group-hover:scale-105 transform transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F5F5DC]">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#E53935] via-[#D32F2F] to-[#C62828]">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-yellow-400/10 rounded-full blur-lg animate-bounce" style={{ animationDuration: '3s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-pink-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/3 left-1/3 w-16 h-16 bg-white/10 rounded-full blur-md animate-ping" style={{ animationDuration: '4s' }}></div>
        </div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center">
            {/* Logo Section */}
            <div className="flex justify-center mb-8 animate-fade-in-up">
              <div className="relative">
                <img
                  src="/images/milkshake-logo.png"
                  alt="Bassline Logo"
                  className="h-40 sm:h-48 md:h-56 w-auto object-contain drop-shadow-2xl"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-white/20 blur-3xl -z-10 scale-150 opacity-30"></div>
              </div>
            </div>

            {/* Main Title */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h1 className="text-5xl sm:text-7xl md:text-9xl font-brand mb-6 text-white drop-shadow-lg tracking-wider">
                BASSLINE
              </h1>
              <div className="w-24 h-1 bg-white/80 mx-auto mb-6 rounded-full"></div>
            </div>

            {/* Tagline */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <p className="text-xl sm:text-2xl md:text-3xl mb-4 opacity-95 font-tagline tracking-wide text-white drop-shadow-md">
                THE CITY NEVER SLEEPS,
              </p>
              <p className="text-xl sm:text-2xl md:text-3xl mb-8 opacity-95 font-tagline tracking-wide text-white drop-shadow-md">
                NEITHER SHOULD YOU.
              </p>
            </div>

            {/* Subtitle */}
            <div className="animate-fade-in-up max-w-3xl mx-auto mb-12" style={{ animationDelay: '0.6s' }}>
              <p className="text-lg sm:text-xl mb-8 opacity-90 font-body text-white/95 leading-relaxed">
                Discover San Francisco's best nightlife venues with mood-based discovery and real-time exploration
              </p>
            </div>

            {/* Interactive Section */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <h2 className="text-xl sm:text-2xl md:text-3xl mb-8 font-label text-white drop-shadow-md">
                WHAT ARE YOU FEELING TONIGHT?
              </h2>

              {/* Enhanced Search Bar */}
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search venues, moods, music..."
                    className="w-full px-6 py-4 rounded-xl border-0 bg-white/95 backdrop-blur-sm text-gray-800 placeholder-gray-500 text-lg focus:outline-none focus:ring-4 focus:ring-white/50 shadow-2xl font-body transition-all duration-300"
                    aria-label="Search venues"
                    value={searchText}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                <button
                  className="px-8 py-4 bg-white text-[#E53935] rounded-xl font-bold text-lg hover:bg-gray-50 focus:bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50 shadow-2xl hover:shadow-white/25 hover:scale-105 font-button"
                  aria-label="Search"
                >
                  SEARCH
                </button>
              </div>

              {/* Mood Buttons Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 max-w-3xl mx-auto mb-8">
                {moodOptions.map((mood, index) => (
                  <button
                    key={mood}
                    onClick={() => handleMoodSelection(mood)}
                    className="px-4 py-3 sm:px-6 sm:py-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/30 hover:bg-white/20 focus:bg-white/20 transition-all duration-300 capitalize font-bold text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white/50 hover:scale-105 hover:shadow-lg font-button text-white drop-shadow-md"
                    aria-label={`Find ${mood} venues`}
                    style={{ animationDelay: `${1 + index * 0.1}s` }}
                  >
                    {mood}
                  </button>
                ))}
              </div>

              {/* Type Filter Buttons */}
              <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
                {['Bar', 'Restaurant', 'Club'].map((type, index) => (
                  <button
                    key={type}
                    onClick={() => toggleType(type)}
                    className={`px-6 py-3 sm:px-8 sm:py-4 rounded-full border-2 font-bold text-base sm:text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 hover:scale-105 focus:scale-105 shadow-xl font-button ${
                      activeTypes.includes(type)
                        ? 'bg-white text-[#E53935] border-white shadow-white/25'
                        : 'bg-transparent text-white border-white/60 hover:bg-white/10 hover:border-white hover:shadow-white/20'
                    }`}
                    aria-label={`Filter by ${type}`}
                    aria-pressed={activeTypes.includes(type)}
                    style={{ animationDelay: `${1.5 + index * 0.1}s` }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#F5F5DC" d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </div>

      {/* Map Section - Always visible */}
      <div id="venue-map" className="bg-gradient-to-b from-white to-gray-50 shadow-xl animate-fade-in-up relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-[#E53935]/10 via-transparent to-purple-500/10"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 p-6 sm:px-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-title text-[#E53935] mb-2">
                VENUE MAP
              </h2>
              <p className="text-gray-600 font-body">Explore San Francisco's nightlife scene</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setDrawerOpen(true)}
                className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl hover:from-gray-200 hover:to-gray-300 focus:from-gray-200 focus:to-gray-300 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300/50 shadow-lg hover:shadow-xl font-button font-semibold"
                aria-label="Open filters"
              >
                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
              </button>
            </div>
          </div>

          <div className="h-96 sm:h-[650px] rounded-2xl overflow-hidden shadow-2xl mx-6 sm:mx-8 mb-8 relative">
            <DynamicMap
              venues={filteredVenues as any}
              allVenues={venues as any}
              selectedVenue={selectedVenue}
              onVenueSelect={(v) => setSelectedVenue(v)}
            />

            {/* Map Overlay Info */}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#E53935] rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">Bars</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#4CAF50] rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">Restaurants</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#9C27B0] rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">Clubs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="text-center mb-8">
            {filteredVenues.length > 0 && (
              <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-gray-200">
                <span className="text-[#E53935] text-2xl">📍</span>
                <span className="text-gray-700 font-semibold font-body">
                  Showing {filteredVenues.length} venue{filteredVenues.length !== 1 ? 's' : ''}
                </span>
              </div>
            )}
            {filteredVenues.length === 0 && (searchText.trim() || activeTypes.length > 0) && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mx-6 sm:mx-8">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="text-yellow-600 text-2xl">🔍</span>
                  <span className="text-yellow-800 font-semibold font-body">No venues found</span>
                </div>
                <p className="text-yellow-700 font-body text-center">
                  Try adjusting your search terms or filters to discover more venues.
                </p>
              </div>
            )}
          </div>

          {/* Mascot */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <img
                src="/images/avocado-logo.png"
                alt="Bassline Mascot"
                className="h-32 w-auto object-contain hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute -inset-4 bg-gradient-to-r from-[#E53935]/20 to-purple-500/20 rounded-full blur-xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* All Venues Section - Always visible */}
      <div id="all-venues" className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-64 h-64 bg-[#E53935]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-title text-[#E53935] mb-4">
              ALL VENUES
            </h2>
            <div className="w-24 h-1 bg-[#E53935] mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-gray-600 font-body max-w-2xl mx-auto">
              Discover {filteredVenues.length} incredible spots across San Francisco
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
            {filteredVenues.map((venue, index) => (
              <VenueCard key={venue.id} venue={venue} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Featured Venues Section - Always visible */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 bg-gradient-to-b from-[#F5F5DC] to-white relative">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-32 h-32 bg-[#E53935]/30 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-title text-[#E53935] mb-4 animate-fade-in-up">
              FEATURED VENUES
            </h2>
            <div className="w-24 h-1 bg-[#E53935] mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-gray-600 font-body max-w-2xl mx-auto">
              Handpicked gems that define San Francisco's nightlife scene
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredVenues.map((venue, index) => (
              <VenueCard key={venue.id} venue={venue} index={index} />
            ))}
          </div>

          <div className="text-center space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  const mapElement = document.getElementById('venue-map');
                  if (mapElement) {
                    mapElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-8 sm:px-10 py-4 bg-gradient-to-r from-[#E53935] to-[#D32F2F] text-white rounded-xl font-bold text-lg hover:from-[#D32F2F] hover:to-[#C62828] focus:from-[#D32F2F] focus:to-[#C62828] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#E53935]/50 shadow-2xl hover:shadow-[#E53935]/25 hover:scale-105 font-button"
              >
                <svg className="w-6 h-6 inline mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Explore Map
              </button>
              <button
                onClick={() => {
                  const allVenuesElement = document.getElementById('all-venues');
                  if (allVenuesElement) {
                    allVenuesElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-8 sm:px-10 py-4 bg-white text-[#E53935] border-2 border-[#E53935] rounded-xl font-bold text-lg hover:bg-[#E53935] hover:text-white focus:bg-[#E53935] focus:text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#E53935]/50 shadow-xl hover:shadow-[#E53935]/25 hover:scale-105 font-button"
              >
                <svg className="w-6 h-6 inline mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                View All Venues
              </button>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <p className="text-gray-500 font-body text-lg">
                Ready to discover your perfect night out?
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-br from-[#E53935] via-[#D32F2F] to-[#C62828] text-white py-16 sm:py-20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-yellow-400/30 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '4s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-ping" style={{ animationDuration: '6s' }}></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <span className="text-4xl">🌟</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-title mb-6">
              READY TO EXPLORE?
            </h2>
            <div className="w-24 h-1 bg-white/80 mx-auto mb-8 rounded-full"></div>
          </div>

          <p className="text-xl sm:text-2xl mb-8 sm:mb-12 font-body max-w-3xl mx-auto leading-relaxed">
            Discover your perfect night out in San Francisco with our curated selection of the city's best nightlife venues
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={handleShowAllVenues}
              className="px-10 py-5 bg-white text-[#E53935] rounded-xl font-bold text-xl hover:bg-gray-100 focus:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50 shadow-2xl hover:shadow-white/25 hover:scale-105 font-button"
            >
              <span className="flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Start Exploring
              </span>
            </button>

            <div className="text-white/80 font-body text-lg">
              <p>Join thousands of night owls discovering SF's nightlife</p>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <div className="flex justify-center items-center gap-8 text-white/60">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">66+</div>
                <div className="text-sm font-body">Venues</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">10K+</div>
                <div className="text-sm font-body">Visitors</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-sm font-body">Updates</div>
              </div>
            </div>
          </div>
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


