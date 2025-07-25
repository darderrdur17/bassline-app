'use client';

import { useState } from 'react';
import { venues } from '@/data/venues.js';
import dynamic from 'next/dynamic';
const DynamicMap = dynamic(() => import('@/components/Map'), { ssr: false, loading: () => <div style={{ height: 400 }} /> });
import VenueModal from '@/components/VenueModal';
import React from 'react';
import FilterDrawer from '@/components/FilterDrawer';

export default function Home() {
  const [searchText, setSearchText] = useState('');
  const [filteredVenues, setFilteredVenues] = useState(venues);
  const [selectedVenue, setSelectedVenue] = useState(null as any);
  const [activeTypes, setActiveTypes] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [advFilters, setAdvFilters] = useState({ neighborhood: [], pricing: [], musicGenre: [] } as { neighborhood: string[]; pricing: string[]; musicGenre: string[] });

  const handleSearch = (text: string) => {
    setSearchText(text);
    // Filtering handled in effect below
  };

  const toggleType = (type: string) => {
    setActiveTypes((prev) => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };

  // Compute filtered venues when search or filters change
  React.useEffect(() => {
    let filtered = venues;

    if (searchText.trim()) {
      const term = searchText.toLowerCase();
      filtered = filtered.filter((venue: any) =>
        venue.name.toLowerCase().includes(term) ||
        venue.neighborhood.toLowerCase().includes(term) ||
        venue.type.toLowerCase().includes(term) ||
        venue.musicGenre.some((g: string) => g.toLowerCase().includes(term)) ||
        venue.tags.some((t: string) => t.toLowerCase().includes(term))
      );
    }

    if (activeTypes.length) {
      filtered = filtered.filter((v: any) => activeTypes.includes(v.type));
    }

    // Neighborhood filter
    if (advFilters.neighborhood.length) {
      filtered = filtered.filter((v: any) => advFilters.neighborhood.includes(v.neighborhood));
    }

    // Pricing filter
    if (advFilters.pricing.length) {
      filtered = filtered.filter((v: any) => advFilters.pricing.includes(v.pricing));
    }

    // Music genre filter
    if (advFilters.musicGenre.length) {
      filtered = filtered.filter((v: any) => v.musicGenre.some((g: string) => advFilters.musicGenre.includes(g)));
    }

    setFilteredVenues(filtered);
  }, [searchText, activeTypes, advFilters]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5DC]">
      {/* Header */}
      <div className="bg-[#E53935] text-white p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-2 tracking-wider">
            BASSLINE
          </h1>
          <p className="text-lg text-center mb-6 opacity-90 tracking-wide">
            THE CITY NEVER SLEEPS, NEITHER SHOULD YOU.
          </p>
          
          {/* Search Section */}
          <div className="mb-4">
            <p className="text-center mb-3 font-semibold">
              WHAT ARE YOU FEELING TONIGHT?
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search venues, moods, music..."
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border-2 border-white bg-white text-gray-800 placeholder-gray-500"
              />
              <button className="px-4 py-2 bg-white text-[#E53935] rounded-lg font-semibold">
                🔍
              </button>
            </div>
          </div>

          {/* Type Filter Chips */}
          <div className="flex justify-center gap-3 mt-2 flex-wrap">
            {['Bar', 'Restaurant', 'Lounge', 'Club'].map((type) => (
              <button
                key={type}
                onClick={() => toggleType(type)}
                className={`px-3 py-1 rounded-full border-2 font-semibold text-sm ${activeTypes.includes(type) ? 'bg-white text-[#E53935]' : 'bg-transparent text-white'} border-white`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* The pinch directory overlay is handled within Map component */}
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1" suppressHydrationWarning>
        {typeof window !== 'undefined' && (
        <DynamicMap
          venues={filteredVenues as any}
          selectedVenue={selectedVenue}
          onVenueSelect={(v) => setSelectedVenue(v)}
        />
        )}
        {selectedVenue && (
          <VenueModal venue={selectedVenue} onClose={() => setSelectedVenue(null)} />
        )}
        <FilterDrawer open={drawerOpen} filters={advFilters} onFiltersChange={setAdvFilters} onClose={() => setDrawerOpen(false)} />
      </div>
    </div>
  );
}
