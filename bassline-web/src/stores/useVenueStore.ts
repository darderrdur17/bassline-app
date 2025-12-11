import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Venue } from '@/types/venue';
import { VenueRealtimeData } from '@/lib/realtimeData';
import { venueCoordinates } from '@/data/venueCoordinates';

interface VenueFilters {
  searchText: string;
  types: string[];
  neighborhoods: string[];
  pricing: string[];
  musicGenres: string[];
  minRating: number;
  crowdLevels: string[];
  waitTimes: string[]; // 'short' (0-5min), 'medium' (5-15min), 'long' (15+min)
  noiseLevels: string[]; // 'quiet', 'moderate', 'loud'
  atmospheres: string[];
  features: string[]; // 'outdoor', 'live-music', 'dancing', 'happy-hour', 'reservations'
  isOpenNow?: boolean;
  maxWaitTime?: number;
  hours: string[];
}

interface VenueState {
  // Data
  venues: Venue[];
  filteredVenues: Venue[];
  selectedVenue: Venue | null;
  favoriteVenues: string[];

  // UI State
  isLoading: boolean;
  error: string | null;

  // Filters
  filters: VenueFilters;
  searchQuery: string;

  // Map State
  mapCenter: [number, number];
  mapZoom: number;
  mapFocusVenueId: number | null;

  // Actions
  setVenues: (venues: Venue[]) => void;
  setFilteredVenues: (venues: Venue[]) => void;
  setSelectedVenue: (venue: Venue | null) => void;
  toggleFavorite: (venueId: string) => void;

  // Filter Actions
  setSearchText: (text: string) => void;
  setSearchQuery: (query: string) => void;
  setTypes: (types: string[]) => void;
  setNeighborhoods: (neighborhoods: string[]) => void;
  setPricing: (pricing: string[]) => void;
  setMusicGenres: (genres: string[]) => void;
  setMinRating: (rating: number) => void;
  setCrowdLevels: (levels: string[]) => void;
  setWaitTimes: (waitTimes: string[]) => void;
  setNoiseLevels: (noiseLevels: string[]) => void;
  setAtmospheres: (atmospheres: string[]) => void;
  setFeatures: (features: string[]) => void;
  setIsOpenNow: (isOpen: boolean | undefined) => void;
  setMaxWaitTime: (maxWait: number | undefined) => void;
  setHours: (hours: string[]) => void;
  resetFilters: () => void;

  // Map Actions
  setMapCenter: (center: [number, number]) => void;
  setMapZoom: (zoom: number) => void;
  setMapFocusVenueId: (venueId: number | null) => void;

