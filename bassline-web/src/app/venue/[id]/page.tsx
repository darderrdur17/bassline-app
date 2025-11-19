import { notFound } from 'next/navigation';
import { venues } from '@/data/venues';
import { Metadata } from 'next';
import { formatVenueHours } from '@/utils/formatHours';

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
        <h1 className="text-4xl font-brand mb-2" style={{ color: '#E53935' }}>{venue.name} {venue.pricing}</h1>
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
      </div>

      {/* Red Section with Venue Details - Following Design Template */}
      <div className="w-full bg-[#E53935] text-white py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {venue.heroImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={typeof venue.heroImage === 'string' ? venue.heroImage : undefined} 
                  alt={venue.name} 
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}
            </div>
            <div className="space-y-3 text-white font-bold">
              <p><span className="uppercase">VENUE:</span> {venue.type}</p>
              {venue.hours && (
                <p><span className="uppercase">TIME:</span> {formatVenueHours(venue.hours).split('; ')[0]}</p>
              )}
              {venue.ambiance && venue.ambiance.length > 0 && (
                <p><span className="uppercase">AMBIANCE:</span> {(() => {
                  const ambienceText = Array.isArray(venue.ambiance) ? venue.ambiance.join(', ') : venue.ambiance || '';
                  return ambienceText.toUpperCase();
                })()}</p>
              )}
              {venue.musicGenre && venue.musicGenre.length > 0 && (
                <p><span className="uppercase">GENRE:</span> {venue.musicGenre.join(', ').toUpperCase()}</p>
              )}
              {venue.dressCode && (
                <p><span className="uppercase">DRESSCODE:</span> {venue.dressCode.toUpperCase()}</p>
              )}
              {venue.crowd && (
                <p><span className="uppercase">CROWD:</span> {Array.isArray(venue.crowd) ? venue.crowd.join(', ').toUpperCase() : venue.crowd.toUpperCase()}</p>
              )}
              {venue.estimatedUber && (
                <p><span className="uppercase">ESTIMATED UBER:</span> {venue.estimatedUber}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Details Section */}
      <div className="max-w-3xl w-full px-6 py-4">
        <div className="space-y-4 text-base text-gray-800">
          {venue.averageDrinkPrice && (
            <p><span className="font-semibold text-gray-900">Average Drink Price:</span> <span className="text-gray-700">{venue.averageDrinkPrice}</span></p>
          )}
          {venue.whereToGoIf && (
            <p><span className="font-semibold text-gray-900">Where you go if:</span> <span className="text-gray-700">{venue.whereToGoIf}</span></p>
          )}
          {venue.cuisine && (
            <p><span className="font-semibold text-gray-900">Cuisine:</span> <span className="text-gray-700">{venue.cuisine}</span></p>
          )}
          <p><span className="font-semibold text-gray-900">Neighborhood:</span> <span className="text-gray-700">{venue.neighborhood}</span></p>
          <div>
            <span className="font-semibold text-gray-900">Hours: </span>
            <div className="text-gray-700 mt-1">
              {formatVenueHours(venue.hours).split('; ').map((part, idx) => (
                <div key={idx}>{part}</div>
              ))}
            </div>
          </div>
          {venue.recommendedDrinks && venue.recommendedDrinks.length > 0 && (
            <p><span className="font-semibold text-gray-900">Drinks:</span> <span className="text-gray-700">{venue.recommendedDrinks.join(', ')}</span></p>
          )}
          {venue.recommendations && venue.recommendations.length > 0 && (
            <p><span className="font-semibold text-gray-900">Recs:</span> <span className="text-gray-700">{venue.recommendations.join(', ')}</span></p>
          )}
          {venue.goodToKnow && (
            <p><span className="font-semibold text-gray-900">Good to know:</span> <span className="text-gray-700">{venue.goodToKnow}</span></p>
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