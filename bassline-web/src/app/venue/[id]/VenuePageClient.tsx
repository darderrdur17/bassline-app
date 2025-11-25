'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Venue } from '@/types/venue';
import { venues } from '@/data/venues';
import { formatVenueHours } from '@/utils/formatHours';

interface VenuePageClientProps {
  venue: Venue;
}

export default function VenuePageClient({ venue }: VenuePageClientProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  // Find current venue index for navigation
  useEffect(() => {
    const index = venues.findIndex(v => v.id === venue.id);
    setCurrentIndex(index >= 0 ? index : -1);
  }, [venue.id]);

  const handleNext = () => {
    if (currentIndex >= 0) {
      const nextIndex = (currentIndex + 1) % venues.length;
      const nextVenue = venues[nextIndex];
      router.push(`/venue/${nextVenue.id}`);
    }
  };

  const handlePrevious = () => {
    if (currentIndex >= 0) {
      const prevIndex = (currentIndex - 1 + venues.length) % venues.length;
      const prevVenue = venues[prevIndex];
      router.push(`/venue/${prevVenue.id}`);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F5F5DC] via-white to-[#F5F5DC] flex flex-col items-center" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Hero Section */}
      <div className="relative w-full h-80 sm:h-96 overflow-hidden">
        {venue.heroImage && (
          <>
            <img
              src={typeof venue.heroImage === 'string' ? venue.heroImage : undefined}
              alt={venue.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs font-medium font-body">
                  {venue.type}
                </span>
                <span className="px-3 py-1 bg-yellow-500/80 backdrop-blur-sm rounded-full text-xs font-medium font-body">
                  ⭐ {venue.rating}
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium font-body">
                  {venue.pricing}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-brand mb-2 text-white">
                {venue.name}
              </h1>
              <p className="text-lg text-white/90 font-body mb-4">
                📍 {venue.neighborhood}
              </p>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between">
                <button
                  onClick={handlePrevious}
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200 text-white font-medium"
                  aria-label="Previous venue"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>

                <span className="text-white/80 text-sm font-body">
                  {currentIndex + 1} of {venues.length}
                </span>

                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200 text-white font-medium"
                  aria-label="Next venue"
                >
                  Next
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Gallery */}
      {venue.gallery && venue.gallery.length > 0 && (
        <div className="w-full max-w-6xl px-6 py-8">
          <h2 className="text-2xl font-bold mb-6 text-[#E53935] font-title">Gallery</h2>
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4">
              {venue.gallery.map((image, index) => (
                <div key={index} className="flex-shrink-0">
                  <img
                    src={image}
                    alt={`${venue.name} gallery ${index + 1}`}
                    className="h-48 w-64 object-cover rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl w-full px-6 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          {/* Description Section */}
          <div className="p-8 bg-gradient-to-r from-[#E53935]/5 to-transparent">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4 text-[#E53935] font-brand">{venue.name}</h2>
                {venue.shortDescription && (
                  <p className="text-lg text-gray-700 leading-relaxed font-body">
                    {(() => {
                      const text = venue.shortDescription || '';
                      return text.charAt(0).toUpperCase() + text.slice(1);
                    })()}
                  </p>
                )}
              </div>
              {venue.accolades && (
                <div className="ml-6">
                  <span className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                    🏆 {venue.accolades}
                  </span>
                </div>
              )}
            </div>

            {/* Key Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                <div className="text-[#E53935] text-2xl mb-2">🏷️</div>
                <div className="text-sm text-gray-600 font-medium">Type</div>
                <div className="text-lg font-semibold text-gray-900">{venue.type}</div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                <div className="text-[#E53935] text-2xl mb-2">💰</div>
                <div className="text-sm text-gray-600 font-medium">Pricing</div>
                <div className="text-lg font-semibold text-gray-900">{venue.pricing}</div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                <div className="text-[#E53935] text-2xl mb-2">⭐</div>
                <div className="text-sm text-gray-600 font-medium">Rating</div>
                <div className="text-lg font-semibold text-gray-900">{venue.rating}</div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                <div className="text-[#E53935] text-2xl mb-2">📍</div>
                <div className="text-sm text-gray-600 font-medium">Neighborhood</div>
                <div className="text-lg font-semibold text-gray-900">{venue.neighborhood}</div>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-[#E53935] font-title">Hours</h3>
                  <div className="space-y-2 text-gray-700">
                    {formatVenueHours(typeof venue.hours === 'string' ? venue.hours : 'Hours vary').split('; ').map((part, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#E53935] rounded-full"></span>
                        <span className="font-body">{part}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {venue.averageDrinkPrice && (
                  <div>
                    <h3 className="text-xl font-bold mb-2 sm:mb-3 text-[#E53935] font-title">Drinks</h3>
                    <p className="text-gray-700 font-body">
                      <span className="font-semibold">Average Price:</span> {venue.averageDrinkPrice}
                    </p>
                    {venue.recommendedDrinks && venue.recommendedDrinks.length > 0 && (
                      <p className="text-gray-700 font-body mt-2">
                        <span className="font-semibold">Recommended:</span> {venue.recommendedDrinks.join(', ')}
                      </p>
                    )}
                  </div>
                )}

                {venue.cuisine && (
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-[#E53935] font-title">Cuisine</h3>
                    <p className="text-gray-700 font-body">{venue.cuisine}</p>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {venue.ambiance && venue.ambiance.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-[#E53935] font-title">Ambiance</h3>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(venue.ambiance) ? venue.ambiance.map((item, idx) => (
                        <span key={idx} className="px-3 py-1 bg-[#E53935]/10 text-[#E53935] rounded-full text-sm font-medium">
                          {item}
                        </span>
                      )) : (
                        <span className="px-3 py-1 bg-[#E53935]/10 text-[#E53935] rounded-full text-sm font-medium">
                          {venue.ambiance}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {venue.musicGenre && venue.musicGenre.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-[#E53935] font-title">Music</h3>
                    <div className="flex flex-wrap gap-2">
                      {venue.musicGenre.map((genre, idx) => (
                        <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {venue.whereToGoIf && (
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-[#E53935] font-title">Perfect For</h3>
                    <p className="text-gray-700 font-body italic">"{venue.whereToGoIf}"</p>
                  </div>
                )}

                {venue.goodToKnow && (
                  <div>
                    <h3 className="text-xl font-bold mb-2 sm:mb-3 text-[#E53935] font-title">Good to Know</h3>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-2 sm:p-3 rounded">
                      <p className="text-gray-700 font-body">{venue.goodToKnow}</p>
                    </div>
                  </div>
                )}

                {venue.recommendations && venue.recommendations.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-[#E53935] font-title">Recommendations</h3>
                    <ul className="space-y-1">
                      {venue.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-700 font-body">
                          <span className="text-[#E53935]">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#E53935] font-title">Connect</h3>
              <div className="flex gap-4">
                {venue.instagram && (
                  <a
                    href={venue.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 font-medium"
                  >
                    <span className="text-lg">📷</span>
                    Instagram
                  </a>
                )}
                {venue.yelpUrl && (
                  <a
                    href={venue.yelpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
                  >
                    <span className="text-lg">🌐</span>
                    Yelp
                  </a>
                )}
                {venue.resyUrl && (
                  <a
                    href={venue.resyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                  >
                    <span className="text-lg">🍽️</span>
                    Reserve
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