  // UI Actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// Build a lookup map for accurate coordinates
const coordinateMap = new Map<number, { latitude: number; longitude: number }>(
  venueCoordinates.map((v) => [v.id, v.coordinates])
);

const applyAccurateCoordinates = (venues: Venue[]): Venue[] =>
  venues.map((venue) => {
    const coordinates = coordinateMap.get(venue.id);
    if (!coordinates) return venue;
    return {
      ...venue,
      coordinates,
    };
  });

const defaultFilters: VenueFilters = {
  searchText: '',
  types: [],
  neighborhoods: [],
  pricing: [],
  musicGenres: [],
  minRating: 0,
  crowdLevels: [],
  waitTimes: [],
  noiseLevels: [],
  atmospheres: [],
  features: [],
  isOpenNow: undefined,
  maxWaitTime: undefined,
  hours: [],
};

export const useVenueStore = create<VenueState>()(
  persist(
    (set, get) => ({
      // Initial state
      venues: [],
      filteredVenues: [],
      selectedVenue: null,
      favoriteVenues: [],

      isLoading: false,
      error: null,

      filters: defaultFilters,
      searchQuery: '',

      mapCenter: [37.7749, -122.4194], // San Francisco center
      mapZoom: 13,
      mapFocusVenueId: null,

      // Actions
      setVenues: (venues) => {
        const withAccurateCoords = applyAccurateCoordinates(venues);
        set({ venues: withAccurateCoords, filteredVenues: withAccurateCoords });
      },

      setFilteredVenues: (venues) => set({ filteredVenues: venues }),

      setSelectedVenue: (venue) => set({ selectedVenue: venue }),

      toggleFavorite: (venueId) => {
        const { favoriteVenues } = get();
        const newFavorites = favoriteVenues.includes(venueId)
          ? favoriteVenues.filter(id => id !== venueId)
          : [...favoriteVenues, venueId];
        set({ favoriteVenues: newFavorites });
      },

      // Filter Actions
      setSearchText: (searchText) =>
        set((state) => ({
          filters: { ...state.filters, searchText },
          searchQuery: searchText,
        })),

      setSearchQuery: (searchQuery) =>
        set((state) => ({
          searchQuery,
          filters: { ...state.filters, searchText: searchQuery },
        })),

      setTypes: (types) =>
        set((state) => ({
          filters: { ...state.filters, types },
        })),

      setNeighborhoods: (neighborhoods) =>
        set((state) => ({
          filters: { ...state.filters, neighborhoods },
        })),

      setPricing: (pricing) =>
        set((state) => ({
          filters: { ...state.filters, pricing },
        })),

      setMusicGenres: (musicGenres) =>
        set((state) => ({
          filters: { ...state.filters, musicGenres },
        })),

      setMinRating: (minRating) =>
        set((state) => ({
          filters: { ...state.filters, minRating },
        })),

      setCrowdLevels: (crowdLevels) =>
        set((state) => ({
          filters: { ...state.filters, crowdLevels },
        })),

      setWaitTimes: (waitTimes) =>
        set((state) => ({
          filters: { ...state.filters, waitTimes },
        })),

      setNoiseLevels: (noiseLevels) =>
        set((state) => ({
          filters: { ...state.filters, noiseLevels },
        })),

      setAtmospheres: (atmospheres) =>
        set((state) => ({
          filters: { ...state.filters, atmospheres },
        })),

      setFeatures: (features) =>
        set((state) => ({
          filters: { ...state.filters, features },
        })),

      setIsOpenNow: (isOpenNow) =>
        set((state) => ({
          filters: { ...state.filters, isOpenNow },
        })),

      setMaxWaitTime: (maxWaitTime) =>
        set((state) => ({
          filters: { ...state.filters, maxWaitTime },
        })),

      setHours: (hours) =>
        set((state) => ({
          filters: { ...state.filters, hours },
        })),

      resetFilters: () =>
        set({
          filters: defaultFilters,
          filteredVenues: get().venues,
          searchQuery: '',
        }),

      // Map Actions
      setMapCenter: (mapCenter) => set({ mapCenter }),
      setMapZoom: (mapZoom) => set({ mapZoom }),
      setMapFocusVenueId: (mapFocusVenueId) => set({ mapFocusVenueId }),

      // UI Actions
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'bassline-venue-store',
      partialize: (state) => ({
        favoriteVenues: state.favoriteVenues,
        filters: state.filters,
        searchQuery: state.searchQuery,
        mapCenter: state.mapCenter,
        mapZoom: state.mapZoom,
      }),
      version: 1,
    }
  )
);

// Selectors for computed values
export const useVenueSelectors = () => {
  const store = useVenueStore();

  return {
    // Computed filtered venues with real-time data
    getFilteredVenues: (realtimeData?: Map<number, VenueRealtimeData>) => {
      const { venues, filters } = store;

      return venues.filter((venue) => {
        // Search text filter
        if (filters.searchText.trim()) {
          const searchTerm = filters.searchText.toLowerCase();
          const matchesSearch =
            venue.name.toLowerCase().includes(searchTerm) ||
            venue.neighborhood.toLowerCase().includes(searchTerm) ||
            venue.type.toLowerCase().includes(searchTerm) ||
            venue.description?.toLowerCase().includes(searchTerm) ||
            venue.musicGenre?.some(genre => genre.toLowerCase().includes(searchTerm)) ||
            venue.tags?.some(tag => tag.toLowerCase().includes(searchTerm));

          if (!matchesSearch) return false;
        }

        // Type filter
        if (filters.types.length > 0 && !filters.types.includes(venue.type)) {
          return false;
        }

        // Neighborhood filter
        if (filters.neighborhoods.length > 0 && !filters.neighborhoods.includes(venue.neighborhood)) {
          return false;
        }

        // Pricing filter
        if (filters.pricing.length > 0 && !filters.pricing.includes(venue.pricing)) {
          return false;
        }

        // Music genre filter
        if (filters.musicGenres.length > 0) {
          const hasMatchingGenre = venue.musicGenre?.some(genre =>
            filters.musicGenres.includes(genre)
          );
          if (!hasMatchingGenre) return false;
        }

        // Rating filter
        if (venue.rating < filters.minRating) {
          return false;
        }

        // Get real-time data for this venue
        const venueRealtimeData = realtimeData?.get(venue.id);

        // Crowd level filter
        if (filters.crowdLevels.length > 0) {
          const crowdLevel = venueRealtimeData?.crowdLevel || venue.currentCrowdLevel;
          if (!crowdLevel || !filters.crowdLevels.includes(crowdLevel)) {
            return false;
          }
        }

        // Wait time filter
        if (filters.waitTimes.length > 0) {
          const waitTime = venueRealtimeData?.waitTime ?? 0;
          const waitCategory = waitTime <= 5 ? 'short' : waitTime <= 15 ? 'medium' : 'long';
          if (!filters.waitTimes.includes(waitCategory)) {
            return false;
          }
        }

        // Max wait time filter
        if (filters.maxWaitTime !== undefined) {
          const waitTime = venueRealtimeData?.waitTime ?? 0;
          if (waitTime > filters.maxWaitTime) {
            return false;
          }
        }

        // Noise level filter
        if (filters.noiseLevels.length > 0) {
          const noiseLevel = venueRealtimeData?.noiseLevel;
          if (!noiseLevel || !filters.noiseLevels.includes(noiseLevel)) {
            return false;
          }
        }

        // Atmosphere filter
        if (filters.atmospheres.length > 0) {
          const venueAtmosphere = venue.ambiance || [];
          const hasMatchingAtmosphere = filters.atmospheres.some(atm =>
            venueAtmosphere.some(va => va.toLowerCase().includes(atm.toLowerCase()))
          );
          if (!hasMatchingAtmosphere) {
            return false;
          }
        }

        // Features filter
        if (filters.features.length > 0) {
          const venueFeatures: string[] = [];
          if (venue.hasOutdoorSeating) venueFeatures.push('outdoor');
          if (venue.hasLiveMusic) venueFeatures.push('live-music');
          if (venue.hasDancing) venueFeatures.push('dancing');
          if (venue.hasHappyHour) venueFeatures.push('happy-hour');
          if (venue.hasReservations) venueFeatures.push('reservations');

          const hasMatchingFeature = filters.features.some(feature =>
            venueFeatures.includes(feature)
          );
          if (!hasMatchingFeature) {
            return false;
          }
        }

        // Open now filter
        if (filters.isOpenNow === true) {
          const isOpen = venueRealtimeData?.isOpen ?? true; // Default to open if no real-time data
          if (!isOpen) {
            return false;
          }
        }

        return true;
      });
    },

    // Get venue by ID
    getVenueById: (id: number) => {
      return store.venues.find(venue => venue.id === id);
    },

    // Check if venue is favorite
    isFavorite: (venueId: string) => {
      return store.favoriteVenues.includes(venueId);
    },

    // Get favorite venues
    getFavoriteVenues: () => {
      return store.venues.filter(venue =>
        store.favoriteVenues.includes(venue.id.toString())
      );
    },

    // Get venue statistics
    getStats: () => {
      const { venues } = store;
      return {
        totalVenues: venues.length,
        averageRating: venues.reduce((sum, v) => sum + v.rating, 0) / venues.length,
        venueTypes: [...new Set(venues.map(v => v.type))],
        neighborhoods: [...new Set(venues.map(v => v.neighborhood))],
      };
    },
  };
};

// Simple selector hooks for commonly used fields
export const useSearchQuery = () => useVenueStore((state) => state.searchQuery);
