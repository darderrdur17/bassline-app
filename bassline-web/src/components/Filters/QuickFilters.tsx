'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Clock, Volume2, Zap, Filter } from 'lucide-react';
import { useVenueStore } from '@/stores/useVenueStore';

interface QuickFiltersProps {
  onOpenAdvancedFilters: () => void;
  className?: string;
}

const QuickFilters: React.FC<QuickFiltersProps> = ({ onOpenAdvancedFilters, className = '' }) => {
  const {
    filters,
    setCrowdLevels,
    setWaitTimes,
    setNoiseLevels,
    setIsOpenNow,
    resetFilters,
  } = useVenueStore();

  const activeFilterCount =
    filters.crowdLevels.length +
    filters.waitTimes.length +
    filters.noiseLevels.length +
    (filters.isOpenNow ? 1 : 0) +
    filters.types.length +
    filters.neighborhoods.length +
    filters.pricing.length +
    filters.musicGenres.length +
    filters.features.length +
    (filters.atmospheres.length > 0 ? 1 : 0);

  const quickFilters = [
    {
      key: 'open-now',
      label: 'Open Now',
      icon: <Zap size={16} />,
      active: filters.isOpenNow === true,
      onClick: () => setIsOpenNow(filters.isOpenNow === true ? undefined : true),
    },
    {
      key: 'quiet',
      label: 'Quiet',
      icon: <Volume2 size={16} />,
      active: filters.noiseLevels.includes('quiet'),
      onClick: () => {
        const newLevels = filters.noiseLevels.includes('quiet')
          ? filters.noiseLevels.filter(l => l !== 'quiet')
          : [...filters.noiseLevels, 'quiet'];
        setNoiseLevels(newLevels);
      },
    },
    {
      key: 'quick-wait',
      label: 'Quick Entry',
      icon: <Clock size={16} />,
      active: filters.waitTimes.includes('short'),
      onClick: () => {
        const newWaitTimes = filters.waitTimes.includes('short')
          ? filters.waitTimes.filter(w => w !== 'short')
          : [...filters.waitTimes, 'short'];
        setWaitTimes(newWaitTimes);
      },
    },
    {
      key: 'not-crowded',
      label: 'Not Crowded',
      icon: <Users size={16} />,
      active: filters.crowdLevels.includes('empty') || filters.crowdLevels.includes('moderate'),
      onClick: () => {
        const hasQuiet = filters.crowdLevels.includes('empty') || filters.crowdLevels.includes('moderate');
        const newLevels = hasQuiet
          ? filters.crowdLevels.filter(l => !['empty', 'moderate'].includes(l))
          : [...filters.crowdLevels, 'empty', 'moderate'];
        setCrowdLevels(newLevels);
      },
    },
  ];

  const clearAllFilters = () => {
    resetFilters();
  };

  return (
    <div className={`bg-white border-b border-gray-200 py-4 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          {/* Quick Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-gray-700 mr-2">Quick Filters:</span>

            {quickFilters.map((filter) => (
              <motion.button
                key={filter.key}
                whileTap={{ scale: 0.95 }}
                onClick={filter.onClick}
                className={`inline-flex items-center gap-2 px-3 py-2 text-sm rounded-full border transition-all ${
                  filter.active
                    ? 'bg-brand-red text-white border-brand-red shadow-sm'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-brand-red hover:bg-gray-50'
                }`}
              >
                {filter.icon}
                <span>{filter.label}</span>
              </motion.button>
            ))}

            {/* Advanced Filters Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onOpenAdvancedFilters}
              className={`inline-flex items-center gap-2 px-3 py-2 text-sm rounded-full border transition-all ${
                activeFilterCount > 0
                  ? 'bg-gray-100 text-gray-900 border-gray-400'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-brand-red hover:bg-gray-50'
              }`}
            >
              <Filter size={16} />
              <span>Advanced</span>
              {activeFilterCount > 0 && (
                <span className="bg-brand-red text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                  {activeFilterCount}
                </span>
              )}
            </motion.button>
          </div>

          {/* Clear Filters */}
          <AnimatePresence>
            {activeFilterCount > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearAllFilters}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <X size={16} />
                <span>Clear All</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Active Filters Display */}
        <AnimatePresence>
          {activeFilterCount > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 pt-3 border-t border-gray-100"
            >
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Active Filters:</span>

                {/* Crowd Levels */}
                {filters.crowdLevels.map((level) => (
                  <span
                    key={`crowd-${level}`}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full"
                  >
                    <Users size={10} />
                    {level === 'empty' ? 'Very Quiet' : level === 'moderate' ? 'Moderate' : level === 'busy' ? 'Busy' : 'Very Busy'}
                  </span>
                ))}

                {/* Wait Times */}
                {filters.waitTimes.map((wait) => (
                  <span
                    key={`wait-${wait}`}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    <Clock size={10} />
                    {wait === 'short' ? 'Quick' : wait === 'medium' ? 'Moderate' : 'Long'} Wait
                  </span>
                ))}

                {/* Noise Levels */}
                {filters.noiseLevels.map((noise) => (
                  <span
                    key={`noise-${noise}`}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
                  >
                    <Volume2 size={10} />
                    {noise === 'quiet' ? 'Quiet' : noise === 'moderate' ? 'Moderate' : 'Lively'}
                  </span>
                ))}

                {/* Open Now */}
                {filters.isOpenNow && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    <Zap size={10} />
                    Open Now
                  </span>
                )}

                {/* Other filters count */}
                {activeFilterCount > 6 && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    +{activeFilterCount - 6} more
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuickFilters;
