'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, Users, Flame } from 'lucide-react';
import { useRealtimeStore, useRealtimeSelectors } from '@/stores/useRealtimeStore';
import { useVenueStore } from '@/stores/useVenueStore';
import VenueCard from '@/components/Venue/VenueCard';

interface TrendingVenuesProps {
  limit?: number;
  showHeader?: boolean;
  className?: string;
}

const TrendingVenues: React.FC<TrendingVenuesProps> = ({
  limit = 6,
  showHeader = true,
  className = '',
}) => {
  const { trendingVenues, isRealtimeEnabled } = useRealtimeStore();
  const { getVenueWithRealtimeData } = useRealtimeSelectors();
  const { venues } = useVenueStore();

  // Get full venue data for trending venues
  const trendingVenueData = trendingVenues
    .slice(0, limit)
    .map(realtimeData => {
      const venue = venues.find(v => v.id === realtimeData.venueId);
      return venue ? getVenueWithRealtimeData(venue) : null;
    })
    .filter(Boolean);

  const getCrowdLevelColor = (level: string) => {
    switch (level) {
      case 'empty': return 'text-green-600 bg-green-50 border-green-200';
      case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'busy': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'packed': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCrowdLevelIcon = (level: string) => {
    switch (level) {
      case 'empty': return '😌';
      case 'moderate': return '🙂';
      case 'busy': return '😅';
      case 'packed': return '🔥';
      default: return '🤔';
    }
  };

  if (!isRealtimeEnabled || trendingVenueData.length === 0) {
    return null;
  }

  return (
    <section className={`bg-gradient-to-r from-orange-50 to-red-50 py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {showHeader && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-orange-100 rounded-full">
                <Flame className="w-8 h-8 text-orange-600" />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-title text-gray-900">
                  TRENDING NOW
                </h2>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600 font-body">Live Updates</span>
                </div>
              </div>
            </div>

            <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
              The hottest spots in San Francisco right now - based on real-time crowd data
            </p>
          </motion.div>
        )}

        {/* Live Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {trendingVenueData.slice(0, 4).map((venue, index) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/50"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">{getCrowdLevelIcon(venue.currentCrowdLevel)}</div>
                <div>
                  <div className={`text-xs font-semibold px-2 py-1 rounded-full border ${getCrowdLevelColor(venue.currentCrowdLevel)}`}>
                    {venue.currentCrowdLevel?.toUpperCase()}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {venue.currentWaitTime} min wait
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trending Venues Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trendingVenueData.map((venue, index) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="relative"
            >
              {/* Trending Badge */}
              <div className="absolute -top-2 -right-2 z-10">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1"
                >
                  <TrendingUp size={12} />
                  #{index + 1}
                </motion.div>
              </div>

              <VenueCard
                venue={venue}
                index={index}
                variant="default"
                showActions={true}
              />

              {/* Real-time indicator */}
              <div className="mt-2 flex items-center justify-between text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Live data</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  <span>Updated {venue.lastUpdated ? new Date(venue.lastUpdated).toLocaleTimeString() : 'now'}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 font-body mb-4">
            Want to see all trending venues?
          </p>
          <button
            onClick={() => {
              // Scroll to map section
              const mapSection = document.getElementById('venue-map');
              if (mapSection) {
                mapSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="btn-primary"
          >
            Explore All Venues
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default TrendingVenues;
