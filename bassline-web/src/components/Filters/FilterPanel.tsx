'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronDown, Star, MapPin, Music, DollarSign, Clock, Users, Volume2, Sparkles, Zap, Check } from 'lucide-react';
import { useVenueStore } from '@/stores/useVenueStore';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ isOpen, onClose, className = '' }) => {
  const {
    filters,
    setTypes,
    setNeighborhoods,
    setPricing,
    setMusicGenres,
    setMinRating,
    setCrowdLevels,
    setWaitTimes,
    setNoiseLevels,
    setAtmospheres,
    setFeatures,
    setIsOpenNow,
    setMaxWaitTime,
    resetFilters,
  } = useVenueStore();

  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['types']));

  // Available filter options
  const venueTypes = ['Bar', 'Restaurant', 'Club', 'Lounge', 'Cafe', 'Brewery'];
  const neighborhoods = ['Mission', 'SOMA', 'Castro', 'Haystack Pizza', 'NoPa', 'Richmond', 'Sunset', 'Marina', 'Haight-Ashbury', 'Chinatown'];
  const pricingOptions = ['$', '$$', '$$$', '$$$$'];
  const musicGenres = ['Electronic', 'Hip Hop', 'Rock', 'Jazz', 'Latin', 'R&B', 'Pop', 'House', 'Techno', 'Indie'];
  const crowdLevels = ['empty', 'moderate', 'busy', 'packed'];
  const waitTimeOptions = ['short', 'medium', 'long'];
  const noiseLevels = ['quiet', 'moderate', 'loud'];
  const atmosphereOptions = ['Cozy', 'Energetic', 'Romantic', 'Casual', 'Upscale', 'Trendy'];
  const featureOptions = [
    { key: 'outdoor', label: 'Outdoor Seating', icon: '🌿' },
    { key: 'live-music', label: 'Live Music', icon: '🎵' },
    { key: 'dancing', label: 'Dance Floor', icon: '💃' },
    { key: 'happy-hour', label: 'Happy Hour', icon: '🍸' },
    { key: 'reservations', label: 'Reservations', icon: '📅' },
  ];
  const ratingOptions = [3, 4, 4.5];
  const maxWaitOptions = [5, 10, 15, 30];

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const handleTypeToggle = (type: string) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter(t => t !== type)
      : [...filters.types, type];
    setTypes(newTypes);
  };

  const handleNeighborhoodToggle = (neighborhood: string) => {
    const newNeighborhoods = filters.neighborhoods.includes(neighborhood)
      ? filters.neighborhoods.filter(n => n !== neighborhood)
      : [...filters.neighborhoods, neighborhood];
    setNeighborhoods(newNeighborhoods);
  };

  const handlePricingToggle = (pricing: string) => {
    const newPricing = filters.pricing.includes(pricing)
      ? filters.pricing.filter(p => p !== pricing)
      : [...filters.pricing, pricing];
    setPricing(newPricing);
  };

  const handleMusicGenreToggle = (genre: string) => {
    const newGenres = filters.musicGenres.includes(genre)
      ? filters.musicGenres.filter(g => g !== genre)
      : [...filters.musicGenres, genre];
    setMusicGenres(newGenres);
  };

  const handleCrowdLevelToggle = (level: string) => {
    const newLevels = filters.crowdLevels.includes(level)
      ? filters.crowdLevels.filter(l => l !== level)
      : [...filters.crowdLevels, level];
    setCrowdLevels(newLevels);
  };

  const FilterSection: React.FC<{
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    sectionKey: string;
  }> = ({ title, icon, children, sectionKey }) => {
    const isExpanded = expandedSections.has(sectionKey);

    return (
      <div className="border-b border-gray-200 last:border-b-0">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            {icon}
            <span className="font-medium text-gray-900">{title}</span>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={20} className="text-gray-400" />
          </motion.div>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 ${className}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Filter size={24} className="text-brand-red" />
                <h2 className="text-xl font-bold text-gray-900">Filters</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Filter Content */}
            <div className="flex-1 overflow-y-auto">
              <FilterSection
                title="Venue Type"
                icon={<MapPin size={18} className="text-blue-500" />}
                sectionKey="types"
              >
                <div className="grid grid-cols-2 gap-2">
                  {venueTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => handleTypeToggle(type)}
                      className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                        filters.types.includes(type)
                          ? 'bg-brand-red text-white border-brand-red'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-brand-red'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </FilterSection>

              <FilterSection
                title="Neighborhood"
                icon={<MapPin size={18} className="text-green-500" />}
                sectionKey="neighborhoods"
              >
                <div className="grid grid-cols-2 gap-2">
                  {neighborhoods.map((neighborhood) => (
                    <button
                      key={neighborhood}
                      onClick={() => handleNeighborhoodToggle(neighborhood)}
                      className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                        filters.neighborhoods.includes(neighborhood)
                          ? 'bg-brand-red text-white border-brand-red'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-brand-red'
                      }`}
                    >
                      {neighborhood}
                    </button>
                  ))}
                </div>
              </FilterSection>

              <FilterSection
                title="Price Range"
                icon={<DollarSign size={18} className="text-yellow-500" />}
                sectionKey="pricing"
              >
                <div className="grid grid-cols-2 gap-2">
                  {pricingOptions.map((price) => (
                    <button
                      key={price}
                      onClick={() => handlePricingToggle(price)}
                      className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                        filters.pricing.includes(price)
                          ? 'bg-brand-red text-white border-brand-red'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-brand-red'
                      }`}
                    >
                      {price}
                    </button>
                  ))}
                </div>
              </FilterSection>

              <FilterSection
                title="Music Genres"
                icon={<Music size={18} className="text-purple-500" />}
                sectionKey="music"
              >
                <div className="grid grid-cols-2 gap-2">
                  {musicGenres.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => handleMusicGenreToggle(genre)}
                      className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                        filters.musicGenres.includes(genre)
                          ? 'bg-brand-red text-white border-brand-red'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-brand-red'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </FilterSection>

              <FilterSection
                title="Minimum Rating"
                icon={<Star size={18} className="text-yellow-500" />}
                sectionKey="rating"
              >
                <div className="space-y-2">
                  {ratingOptions.map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(rating)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg border transition-all ${
                        filters.minRating === rating
                          ? 'bg-brand-red text-white border-brand-red'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-brand-red'
                      }`}
                    >
                      <span>{rating}+ Stars</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={`${
                              i < rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </FilterSection>

              <FilterSection
                title="Crowd Level"
                icon={<Users size={18} className="text-orange-500" />}
                sectionKey="crowd"
              >
                <div className="space-y-2">
                  {crowdLevels.map((level) => {
                    const levelInfo = {
                      empty: { label: 'Very Quiet', color: 'green' },
                      moderate: { label: 'Moderate', color: 'yellow' },
                      busy: { label: 'Busy', color: 'orange' },
                      packed: { label: 'Very Busy', color: 'red' },
                    }[level];

                    return (
                      <button
                        key={level}
                        onClick={() => handleCrowdLevelToggle(level)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg border transition-all ${
                          filters.crowdLevels.includes(level)
                            ? 'bg-brand-red text-white border-brand-red'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-brand-red'
                        }`}
                      >
                        <span>{levelInfo?.label}</span>
                        <div className={`w-3 h-3 rounded-full bg-${levelInfo?.color}-500`} />
                      </button>
                    );
                  })}
                </div>
              </FilterSection>

              <FilterSection
                title="Wait Time"
                icon={<Clock size={18} className="text-blue-500" />}
                sectionKey="wait-time"
              >
                <div className="space-y-2">
                  {waitTimeOptions.map((waitTime) => {
                    const waitInfo = {
                      short: { label: 'Quick (0-5 min)', color: 'green' },
                      medium: { label: 'Moderate (5-15 min)', color: 'yellow' },
                      long: { label: 'Long (15+ min)', color: 'red' },
                    }[waitTime];

                    return (
                      <button
                        key={waitTime}
                        onClick={() => {
                          const newWaitTimes = filters.waitTimes.includes(waitTime)
                            ? filters.waitTimes.filter(w => w !== waitTime)
                            : [...filters.waitTimes, waitTime];
                          setWaitTimes(newWaitTimes);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg border transition-all ${
                          filters.waitTimes.includes(waitTime)
                            ? 'bg-brand-red text-white border-brand-red'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-brand-red'
                        }`}
                      >
                        <span>{waitInfo?.label}</span>
                        <div className={`w-2 h-2 rounded-full bg-${waitInfo?.color}-500`} />
                      </button>
                    );
                  })}
                </div>
              </FilterSection>

              <FilterSection
                title="Noise Level"
                icon={<Volume2 size={18} className="text-purple-500" />}
                sectionKey="noise"
              >
                <div className="space-y-2">
                  {noiseLevels.map((level) => {
                    const noiseInfo = {
                      quiet: { label: 'Quiet Conversation', icon: '🤫' },
                      moderate: { label: 'Moderate', icon: '🗣️' },
                      loud: { label: 'Lively/Energetic', icon: '🔊' },
                    }[level];

                    return (
                      <button
                        key={level}
                        onClick={() => {
                          const newLevels = filters.noiseLevels.includes(level)
                            ? filters.noiseLevels.filter(l => l !== level)
                            : [...filters.noiseLevels, level];
                          setNoiseLevels(newLevels);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg border transition-all ${
                          filters.noiseLevels.includes(level)
                            ? 'bg-brand-red text-white border-brand-red'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-brand-red'
                        }`}
                      >
                        <span>{noiseInfo?.label}</span>
                        <span>{noiseInfo?.icon}</span>
                      </button>
                    );
                  })}
                </div>
              </FilterSection>

              <FilterSection
                title="Atmosphere"
                icon={<Sparkles size={18} className="text-pink-500" />}
                sectionKey="atmosphere"
              >
                <div className="grid grid-cols-2 gap-2">
                  {atmosphereOptions.map((atmosphere) => (
                    <button
                      key={atmosphere}
                      onClick={() => {
                        const newAtmospheres = filters.atmospheres.includes(atmosphere)
                          ? filters.atmospheres.filter(a => a !== atmosphere)
                          : [...filters.atmospheres, atmosphere];
                        setAtmospheres(newAtmospheres);
                      }}
                      className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                        filters.atmospheres.includes(atmosphere)
                          ? 'bg-brand-red text-white border-brand-red'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-brand-red'
                      }`}
                    >
                      {atmosphere}
                    </button>
                  ))}
                </div>
              </FilterSection>

              <FilterSection
                title="Features"
                icon={<Star size={18} className="text-indigo-500" />}
                sectionKey="features"
              >
                <div className="space-y-2">
                  {featureOptions.map((feature) => (
                    <button
                      key={feature.key}
                      onClick={() => {
                        const newFeatures = filters.features.includes(feature.key)
                          ? filters.features.filter(f => f !== feature.key)
                          : [...filters.features, feature.key];
                        setFeatures(newFeatures);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg border transition-all ${
                        filters.features.includes(feature.key)
                          ? 'bg-brand-red text-white border-brand-red'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-brand-red'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{feature.icon}</span>
                        <span>{feature.label}</span>
                      </div>
                      {filters.features.includes(feature.key) && (
                        <Check size={16} />
                      )}
                    </button>
                  ))}
                </div>
              </FilterSection>

              <FilterSection
                title="Quick Filters"
                icon={<Zap size={18} className="text-yellow-500" />}
                sectionKey="quick"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Open Now</span>
                    <button
                      onClick={() => setIsOpenNow(filters.isOpenNow === true ? undefined : true)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        filters.isOpenNow === true ? 'bg-brand-red' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          filters.isOpenNow === true ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Wait Time: {filters.maxWaitTime || 'No limit'} minutes
                    </label>
                    <div className="flex gap-2">
                      {maxWaitOptions.map((time) => (
                        <button
                          key={time}
                          onClick={() => setMaxWaitTime(filters.maxWaitTime === time ? undefined : time)}
                          className={`px-3 py-1 text-sm rounded border transition-all ${
                            filters.maxWaitTime === time
                              ? 'bg-brand-red text-white border-brand-red'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-brand-red'
                          }`}
                        >
                          {time}m
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </FilterSection>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-6 space-y-3">
              <button
                onClick={resetFilters}
                className="w-full px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
              >
                Clear All Filters
              </button>
              <button
                onClick={onClose}
                className="w-full px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-brand-red-dark transition-colors font-medium"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FilterPanel;
