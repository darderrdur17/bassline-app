import { notFound } from 'next/navigation';
import { venues } from '@/data/venues';
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

      {/* Gallery */}
      {venue.gallery && venue.gallery.length > 0 && (
        <div className="w-full overflow-x-auto px-6 py-4">
          <div className="flex gap-4 max-w-3xl mx-auto">
            {venue.gallery.map((image, index) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                key={index}
                src={image} 
                alt={`${venue.name} gallery ${index + 1}`} 
                className="h-48 w-auto object-cover rounded-lg shadow-md flex-shrink-0"
              />
            ))}
          </div>
        </div>
      )}

      <div className="max-w-3xl w-full px-6 py-4">
        <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-brand)', color: '#E53935' }}>{venue.name}</h1>
        {venue.shortDescription && (
          <p className="text-lg mb-4 text-gray-800">
            {(() => {
              const text = venue.shortDescription || '';
              // Ensure sentence case: capitalize first letter if not already
              if (!text) return '';
              return text.charAt(0).toUpperCase() + text.slice(1);
            })()}
          </p>
        )}
        {venue.accolades && <p className="text-sm text-yellow-700 mb-4 font-semibold">🏆 {venue.accolades}</p>}

        <div className="space-y-2 text-base text-gray-800">
          <p><span className="font-semibold text-gray-900">Type:</span> <span className="text-gray-700">{venue.type}</span></p>
          {venue.cuisine && <p><span className="font-semibold text-gray-900">Cuisine:</span> <span className="text-gray-700">{venue.cuisine}</span></p>}
          <p><span className="font-semibold text-gray-900">Neighborhood:</span> <span className="text-gray-700">{venue.neighborhood}</span></p>
          <p><span className="font-semibold text-gray-900">Hours:</span> <span className="text-gray-700">{venue.hours}</span></p>
          {venue.ambiance && (
            <p><span className="font-semibold text-gray-900">Ambiance:</span> <span className="text-gray-700">{venue.ambiance.join(', ')}</span></p>
          )}
          {venue.musicGenre && (
            <p><span className="font-semibold text-gray-900">Music:</span> <span className="text-gray-700">{venue.musicGenre.join(', ')}</span></p>
          )}
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