import React from 'react';
import { filterOptions } from '@/data/venues.js';

interface Props {
  open: boolean;
  filters: {
    neighborhood: string[];
    pricing: string[];
    musicGenre: string[];
  };
  onFiltersChange: (f: Props['filters']) => void;
  onClose: () => void;
}

export default function FilterDrawer({ open, filters, onFiltersChange, onClose }: Props) {
  if (!open) return null;

  const toggleValue = (key: keyof Props['filters'], value: string) => {
    const current = filters[key];
    const next = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
    onFiltersChange({ ...filters, [key]: next });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      {/* Drawer */}
      <div className="relative bg-white w-72 h-full shadow-lg p-4 overflow-y-auto" style={{ fontFamily: 'var(--font-body)' }}>
        <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-brand)', color: '#E53935' }}>Filters</h3>

        {/* Neighborhood */}
        <section className="mb-4">
          <h4 className="font-semibold mb-2">Neighborhood</h4>
          <div className="flex flex-wrap gap-2">
            {filterOptions.neighborhood.map((n) => (
              <button
                key={n}
                onClick={() => toggleValue('neighborhood', n)}
                className={`px-3 py-1 rounded-full border text-sm ${filters.neighborhood.includes(n) ? 'bg-[#E53935] text-white' : 'border-gray-300 text-gray-700'}`}
              >
                {n}
              </button>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-4">
          <h4 className="font-semibold mb-2">Pricing</h4>
          <div className="flex gap-2">
            {filterOptions.pricing.map((p) => (
              <button
                key={p}
                onClick={() => toggleValue('pricing', p)}
                className={`px-3 py-1 rounded-full border text-sm ${filters.pricing.includes(p) ? 'bg-[#E53935] text-white' : 'border-gray-300 text-gray-700'}`}
              >
                {p}
              </button>
            ))}
          </div>
        </section>

        {/* Music Genre */}
        <section className="mb-4">
          <h4 className="font-semibold mb-2">Music Genre</h4>
          <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
            {filterOptions.musicGenre.map((g) => (
              <button
                key={g}
                onClick={() => toggleValue('musicGenre', g)}
                className={`px-3 py-1 rounded-full border text-sm ${filters.musicGenre.includes(g) ? 'bg-[#E53935] text-white' : 'border-gray-300 text-gray-700'}`}
              >
                {g}
              </button>
            ))}
          </div>
        </section>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => onFiltersChange({ neighborhood: [], pricing: [], musicGenre: [] })}
            className="flex-1 border-2 border-[#E53935] text-[#E53935] py-2 rounded-full font-semibold text-sm"
          >
            Clear
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-[#E53935] text-white py-2 rounded-full font-semibold text-sm"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
} 