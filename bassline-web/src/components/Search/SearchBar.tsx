'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, MapPin, Filter, Star, Clock, Users, Music } from 'lucide-react';
import { useVenueStore, useVenueSelectors } from '@/stores/useVenueStore';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search venues, neighborhoods, music...",
  className = "max-w-lg"
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const { filters, setSearchText } = useVenueStore();
  const { getFilteredVenues } = useVenueSelectors();

  // Get all venues for suggestions
  const allVenues = getFilteredVenues();

  // Generate suggestions based on query
  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const searchTerm = query.toLowerCase();
    const filtered = allVenues
      .filter(venue =>
        venue.name.toLowerCase().includes(searchTerm) ||
        venue.neighborhood.toLowerCase().includes(searchTerm) ||
        venue.type.toLowerCase().includes(searchTerm) ||
        (venue.musicGenre && venue.musicGenre.some(genre =>
          genre.toLowerCase().includes(searchTerm)
        )) ||
        (venue.tags && venue.tags.some(tag =>
          tag.toLowerCase().includes(searchTerm)
        ))
      )
      .slice(0, 6); // Limit to 6 suggestions

    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
  }, [query, allVenues]);

  // Handle search input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSearchText(value);
    onSearch?.(value);
  };

  // Handle suggestion click
  const handleSuggestionClick = (venue: any) => {
    setQuery(venue.name);
    setSearchText(venue.name);
    setShowSuggestions(false);
    setIsFocused(false);
    onSearch?.(venue.name);
  };

  // Clear search
  const handleClear = () => {
    setQuery('');
    setSearchText('');
    setShowSuggestions(false);
    onSearch?.('');
    inputRef.current?.focus();
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      setIsFocused(false);
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <motion.div
          animate={{
            scale: isFocused ? 1.02 : 1,
            boxShadow: isFocused
              ? '0 0 0 3px rgba(229, 57, 53, 0.1)'
              : '0 0 0 0px rgba(229, 57, 53, 0)'
          }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 150)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full px-4 py-2.5 sm:py-3 pr-12 pl-12 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-brand-red transition-all duration-200 text-lg"
          />

          {/* Search Icon */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Search size={20} className="text-gray-400" />
          </div>

          {/* Clear/Filter Buttons */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
            {query && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                onClick={handleClear}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={16} className="text-gray-400 hover:text-gray-600" />
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto"
          >
            <div className="p-2">
              {suggestions.map((venue, index) => (
                <motion.button
                  key={venue.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleSuggestionClick(venue)}
                  className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    {/* Venue Image */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-200">
                      {venue.heroImage ? (
                        <img
                          src={venue.heroImage}
                          alt={venue.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                          <MapPin size={20} className="text-gray-500" />
                        </div>
                      )}
                    </div>

                    {/* Venue Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900 truncate">
                          {venue.name}
                        </h4>
                        <span className="px-2 py-0.5 bg-brand-red/10 text-brand-red text-xs rounded-full">
                          {venue.type}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-gray-600 mb-1">
                        <div className="flex items-center gap-1">
                          <MapPin size={12} />
                          <span className="truncate">{venue.neighborhood}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star size={12} className="fill-yellow-400 text-yellow-400" />
                          <span>{venue.rating}</span>
                        </div>
                      </div>

                      {/* Music Genres */}
                      {venue.musicGenre && venue.musicGenre.length > 0 && (
                        <div className="flex items-center gap-1">
                          <Music size={12} className="text-gray-400" />
                          <div className="flex gap-1">
                            {venue.musicGenre.slice(0, 2).map((genre: string) => (
                              <span key={genre} className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded">
                                {genre}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Show more results hint */}
            {suggestions.length >= 6 && (
              <div className="p-3 border-t border-gray-100 text-center text-sm text-gray-500">
                Keep typing to see more results...
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Stats */}
      {query && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -bottom-8 left-0 text-sm text-gray-500"
        >
          {allVenues.filter(v =>
            v.name.toLowerCase().includes(query.toLowerCase()) ||
            v.neighborhood.toLowerCase().includes(query.toLowerCase())
          ).length} venues found
        </motion.div>
      )}
    </div>
  );
};

export default SearchBar;
