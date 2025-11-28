'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Clock, Music, Users, Heart, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Venue } from '@/types/venue';
import { useVenueStore, useVenueSelectors } from '@/stores/useVenueStore';
import { venues } from '@/data/venues';

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
  const [currentVenueIndex, setCurrentVenueIndex] = useState(-1);
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [galleryVenue, setGalleryVenue] = useState<Venue | null>(null);

  const router = useRouter();
  const { setSelectedVenue, toggleFavorite } = useVenueStore();
  const { isFavorite } = useVenueSelectors();

  const isVenueFavorite = isFavorite(venue.id.toString());

  // Find current venue index for navigation
  useEffect(() => {
    const index = venues.findIndex(v => v.id === venue.id);
    setCurrentVenueIndex(index >= 0 ? index : -1);
  }, [venue.id]);

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
      className={`group ${cardVariants[variant]} ${className}`}
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
              loading="lazy"
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


        {/* Action Buttons Overlay */}
        {showActions && (
          <>
            {/* Favorite Button */}
            <button
              onClick={handleFavoriteClick}
              className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            >
              <Heart
                size={16}
                className={isVenueFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}
              />
            </button>

            {/* Gallery Button Overlay */}
            {venue.gallery && venue.gallery.length > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setGalleryVenue(venue);
                  setShowImageGallery(true);
                }}
                className="absolute top-3 right-16 p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                title="View Gallery"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
            )}
          </>
        )}

        {/* Bottom Info Overlay */}
        <div className="absolute bottom-3 left-3 right-3 transform translate-y-2 hover:translate-y-0 transition-transform duration-300 opacity-0 hover:opacity-100">
          <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center justify-between text-white text-sm">
              <div className="flex items-center gap-2">
                <Star size={14} className="text-yellow-400 fill-current" />
                <span className="font-semibold">{venue.rating}</span>
              </div>
              <span className="font-roboto-medium">{venue.pricing}</span>
            </div>
          </div>
        </div>

        {/* Gallery Indicator */}
        {venue.gallery && venue.gallery.length > 0 && (
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
            <span className="text-white text-xs font-medium">📸</span>
            <span className="text-white text-xs font-medium">{venue.gallery.length + 1}</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="pt-1 sm:pt-2 px-2 sm:px-3 pb-2 sm:pb-3">
        {/* Title and Rating */}
        <div className="mb-2 sm:mb-3">
          <h3 className="text-venue-base font-anton font-bold text-gray-900 hover:text-brand-red transition-colors line-clamp-1 mb-2 sm:mb-3 uppercase tracking-heading">
            {venue.name}
          </h3>
          <div className="flex items-center gap-2 text-small text-gray-600">
            <div className="flex items-center gap-0.5">
              <Star size={12} className="text-yellow-500 fill-current" />
              <span className="font-roboto-medium">{venue.rating}</span>
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
        <div className="flex items-center gap-1.5 sm:gap-2 text-sm text-gray-600 mb-2 sm:mb-3">
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
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
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

      {/* Image Gallery Modal */}
      {showImageGallery && galleryVenue && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{galleryVenue.name}</h3>
                  <p className="text-gray-600">{galleryVenue.neighborhood}</p>
                </div>
                <button
                  onClick={() => setShowImageGallery(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Gallery Content */}
            <div className="p-6">
              {/* Images */}
              <div className="space-y-4">
                {/* Hero Image */}
                {galleryVenue.heroImage && (
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-gray-800">Main Image</h4>
                    <img
                      src={galleryVenue.heroImage}
                      alt={`${galleryVenue.name} main`}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Gallery Images */}
                {galleryVenue.gallery && galleryVenue.gallery.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-gray-800">
                      Gallery ({galleryVenue.gallery.length} images)
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {galleryVenue.gallery.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${galleryVenue.name} gallery ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Venue Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-semibold">Type:</span> {galleryVenue.type}
                    </div>
                    <div>
                      <span className="font-semibold">Rating:</span> ⭐ {galleryVenue.rating}
                    </div>
                    <div>
                      <span className="font-semibold">Price:</span> {galleryVenue.pricing}
                    </div>
                    <div>
                      <span className="font-semibold">Neighborhood:</span> {galleryVenue.neighborhood}
                    </div>
                  </div>
                  {galleryVenue.description && (
                    <p className="mt-3 text-gray-700 text-sm">{galleryVenue.description}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

// Venue card component with gallery functionality
export default VenueCard;
