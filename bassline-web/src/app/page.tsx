'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, List, Map } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamic imports for better performance with preloading
const MapboxMap = dynamic(() => import('@/components/Map/MapboxMap'), {
  ssr: false,
  loading: () => (
    <div className="h-96 sm:h-[650px] rounded-2xl bg-gray-100 animate-pulse flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-brand-red border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <p className="text-gray-600 font-body text-sm">Loading map...</p>
      </div>
    </div>
  )
});

const VenueModal = dynamic(() => import('@/components/VenueModal'), { ssr: false });
const SearchBar = dynamic(() => import('@/components/Search/SearchBar'), { ssr: false });
const FilterPanel = dynamic(() => import('@/components/Filters/FilterPanel'), { ssr: false });
const VenueCard = dynamic(() => import('@/components/Venue/VenueCard'), { ssr: false });
const MobileNav = dynamic(() => import('@/components/Navigation/MobileNav'), { ssr: false });
const TrendingVenues = dynamic(() => import('@/components/Trending/TrendingVenues'), { ssr: false });
const LiveStatusIndicator = dynamic(() => import('@/components/Realtime/LiveStatusIndicator'), { ssr: false });
const QuickFilters = dynamic(() => import('@/components/Filters/QuickFilters'), { ssr: false });
const FilterSummary = dynamic(() => import('@/components/Filters/FilterSummary'), { ssr: false });

