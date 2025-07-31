import React from 'react';
import { Venue } from '@/types/venue';

interface Props {
  venue: Venue;
  onClose: () => void;
}

export default function VenueModal({ venue, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-t-2xl md:rounded-2xl shadow-xl w-full md:max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative">
          {venue.heroImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={typeof venue.heroImage === 'string' ? venue.heroImage : undefined} alt={venue.name} className="w-full h-48 object-cover rounded-t-2xl" />
          )}
          <button 
            onClick={onClose} 
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-white transition-colors text-gray-700 hover:text-gray-900"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 font-body">
          <h2 className="text-2xl font-brand font-bold mb-2 text-[#E53935]">
            {venue.name}
          </h2>
          
          {venue.shortDescription && (
            <p className="text-base mb-4 font-body text-gray-800 leading-relaxed">
              {venue.shortDescription}
            </p>
          )}
          
          {venue.accolades && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800 font-semibold font-body">
                🏆 {venue.accolades}
              </p>
            </div>
          )}

          {/* Venue Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-3 text-sm font-body">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Type:</span>
                <span className="text-gray-900">{venue.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Neighborhood:</span>
                <span className="text-gray-900">{venue.neighborhood}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Hours:</span>
                <span className="text-gray-900">{venue.hours}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Dress Code:</span>
                <span className="text-gray-900">{venue.dressCode}</span>
              </div>
            </div>
            
            <div className="space-y-3 text-sm font-body">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Pricing:</span>
                <span className="text-gray-900 font-medium">{venue.pricing}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Rating:</span>
                <span className="text-gray-900 flex items-center gap-1">
                  ⭐ {venue.rating}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Wait Time:</span>
                <span className="text-gray-900">{venue.waitTime} min</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Crowd Level:</span>
                <span className="text-gray-900 capitalize">{venue.crowdLevel}</span>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-4 mb-6">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2 font-body">Ambiance:</h4>
              <div className="flex flex-wrap gap-2">
                {venue.ambiance.map((item) => (
                  <span key={item} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium font-body">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-700 mb-2 font-body">Music:</h4>
              <div className="flex flex-wrap gap-2">
                {venue.musicGenre.map((genre) => (
                  <span key={genre} className="px-3 py-1 bg-[#E53935]/10 text-[#E53935] rounded-full text-xs font-medium font-body">
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {venue.cuisine && (
              <div>
                <h4 className="font-semibold text-gray-700 mb-2 font-body">Cuisine:</h4>
                <p className="text-gray-900 text-sm font-body">{venue.cuisine}</p>
              </div>
            )}
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-6">
            {venue.instagram && (
              <a 
                href={venue.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-700 rounded-lg hover:bg-pink-100 transition-colors font-body text-sm font-medium"
              >
                📷 Instagram
              </a>
            )}
            {venue.yelpUrl && (
              <a 
                href={venue.yelpUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors font-body text-sm font-medium"
              >
                🌐 Yelp
              </a>
            )}
            {venue.resyUrl && (
              <a 
                href={venue.resyUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors font-body text-sm font-medium"
              >
                🍽️ Reserve
              </a>
            )}
          </div>
          
          <div className="flex gap-3">
            <a 
              href={`/venue/${venue.id}`} 
              className="flex-1 text-center px-4 py-3 bg-[#E53935] text-white rounded-lg font-semibold font-body hover:bg-[#C62D2D] transition-colors"
            >
              View Full Details →
            </a>
            <button
              onClick={onClose}
              className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold font-body hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 