import React, { useMemo, useRef, useState } from 'react';
import { Venue } from '@/types/venue';

interface MapSearchProps {
  venues: Venue[];
  query: string;
  onQueryChange: (query: string) => void;
  onVenueSelect: (venue: Venue) => void;
  onHoverVenue?: (venueId: number | null) => void;
}

const MapSearch: React.FC<MapSearchProps> = ({
  venues,
  query,
  onQueryChange,
  onVenueSelect,
  onHoverVenue,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const hasQuery = query.trim().length > 0;

  const results = useMemo(() => {
    if (!hasQuery) return [];
    return venues.slice(0, 15); // cap list to avoid long dropdowns
  }, [venues, hasQuery]);

  const handleSelect = (venue: Venue) => {
    onVenueSelect(venue);
    onQueryChange(venue.name);
    setIsFocused(false);
    setHighlightedIndex(-1);
    onHoverVenue?.(null);
    inputRef.current?.blur();
  };

  const handleBlur = () => {
    // Defer blur to allow click selection
    setTimeout(() => setIsFocused(false), 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!hasQuery) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % Math.max(results.length, 1));
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        results.length === 0 ? -1 : (prev - 1 + results.length) % results.length
      );
      return;
    }

    if (e.key === 'Enter') {
      if (highlightedIndex >= 0 && highlightedIndex < results.length) {
        handleSelect(results[highlightedIndex]);
      }
      return;
    }

    if (e.key === 'Escape') {
      setIsFocused(false);
      setHighlightedIndex(-1);
      inputRef.current?.blur();
      return;
    }
  };

  return (
    <div className="absolute top-4 left-4 z-20 w-80 max-w-[92vw]">
      <div className="bg-white/95 backdrop-blur shadow-xl rounded-xl border border-ui-border overflow-hidden">
        <label className="sr-only" htmlFor="map-search">
          Search venues on map
        </label>
        <div className="flex items-center px-3">
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
            />
          </svg>
          <input
            id="map-search"
            type="text"
            value={query}
            ref={inputRef}
            onChange={(e) => onQueryChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder="Search venues on map..."
            className="flex-1 bg-transparent px-3 py-3 text-sm text-gray-900 placeholder-gray-500 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => onQueryChange('')}
              aria-label="Clear search"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              ×
            </button>
          )}
        </div>
        <div className="px-3 pb-3 text-xs text-gray-500 flex justify-between">
          <span>{hasQuery ? `${venues.length} result${venues.length === 1 ? '' : 's'}` : 'Search by name, neighborhood, type'}</span>
          {hasQuery && <span>Click a result to focus</span>}
        </div>
      </div>

      {hasQuery && isFocused && (
        <div className="mt-2 bg-white/95 backdrop-blur shadow-xl rounded-xl border border-ui-border overflow-hidden">
          {results.length === 0 && (
            <div className="px-4 py-3 text-sm text-gray-600" aria-live="polite">
              No results found
            </div>
          )}
          {results.length > 0 && (
            <ul
              className="divide-y divide-gray-100 max-h-72 overflow-auto"
              role="listbox"
              aria-label="Map search results"
            >
              {results.map((venue, index) => (
                <li
                  key={venue.id}
                  role="option"
                  aria-selected={highlightedIndex === index}
                  className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                    highlightedIndex === index ? 'bg-gray-100' : ''
                  }`}
                  onMouseEnter={() => onHoverVenue?.(venue.id)}
                  onMouseLeave={() => onHoverVenue?.(null)}
                  onClick={() => handleSelect(venue)}
                  onMouseDown={(e) => e.preventDefault()}
                  onFocus={() => setHighlightedIndex(index)}
                >
                  <p className="font-semibold text-gray-900 leading-tight">{venue.name}</p>
                  <p className="text-xs text-gray-600">
                    {venue.neighborhood} · {venue.type}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default MapSearch;

