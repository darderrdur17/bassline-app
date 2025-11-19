'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Clock, Music, Users, Heart, ExternalLink } from 'lucide-react';
import { Venue } from '@/types/venue';
import { useVenueStore, useVenueSelectors } from '@/stores/useVenueStore';

interface VenueCardProps {
  venue: Venue;
  index?: number;
  variant?: 'default' | 'compact' | 'featured';
  showActions?: boolean;
  className?: string;
}

const VenueCard: React.FC<VenueCardProps> = ({
  venue,
  index = 0,
  variant = 'default',
  showActions = true,
  className = '',
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const { setSelectedVenue, toggleFavorite } = useVenueStore();
  const { isFavorite } = useVenueSelectors();

  const isVenueFavorite = isFavorite(venue.id.toString());

  // Get crowd level info
  const getCrowdInfo = () => {
    if (!venue.currentCrowdLevel) return null;

    const crowdLabels = {
      empty: { label: 'Quiet', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
      moderate: { label: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
      busy: { label: 'Busy', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
      packed: { label: 'Packed', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
    };

    return crowdLabels[venue.currentCrowdLevel];
  };

  const crowdInfo = getCrowdInfo();

  // Format hours for display
  const formatHours = (hours: string | any) => {
    if (typeof hours === 'string') {
      return hours.split(';')[0]?.trim();
    }
    return 'Hours vary';
  };

  const handleCardClick = () => {
    setSelectedVenue(venue);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(venue.id.toString());
  };

  const cardVariants = {
    default: 'venue-card',
    compact: 'bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer',
    featured: 'venue-card bg-gradient-to-br from-white to-gray-50',
  };

  const imageHeights = {
    default: 'h-48',
    compact: 'h-32',
    featured: 'h-56',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`${cardVariants[variant]} ${className}`}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-label={`View details for ${venue.name}`}
    >
      {/* Image Section */}
      <div className={`relative overflow-hidden rounded-t-xl ${imageHeights[variant]}`}>
        {!imageError ? (
          <>
            <img
              src={venue.heroImage}
              alt={`${venue.name} interior`}
              className={`w-full h-full object-cover transition-transform duration-500 hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <MapPin size={48} className="text-gray-400" />
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2 py-1 bg-black/70 backdrop-blur-sm text-white text-xs rounded-full font-medium">
            {venue.type}
          </span>
          {crowdInfo && (
            <span className={`px-2 py-1 ${crowdInfo.bg} ${crowdInfo.border} border text-xs rounded-full font-medium backdrop-blur-sm`}>
              {crowdInfo.label}
            </span>
          )}
        </div>

        {/* Favorite Button */}
        {showActions && (
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
          >
            <Heart
              size={16}
              className={isVenueFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}
            />
          </button>
        )}

        {/* Bottom Info Overlay */}
        <div className="absolute bottom-3 left-3 right-3 transform translate-y-2 hover:translate-y-0 transition-transform duration-300 opacity-0 hover:opacity-100">
          <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center justify-between text-white text-sm">
              <div className="flex items-center gap-2">
                <Star size={14} className="text-yellow-400 fill-current" />
                <span className="font-semibold">{venue.rating}</span>
              </div>
              <span className="font-medium">{venue.pricing}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title and Rating */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900 hover:text-brand-red transition-colors line-clamp-1 mb-1">
            {venue.name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Star size={12} className="text-yellow-500 fill-current" />
              <span className="font-medium">{venue.rating}</span>
            </div>
            <span>•</span>
            <span className="font-medium">{venue.pricing}</span>
          </div>
        </div>

        {/* Description */}
        {variant !== 'compact' && venue.description && (
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
            {venue.description}
          </p>
        )}

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <MapPin size={14} className="text-gray-400 flex-shrink-0" />
          <span className="truncate">{venue.neighborhood}</span>
        </div>

        {/* Hours */}
        {variant !== 'compact' && (
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <Clock size={14} className="text-gray-400 flex-shrink-0" />
            <span className="truncate">{formatHours(venue.hours)}</span>
          </div>
        )}

        {/* Music Genres */}
        {venue.musicGenre && venue.musicGenre.length > 0 && (
          <div className="flex items-center gap-2 mb-3">
            <Music size={14} className="text-gray-400 flex-shrink-0" />
            <div className="flex gap-1 flex-wrap">
              {venue.musicGenre.slice(0, variant === 'compact' ? 1 : 2).map((genre) => (
                <span
                  key={genre}
                  className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                >
                  {genre}
                </span>
              ))}
              {venue.musicGenre.length > (variant === 'compact' ? 1 : 2) && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                  +{venue.musicGenre.length - (variant === 'compact' ? 1 : 2)}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Features */}
        <div className="flex items-center gap-2 mb-4">
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
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="text-sm text-gray-600">
              {venue.averageDrinkPrice && (
                <span className="font-medium text-gray-900">{venue.averageDrinkPrice}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {venue.website && (
                <a
                  href={venue.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 text-gray-400 hover:text-brand-red transition-colors"
                >
                  <ExternalLink size={16} />
                </a>
              )}
              <button
                onClick={handleCardClick}
                className="px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-brand-red-dark transition-colors text-sm font-medium"
              >
                View Details
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default VenueCard;