// Import data and hooks
import { venuesLight, venues, moodMapping } from '@/data/venues';
import { useVenueStore, useVenueSelectors } from '@/stores/useVenueStore';
import { useRealtimeStore, initializeRealtime } from '@/stores/useRealtimeStore';

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
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const venuesPerPage = 12;

  // Initialize venues and real-time data on mount
  useEffect(() => {
    // Load lightweight venue data immediately for fast map rendering
    setVenues(venuesLight as any); // Type cast for now

    // Load full venue data in the background after initial render
    const loadFullData = async () => {
      // Small delay to ensure initial render completes
      await new Promise(resolve => setTimeout(resolve, 100));
      setVenues(venues);
    };

    loadFullData();
    initializeRealtime();
  }, [setVenues]);

  // Get real-time data
  const { realtimeData: allRealtimeData } = useRealtimeStore();

  // Get filtered venues from store with real-time data
  const filteredVenues = getFilteredVenues(allRealtimeData);
  const featuredVenues = venues.slice(0, 6);
  const moodOptions = ['chill', 'party', 'date', 'classy', 'music', 'drinks'];

  // Pagination logic for list view
  const totalPages = Math.ceil(filteredVenues.length / venuesPerPage);
  const startIndex = (currentPage - 1) * venuesPerPage;
  const endIndex = startIndex + venuesPerPage;
  const paginatedVenues = filteredVenues.slice(startIndex, endIndex);

  // Handle search
  const handleSearch = (text: string) => {
    setSearchText(text);
    setCurrentPage(1); // Reset to first page when searching
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

  // Toggle view between map and list
  const toggleView = () => {
    setCurrentView(currentView === 'map' ? 'list' : 'map');
  };

  // Handle mobile search toggle
  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
  };

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
              <div className="max-w-lg mx-auto mb-8">
                <SearchBar
                  onSearch={handleSearch}
                  placeholder="Search venues, neighborhoods, music..."
                />
              </div>

              {/* Mood Buttons Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 max-w-3xl mx-auto mb-8">
                {moodOptions.map((mood, index) => (
                  <motion.button
                    key={mood}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleMoodSelection(mood)}
                    className="px-4 py-3 sm:px-6 sm:py-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/30 hover:bg-white/20 focus:bg-white/20 transition-all duration-300 capitalize font-bold text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white/50 font-button text-white drop-shadow-md"
                  >
                    {mood}
                  </motion.button>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="flex justify-center gap-4">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowFilters(true)}
                  className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/30 hover:bg-white/20 transition-all duration-300 font-button text-white drop-shadow-md flex items-center gap-2"
                >
                  <Filter size={18} />
                  Advanced Filters
                </motion.button>
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

      {/* Quick Filters */}
      <QuickFilters onOpenAdvancedFilters={() => setShowFilters(true)} />

      {/* Map/List Section */}
      <section id="venue-map" className="bg-gradient-to-b from-white to-gray-50 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 p-6 sm:px-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-title text-brand-red mb-2">
                {currentView === 'map' ? 'VENUE MAP' : 'VENUE LIST'}
              </h2>
              <p className="text-ui-text-secondary font-body">
                {currentView === 'map'
                  ? 'Explore San Francisco\'s nightlife scene'
                  : `Discover ${filteredVenues.length} amazing venues`
                }
              </p>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleView}
                className="px-4 py-2 bg-brand-red text-white hover:bg-brand-red-dark rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
              >
                {currentView === 'map' ? (
                  <>
                    <List size={16} />
                    List View
                  </>
                ) : (
                  <>
                    <Map size={16} />
                    Map View
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Map View */}
          {currentView === 'map' && (
            <div className="h-96 sm:h-[650px] rounded-2xl overflow-hidden shadow-2xl mx-6 sm:mx-8 mb-8 relative">
              <MapboxMap
                enable3DBuildings={true}
              />
            </div>
          )}

          {/* List View */}
          {currentView === 'list' && (
            <div className="max-w-6xl mx-auto px-6 sm:px-8 mb-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {paginatedVenues.map((venue, index) => (
                  <VenueCard
                    key={venue.id}
                    venue={venue}
                    index={index}
                    variant="default"
                  />
                ))}
              </div>

              {filteredVenues.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No venues found</h3>
                  <p className="text-gray-600">Try adjusting your search or filters</p>
                </div>
              )}

              {/* Pagination Controls */}
              {filteredVenues.length > venuesPerPage && (
                <div className="flex justify-center items-center gap-4 mt-12 mb-8">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed rounded-lg transition-colors"
                  >
                    Previous
                  </button>

                  <div className="flex gap-2">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNumber = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                      if (pageNumber > totalPages) return null;

                      return (
                        <button
                          key={pageNumber}
                          onClick={() => setCurrentPage(pageNumber)}
                          className={`px-3 py-2 rounded-lg transition-colors ${
                            currentPage === pageNumber
                              ? 'bg-brand-red text-white'
                              : 'bg-gray-200 hover:bg-gray-300'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed rounded-lg transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Filter Summary */}
          {filteredVenues.length !== venues.length && (
            <div className="max-w-4xl mx-auto px-6 sm:px-8 mb-6">
              <FilterSummary
                totalVenues={venues.length}
                filteredVenues={filteredVenues.length}
              />
            </div>
          )}

          {/* Results Summary */}
          <div className="text-center mb-8">
            {filteredVenues.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-ui-border"
              >
                <span className="text-2xl">📍</span>
                <span className="text-ui-text font-semibold font-body">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredVenues.length)} of {filteredVenues.length} venue{filteredVenues.length !== 1 ? 's' : ''}
                </span>
              </motion.div>
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
            <VenueCard
              key={venue.id}
              venue={venue}
              index={index}
              variant="featured"
            />
          ))}
        </div>
      </section>

      {/* Trending Venues Section */}
      <TrendingVenues />

      {/* Live Status Indicator */}
      <div className="fixed top-4 right-4 z-30">
        <LiveStatusIndicator />
      </div>

      {/* Venue Modal */}
      {selectedVenue && (
        <VenueModal venue={selectedVenue} onClose={() => setSelectedVenue(null)} />
      )}

      {/* Filter Panel */}
      <FilterPanel
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
      />

      {/* Mobile Navigation */}
      <MobileNav
        onSearchToggle={toggleMobileSearch}
        onFilterToggle={() => setShowFilters(true)}
        onViewToggle={toggleView}
        currentView={currentView}
        searchOpen={showMobileSearch}
        filtersOpen={showFilters}
        className="md:hidden"
      />
    </div>
  );
}
