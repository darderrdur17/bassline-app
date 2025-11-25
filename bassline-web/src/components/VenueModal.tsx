'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Venue } from '@/types/venue';
import { X, Star, Clock, MapPin, Phone, Globe, Instagram, Heart, ExternalLink } from 'lucide-react';
import { useVenueStore } from '@/stores/useVenueStore';

interface VenueModalProps {
  venue: Venue;
  onClose: () => void;
}

const VenueModal: React.FC<VenueModalProps> = ({ venue, onClose }) => {
  const { toggleFavorite } = useVenueStore();

  // Get crowd level info
  const getCrowdInfo = () => {
    if (!venue.currentCrowdLevel) return null;

    const crowdLabels = {
      empty: { label: 'Very Quiet', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
      moderate: { label: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
      busy: { label: 'Busy', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
      packed: { label: 'Very Busy', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
    };

    return crowdLabels[venue.currentCrowdLevel];
  };

  const crowdInfo = getCrowdInfo();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-ui-surface rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Image */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={venue.heroImage}
              alt={venue.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Venue Type Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 bg-black/70 text-white text-sm rounded-full font-medium backdrop-blur-sm">
                {venue.type}
              </span>
            </div>

            {/* Real-time Status */}
            {crowdInfo && (
              <div className="absolute bottom-4 left-4 right-4">
                <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${crowdInfo.bg} ${crowdInfo.border} border`}>
                  <div className={`w-2 h-2 rounded-full ${crowdInfo.color.replace('text-', 'bg-')}`} />
                  <span className={`text-sm font-medium ${crowdInfo.color}`}>
                    {crowdInfo.label}
                  </span>
                  {venue.currentWaitTime && (
                    <span className="text-xs text-ui-text-secondary ml-2">
                      {venue.currentWaitTime} min wait
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 overflow-y-auto max-h-96">
            {/* Title and Rating */}
            <div className="mb-3 sm:mb-4">
              <h2 className="text-2xl font-extrabold font-brand text-ui-text mb-2">
                {venue.name}
              </h2>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-500 fill-current" />
                  <span className="font-medium">{venue.rating}</span>
                </div>
                <span className="text-ui-text-secondary">•</span>
                <span className="font-medium">{venue.pricing}</span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
              <MapPin size={18} className="text-ui-text-secondary flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium text-ui-text">{venue.neighborhood}</p>
                {venue.address && (
                  <p className="text-sm text-ui-text-secondary">{venue.address}</p>
                )}
              </div>
            </div>

            {/* Hours */}
            {venue.hours && (
              <div className="flex items-start gap-3 mb-4">
                <Clock size={18} className="text-ui-text-secondary mt-0.5 flex-shrink-0" />
                <div className="text-sm text-ui-text-secondary">
                  {typeof venue.hours === 'string' ? venue.hours : 'Hours vary'}
                </div>
              </div>
            )}

            {/* Description */}
            {venue.description && (
              <div className="mb-4">
                <p className="text-ui-text-secondary leading-relaxed">
                  {venue.description}
                </p>
              </div>
            )}

            {/* Music Genres */}
            {venue.musicGenre && venue.musicGenre.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold text-ui-text mb-2">Music</h4>
                <div className="flex flex-wrap gap-2">
                  {venue.musicGenre.map((genre) => (
                    <span key={genre} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            <div className="mb-4">
              <h4 className="font-semibold text-ui-text mb-3">Features</h4>
              <div className="grid grid-cols-2 gap-2">
                {venue.hasOutdoorSeating && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-500">✓</span>
                    <span>Outdoor Seating</span>
                  </div>
                )}
                {venue.hasLiveMusic && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-500">✓</span>
                    <span>Live Music</span>
                  </div>
                )}
                {venue.hasDancing && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-500">✓</span>
                    <span>Dance Floor</span>
                  </div>
                )}
                {venue.hasHappyHour && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-500">✓</span>
                    <span>Happy Hour</span>
                  </div>
                )}
                {venue.hasReservations && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-500">✓</span>
                    <span>Reservations</span>
                  </div>
                )}
                {venue.ageRestriction && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-blue-500">ℹ</span>
                    <span>{venue.ageRestriction}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Pricing Info */}
            {venue.averageDrinkPrice && (
              <div className="mb-3 p-2 sm:p-3 bg-ui-background rounded-xl">
                <h4 className="font-semibold text-ui-text mb-0.5 sm:mb-1">Average Drink Price</h4>
                <p className="text-brand-red font-medium">{venue.averageDrinkPrice}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 btn-primary">
                Get Directions
              </button>
              {venue.website && (
                <a
                  href={venue.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  <Globe size={16} />
                  Website
                </a>
              )}
              {venue.instagram && (
                <a
                  href={`https://instagram.com/${venue.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  <Instagram size={16} />
                  Instagram
                </a>
              )}
            </div>

            {/* Good to Know */}
            {venue.goodToKnow && (
              <div className="mt-3 p-2 sm:p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                <h4 className="font-semibold text-yellow-800 mb-0.5 sm:mb-1">Good to Know</h4>
                <p className="text-yellow-700 text-sm">{venue.goodToKnow}</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VenueModal;