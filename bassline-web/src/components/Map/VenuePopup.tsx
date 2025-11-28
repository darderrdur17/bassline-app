'use client';

import React from 'react';
import { Popup } from 'react-map-gl';
import { Venue } from '@/types/venue';
import { motion } from 'framer-motion';
import { X, Star, Clock, MapPin, Phone, Globe, Instagram, Heart, Users, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { useVenueStore, useVenueSelectors } from '@/stores/useVenueStore';
import { useRealtimeStore } from '@/stores/useRealtimeStore';

interface VenuePopupProps {
  venue: Venue;
  onClose: () => void;
  anchor?: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  onSelectNext?: () => void;
  onSelectPrev?: () => void;
  onOpenInMapbox?: (venue: Venue) => void;
}

const VenuePopup: React.FC<VenuePopupProps> = ({
  venue,
  onClose,
  anchor = 'bottom',
  onSelectNext,
  onSelectPrev,
  onOpenInMapbox,
}) => {
  const { toggleFavorite } = useVenueStore();
  const { isFavorite } = useVenueSelectors();
  const { realtimeData: allRealtimeData } = useRealtimeStore();

  const isVenueFavorite = isFavorite(venue.id.toString());
  const realtimeData = allRealtimeData.get(venue.id);

  // Get crowd level info (prioritize real-time data)
  const getCrowdInfo = () => {
    const crowdLevel = realtimeData?.crowdLevel || venue.currentCrowdLevel;
    if (!crowdLevel) return null;

    const crowdLabels = {
      empty: { label: 'Very Quiet', color: 'text-green-600', bg: 'bg-green-50' },
      moderate: { label: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-50' },
      busy: { label: 'Busy', color: 'text-orange-600', bg: 'bg-orange-50' },
      packed: { label: 'Very Busy', color: 'text-red-600', bg: 'bg-red-50' },
    };

    return crowdLabels[crowdLevel];
  };

  const crowdInfo = getCrowdInfo();

  return (
    <Popup
      latitude={venue.coordinates.latitude}
      longitude={venue.coordinates.longitude}
      anchor={anchor}
      onClose={onClose}
      closeButton={false}
      offset={[0, -10]}
      className="venue-popup"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-ui-surface rounded-xl shadow-2xl border border-ui-border overflow-hidden max-w-sm"
        style={{ minWidth: '320px' }}
      >
        {/* Header Image */}
        <div className="relative h-32 overflow-hidden">
          <img
            src={venue.heroImage}
            alt={venue.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors z-10"
          >
            <X size={16} />
          </button>

          {/* Navigation Buttons */}
          {(onSelectPrev || onSelectNext) && (
            <div className="absolute top-1/2 left-3 right-3 flex justify-between z-10 pointer-events-none">
              {onSelectPrev && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPrev();
                  }}
                  className="bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-colors pointer-events-auto shadow-lg"
                  aria-label="Previous venue"
                >
                  <ChevronLeft size={20} />
                </button>
              )}
              {onSelectNext && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectNext();
                  }}
                  className="bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-colors pointer-events-auto shadow-lg ml-auto"
                  aria-label="Next venue"
                >
                  <ChevronRight size={20} />
                </button>
              )}
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={() => toggleFavorite(venue.id.toString())}
            className="absolute top-3 left-3 bg-white/90 hover:bg-white text-gray-700 rounded-full p-1.5 transition-colors"
          >
            <Heart
              size={16}
              className={isVenueFavorite ? 'fill-red-500 text-red-500' : ''}
            />
          </button>

          {/* Venue Type Badge */}
          <div className="absolute bottom-3 left-3">
            <span className="px-2 py-1 bg-black/70 text-white text-xs rounded-full font-medium backdrop-blur-sm">
              {venue.type}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-3">
            <button
              onClick={onSelectPrev}
              disabled={!onSelectPrev}
              className="text-xs font-semibold px-3 py-1 rounded-full border border-ui-border hover:bg-ui-surface-hover disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ← Prev
            </button>
            <button
              onClick={onSelectNext}
              disabled={!onSelectNext}
              className="text-xs font-semibold px-3 py-1 rounded-full border border-ui-border hover:bg-ui-surface-hover disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>

          {/* Title and Rating */}
          <div className="mb-3">
            <h3 className="text-lg font-bold font-title text-ui-text mb-1">
              {venue.name}
            </h3>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1">
                <Star size={14} className="text-yellow-500 fill-current" />
                <span className="font-medium">{venue.rating}</span>
              </div>
              <span className="text-ui-text-secondary">•</span>
              <span className="font-medium">{venue.pricing}</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-2 mb-3">
            <MapPin size={16} className="text-ui-text-secondary flex-shrink-0" />
            <span className="text-sm text-ui-text-secondary">{venue.neighborhood}</span>
          </div>

          {/* Real-time Status */}
          {crowdInfo && (
            <div className={`mb-3 px-3 py-2 rounded-lg ${crowdInfo.bg} border backdrop-blur-sm`}>
              <div className="flex items-center gap-2">
                <motion.div
                  animate={realtimeData?.trend === 'increasing' ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                  className={`w-2 h-2 rounded-full ${crowdInfo.color.replace('text-', 'bg-')}`}
                />
                <span className={`text-sm font-medium ${crowdInfo.color}`}>
                  {crowdInfo.label}
                </span>
                {realtimeData?.waitTime !== undefined && (
                  <span className="text-xs text-gray-600 ml-auto">
                    {realtimeData.waitTime} min wait
                  </span>
                )}
                {realtimeData?.trend && realtimeData.trend !== 'stable' && (
                  <motion.div
                    animate={realtimeData.trend === 'increasing' ? { y: [0, -1, 0] } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="ml-1"
                  >
                    <TrendingUp size={12} className={realtimeData.trend === 'increasing' ? 'text-green-600' : 'text-red-600'} />
                  </motion.div>
                )}
              </div>
              {realtimeData && (
                <div className="mt-2 flex items-center justify-between text-xs text-gray-600">
                  <span>{realtimeData.currentOccupancy}/{realtimeData.capacity} people</span>
                  <span>Live • {realtimeData.lastUpdated ? new Date(realtimeData.lastUpdated).toLocaleTimeString() : 'now'}</span>
                </div>
              )}
            </div>
          )}

          {/* Hours */}
          {venue.hours && (
            <div className="flex items-start gap-2 mb-3">
              <Clock size={16} className="text-ui-text-secondary mt-0.5 flex-shrink-0" />
              <div className="text-sm text-ui-text-secondary">
                {typeof venue.hours === 'string' ? venue.hours.split(';')[0] : 'Hours vary'}
              </div>
            </div>
          )}

          {/* Description */}
          {venue.shortDescription && (
            <p className="text-sm text-ui-text-secondary mb-3 leading-relaxed">
              {venue.shortDescription}
            </p>
          )}

          {/* Music Genres */}
          {venue.musicGenre && venue.musicGenre.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {venue.musicGenre.slice(0, 3).map((genre) => (
                  <span
                    key={genre}
                    className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          <div className="flex flex-wrap gap-1 mb-4">
            {venue.hasOutdoorSeating && (
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                Outdoor
              </span>
            )}
            {venue.hasLiveMusic && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                Live Music
              </span>
            )}
            {venue.hasDancing && (
              <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium">
                Dance Floor
              </span>
            )}
            {venue.hasHappyHour && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                Happy Hour
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 flex-wrap">
            <button className="flex-1 btn-primary text-sm py-2">
              View Details
            </button>
            <button
              onClick={() => onOpenInMapbox?.(venue)}
              className="btn-secondary text-sm py-2 px-3 flex items-center gap-2"
            >
              <MapPin size={14} />
              Mapbox
            </button>
            {venue.website && (
              <a
                href={venue.website}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm py-2 px-3"
              >
                <Globe size={16} />
              </a>
            )}
            {venue.instagram && (
              <a
                href={`https://instagram.com/${venue.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm py-2 px-3"
              >
                <Instagram size={16} />
              </a>
            )}
          </div>

          {/* Additional Info */}
          {venue.averageDrinkPrice && (
            <div className="mt-3 pt-3 border-t border-ui-border">
              <div className="text-xs text-ui-text-secondary">
                <span className="font-medium">Avg. drink price:</span> {venue.averageDrinkPrice}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </Popup>
  );
};

export default VenuePopup;
