import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { VenueRealtimeData, realtimeDataService } from '@/lib/realtimeData';

interface RealtimeState {
  // Real-time data
  realtimeData: Map<number, VenueRealtimeData>;
  isRealtimeEnabled: boolean;
  lastUpdate: Date | null;

  // Trending and featured
  trendingVenues: VenueRealtimeData[];
  quickEntryVenues: VenueRealtimeData[];

  // Actions
  startRealtimeUpdates: () => void;
  stopRealtimeUpdates: () => void;
  updateVenueData: (venueId: number, data: VenueRealtimeData) => void;
  refreshTrendingVenues: () => void;
  refreshQuickEntryVenues: () => void;

  // Getters
  getVenueRealtimeData: (venueId: number) => VenueRealtimeData | undefined;
  getAllRealtimeData: () => VenueRealtimeData[];
  getVenuesByCrowdLevel: (level: 'empty' | 'moderate' | 'busy' | 'packed') => VenueRealtimeData[];
}

export const useRealtimeStore = create<RealtimeState>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    realtimeData: new Map(),
    isRealtimeEnabled: false,
    lastUpdate: null,
    trendingVenues: [],
    quickEntryVenues: [],

    // Actions
    startRealtimeUpdates: () => {
      if (get().isRealtimeEnabled) return;

      // Initialize with current data
      const allData = realtimeDataService.getAllVenueData();
      const dataMap = new Map(allData.map(data => [data.venueId, data]));

      set({
        realtimeData: dataMap,
        isRealtimeEnabled: true,
        lastUpdate: new Date(),
      });

      // Start simulation
      realtimeDataService.startSimulation();

      // Subscribe to updates
      const unsubscribe = realtimeDataService.subscribe((data) => {
        get().updateVenueData(data.venueId, data);
      });

      // Store unsubscribe function for cleanup
      (window as any).__realtimeUnsubscribe = unsubscribe;

      // Refresh trending data
      get().refreshTrendingVenues();
      get().refreshQuickEntryVenues();
    },

    stopRealtimeUpdates: () => {
      if (!get().isRealtimeEnabled) return;

      realtimeDataService.stopSimulation();

      // Cleanup subscription
      if ((window as any).__realtimeUnsubscribe) {
        (window as any).__realtimeUnsubscribe();
        delete (window as any).__realtimeUnsubscribe;
      }

      set({ isRealtimeEnabled: false });
    },

    updateVenueData: (venueId, data) => {
      set((state) => {
        const newData = new Map(state.realtimeData);
        newData.set(venueId, { ...data, lastUpdated: new Date() });

        return {
          realtimeData: newData,
          lastUpdate: new Date(),
        };
      });

      // Refresh derived data
      get().refreshTrendingVenues();
      get().refreshQuickEntryVenues();
    },

    refreshTrendingVenues: () => {
      const trending = realtimeDataService.getTrendingVenues();
      set({ trendingVenues: trending });
    },

    refreshQuickEntryVenues: () => {
      const quickEntry = realtimeDataService.getQuickEntryVenues();
      set({ quickEntryVenues: quickEntry });
    },

    // Getters
    getVenueRealtimeData: (venueId) => {
      return get().realtimeData.get(venueId);
    },

    getAllRealtimeData: () => {
      return Array.from(get().realtimeData.values());
    },

    getVenuesByCrowdLevel: (level) => {
      return realtimeDataService.getVenuesByCrowdLevel(level);
    },
  }))
);

// Selectors for computed values
export const useRealtimeSelectors = () => {
  const store = useRealtimeStore();

  return {
    // Get venue with real-time data merged
    getVenueWithRealtimeData: (venue: any) => {
      const realtimeData = store.getVenueRealtimeData(venue.id);
      if (!realtimeData) return venue;

      return {
        ...venue,
        currentCrowdLevel: realtimeData.crowdLevel,
        currentWaitTime: realtimeData.waitTime,
        isOpen: realtimeData.isOpen,
        lastUpdated: realtimeData.lastUpdated,
        realtimeData,
      };
    },

    // Get all venues with real-time data
    getAllVenuesWithRealtimeData: (venues: any[]) => {
      return venues.map(venue => store.getVenueRealtimeData(venue.id)
        ? {
            ...venue,
            currentCrowdLevel: store.getVenueRealtimeData(venue.id)?.crowdLevel,
            currentWaitTime: store.getVenueRealtimeData(venue.id)?.waitTime,
            isOpen: store.getVenueRealtimeData(venue.id)?.isOpen,
            lastUpdated: store.getVenueRealtimeData(venue.id)?.lastUpdated,
            realtimeData: store.getVenueRealtimeData(venue.id),
          }
        : venue
      );
    },

    // Get crowd level statistics
    getCrowdLevelStats: () => {
      const allData = store.getAllRealtimeData();
      const stats = {
        empty: 0,
        moderate: 0,
        busy: 0,
        packed: 0,
        total: allData.length,
      };

      allData.forEach(data => {
        if (data.isOpen) {
          stats[data.crowdLevel]++;
        }
      });

      return stats;
    },

    // Get average wait time
    getAverageWaitTime: () => {
      const allData = store.getAllRealtimeData().filter(data => data.isOpen);
      if (allData.length === 0) return 0;

      const totalWaitTime = allData.reduce((sum, data) => sum + data.waitTime, 0);
      return Math.round(totalWaitTime / allData.length);
    },

    // Get busiest venues
    getBusiestVenues: (limit = 5) => {
      return store.getAllRealtimeData()
        .filter(data => data.isOpen)
        .sort((a, b) => b.currentOccupancy / b.capacity - a.currentOccupancy / a.capacity)
        .slice(0, limit);
    },

    // Get most available venues
    getMostAvailableVenues: (limit = 5) => {
      return store.getAllRealtimeData()
        .filter(data => data.isOpen)
        .sort((a, b) => a.currentOccupancy / a.capacity - b.currentOccupancy / b.capacity)
        .slice(0, limit);
    },
  };
};

// Auto-start real-time updates when store is first accessed
let realtimeStarted = false;
export const initializeRealtime = () => {
  if (!realtimeStarted && typeof window !== 'undefined') {
    realtimeStarted = true;
    useRealtimeStore.getState().startRealtimeUpdates();
  }
};

// Cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    useRealtimeStore.getState().stopRealtimeUpdates();
  });
}
