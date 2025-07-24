import { notFound } from 'next/navigation';
import { venues } from '@/data/venues.js';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const venue = venues.find(v => v.id === Number(params.id));
  return {
    title: venue ? `${venue.name} – Bassline` : 'Venue – Bassline',
    description: venue?.shortDescription || 'Venue details on Bassline',
  };
}

export default function VenuePage({ params }: { params: { id: string } }) {
  const venue = venues.find(v => v.id === Number(params.id));
  if (!venue) return notFound();

  return (
    <main className="min-h-screen bg-[#F5F5DC] flex flex-col items-center" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Hero */}
      {venue.heroImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={typeof venue.heroImage === 'string' ? venue.heroImage : undefined} alt={venue.name} className="w-full h-60 object-cover" />
      )}

      <div className="max-w-3xl w-full px-6 py-4">
        <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-brand)', color: '#E53935' }}>{venue.name}</h1>
        {venue.shortDescription && <p className="text-lg mb-4">{venue.shortDescription}</p>}
        {venue.accolades && <p className="text-sm text-yellow-700 mb-4 font-semibold">{venue.accolades}</p>}

        <div className="space-y-1 text-base">
          <p><span className="font-semibold">Type:</span> {venue.type}</p>
          {venue.cuisine && <p><span className="font-semibold">Cuisine:</span> {venue.cuisine}</p>}
          <p><span className="font-semibold">Neighborhood:</span> {venue.neighborhood}</p>
          <p><span className="font-semibold">Hours:</span> {venue.hours}</p>
          <p><span className="font-semibold">Ambiance:</span> {venue.ambiance.join(', ')}</p>
          <p><span className="font-semibold">Music:</span> {venue.musicGenre.join(', ')}</p>
          <p><span className="font-semibold">Dress Code:</span> {venue.dressCode}</p>
        </div>

        {/* Social */}
        <div className="flex gap-6 mt-6">
          {venue.instagram && <a href={venue.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 text-2xl">📷</a>}
          {venue.yelpUrl && <a href={venue.yelpUrl} target="_blank" rel="noopener noreferrer" className="text-green-700 text-2xl">🌐</a>}
          {venue.resyUrl && <a href={venue.resyUrl} target="_blank" rel="noopener noreferrer" className="text-red-600 text-2xl">🍽️</a>}
        </div>
      </div>
    </main>
  );
} 