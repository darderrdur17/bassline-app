'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamic imports for better performance
const MapboxMap = dynamic(() => import('@/components/Map/MapboxMap'), {
  ssr: false,
  loading: () => (
    <div className="h-96 sm:h-[600px] bg-ui-background rounded-xl animate-pulse flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-red border-t-transparent mx-auto mb-4"></div>
        <p className="text-ui-text-secondary font-body">Loading interactive map...</p>
      </div>
    </div>
  )
});

const VenueModal = dynamic(() => import('@/components/VenueModal'), { ssr: false });

// Import data and hooks
import { venues, moodMapping } from '@/data/venues';
import { useVenueStore, useVenueSelectors } from '@/stores/useVenueStore';

export default function Home() {
  // State management with Zustand
  const {
    selectedVenue,
    setSelectedVenue,
    setVenues,
    setSearchText,
    filters,
  } = useVenueStore();

  const { getFilteredVenues } = useVenueSelectors();

  // Local UI state
  const [currentView, setCurrentView] = useState<'map' | 'list'>('map');

  // Initialize venues on mount
  useEffect(() => {
    setVenues(venues);
  }, [setVenues]);

  // Get filtered venues from store
  const filteredVenues = getFilteredVenues();
  const featuredVenues = venues.slice(0, 6);
  const moodOptions = ['chill', 'party', 'date', 'classy', 'music', 'drinks'];

  // Handle search
  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  // Handle mood selection
  const handleMoodSelection = (mood: string) => {
    const moodVenues = moodMapping[mood];
    if (moodVenues) {
      // Filter to mood venues - simplified for now
      const filtered = venues.filter(venue => moodVenues.includes(venue.name));
      // In a full implementation, you'd update the store filters
    }
    setCurrentView('map');
  };

  // Venue Card Component
  const VenueCard = ({ venue, index = 0 }: { venue: any; index?: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="venue-card"
      onClick={() => setSelectedVenue(venue)}
    >
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src={venue.heroImage}
          alt={`${venue.name} interior`}
          className="venue-card-image"
        />
        <div className="venue-card-overlay" />
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1.5 bg-black/80 backdrop-blur-sm text-white text-xs rounded-full font-medium font-body border border-white/20">
            {venue.type}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
          <div className="flex items-center gap-2 text-white text-sm">
            <span className="flex items-center gap-1">
              <span className="text-yellow-400">⭐</span>
              <span className="font-semibold">{venue.rating}</span>
            </span>
            <span className="text-white/80">•</span>
            <span className="font-medium">{venue.pricing}</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-brand-red group-hover:text-brand-red-dark transition-colors duration-300 font-brand">
          {venue.name}
        </h3>
        <p className="text-ui-text-secondary mb-5 text-sm font-body leading-relaxed line-clamp-2">
          {venue.shortDescription || venue.description}
        </p>

        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="flex items-center gap-1.5 text-ui-text-secondary font-body">
              <span className="text-lg">📍</span>
              <span className="font-medium">{venue.neighborhood}</span>
            </span>
            <span className="text-xs text-ui-text-muted font-body bg-ui-background px-2 py-1 rounded-full">
              {venue.hours || 'Hours vary'}
            </span>
          </div>

          {(venue.musicGenre || []).length > 0 && (
            <div className="flex gap-2 flex-wrap pt-2 border-t border-ui-border">
              {venue.musicGenre.slice(0, 2).map((genre: string) => (
                <span key={genre} className="px-3 py-1.5 bg-gradient-to-r from-brand-red/10 to-brand-red/5 text-brand-red rounded-full text-xs font-semibold font-body border border-brand-red/20">
                  {genre}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-ui-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-red via-red-600 to-red-800">
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
            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-5xl sm:text-7xl md:text-9xl font-brand mb-6 text-white drop-shadow-lg tracking-wider">
                BASSLINE
              </h1>
              <div className="w-24 h-1 bg-white/80 mx-auto mb-6 rounded-full"></div>
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-xl sm:text-2xl md:text-3xl mb-4 opacity-95 font-tagline tracking-wide text-white drop-shadow-md">
                THE CITY NEVER SLEEPS,
              </p>
              <p className="text-xl sm:text-2xl md:text-3xl mb-8 opacity-95 font-tagline tracking-wide text-white drop-shadow-md">
                NEITHER SHOULD YOU.
              </p>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="max-w-3xl mx-auto mb-12"
            >
              <p className="text-lg sm:text-xl mb-8 opacity-90 font-body text-white/95 leading-relaxed">
                Discover San Francisco's best nightlife venues with mood-based discovery and real-time exploration
              </p>
            </motion.div>

            {/* Interactive Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl mb-8 font-label text-white drop-shadow-md">
                WHAT ARE YOU FEELING TONIGHT?
              </h2>

              {/* Enhanced Search Bar */}
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search venues, moods, music..."
                    className="input-primary text-lg"
                    value={filters.searchText}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-ui-text-secondary">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                <button className="btn-primary text-lg px-8 py-4">
                  SEARCH
                </button>
              </div>

              {/* Mood Buttons Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 max-w-3xl mx-auto mb-8">
                {moodOptions.map((mood, index) => (
                  <button
                    key={mood}
                    onClick={() => handleMoodSelection(mood)}
                    className="px-4 py-3 sm:px-6 sm:py-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/30 hover:bg-white/20 focus:bg-white/20 transition-all duration-300 capitalize font-bold text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white/50 hover:scale-105 font-button text-white drop-shadow-md"
                    style={{ animationDelay: `${1 + index * 0.1}s` }}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#F5F5DC" d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Map Section */}
      <section id="venue-map" className="bg-gradient-to-b from-white to-gray-50 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 p-6 sm:px-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-title text-brand-red mb-2">
                VENUE MAP
              </h2>
              <p className="text-ui-text-secondary font-body">Explore San Francisco's nightlife scene</p>
            </div>
          </div>

          <div className="h-96 sm:h-[650px] rounded-2xl overflow-hidden shadow-2xl mx-6 sm:mx-8 mb-8 relative">
            <MapboxMap
              showHeatmap={false}
              showClusters={true}
              enable3DBuildings={true}
            />
          </div>

          {/* Results Summary */}
          <div className="text-center mb-8">
            {filteredVenues.length > 0 && (
              <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-ui-border">
                <span className="text-2xl">📍</span>
                <span className="text-ui-text font-semibold font-body">
                  Showing {filteredVenues.length} venue{filteredVenues.length !== 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Venues Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 bg-gradient-to-b from-ui-background to-white relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-title text-brand-red mb-4 animate-fade-in-up">
            FEATURED VENUES
          </h2>
          <div className="w-24 h-1 bg-brand-red mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-ui-text-secondary font-body max-w-2xl mx-auto">
            Handpicked gems that define San Francisco's nightlife scene
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredVenues.map((venue, index) => (
            <VenueCard key={venue.id} venue={venue} index={index} />
          ))}
        </div>
      </section>

      {/* Venue Modal */}
      {selectedVenue && (
        <VenueModal venue={selectedVenue} onClose={() => setSelectedVenue(null)} />
      )}
    </div>
  );
}
