import React from 'react';
import { Venue } from '@/types/venue';

interface Props {
  venue: Venue;
  onClose: () => void;
}

export default function VenueModal({ venue, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-40 flex items-end md:items-center justify-center bg-black/50">
      <div className="bg-white rounded-t-2xl md:rounded-2xl shadow-xl w-full md:max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative">
          {venue.heroImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={typeof venue.heroImage === 'string' ? venue.heroImage : undefined} alt={venue.name} className="w-full h-40 object-cover rounded-t-2xl" />
          )}
          <button onClick={onClose} className="absolute top-2 right-2 bg-white rounded-full p-1 shadow">
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-5" style={{ fontFamily: 'var(--font-body)' }}>
          <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-brand)', color: '#E53935' }}>
            {venue.name}
          </h2>
          {venue.shortDescription && <p className="text-sm mb-2">{venue.shortDescription}</p>}
          {venue.accolades && <p className="text-xs text-yellow-600 mb-2 font-semibold">{venue.accolades}</p>}

          <div className="space-y-1 text-sm">
            <p><span className="font-semibold">Type:</span> {venue.type}</p>
            {venue.cuisine && <p><span className="font-semibold">Cuisine:</span> {venue.cuisine}</p>}
            <p><span className="font-semibold">Neighborhood:</span> {venue.neighborhood}</p>
            <p><span className="font-semibold">Hours:</span> {venue.hours}</p>
            <p><span className="font-semibold">Ambiance:</span> {venue.ambiance.join(', ')}</p>
            <p><span className="font-semibold">Music:</span> {venue.musicGenre.join(', ')}</p>
            <p><span className="font-semibold">Dress Code:</span> {venue.dressCode}</p>
            <p><span className="font-semibold">Crowd:</span> {Array.isArray(venue.crowd) ? venue.crowd.join(', ') : venue.crowd}</p>
          </div>

          {/* Social links */}
          <div className="flex gap-4 mt-4">
            {venue.instagram && (
              <a href={venue.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 text-xl">📷</a>
            )}
            {venue.yelpUrl && (
              <a href={venue.yelpUrl} target="_blank" rel="noopener noreferrer" className="text-green-600 text-xl">🌐</a>
            )}
            {venue.resyUrl && (
              <a href={venue.resyUrl} target="_blank" rel="noopener noreferrer" className="text-red-600 text-xl">🍽️</a>
            )}
          </div>
          <div className="mt-4 text-right">
            <a href={`/venue/${venue.id}`} className="text-[#E53935] underline text-sm font-semibold">View full details →</a>
          </div>
        </div>
      </div>
    </div>
  );
} 