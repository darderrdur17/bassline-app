// Real-time data simulation service
// This simulates live crowd levels, wait times, and venue status updates

export interface VenueRealtimeData {
  venueId: number;
  crowdLevel: 'empty' | 'moderate' | 'busy' | 'packed';
  waitTime: number; // minutes
  isOpen: boolean;
  capacity: number;
  currentOccupancy: number;
  lastUpdated: Date;
  trend: 'increasing' | 'decreasing' | 'stable';
  temperature?: number; // Celsius
  noiseLevel?: 'quiet' | 'moderate' | 'loud';
}

// Mock real-time data generator
class RealtimeDataService {
  private data: Map<number, VenueRealtimeData> = new Map();
  private subscribers: Set<(data: VenueRealtimeData) => void> = new Set();
  private intervalId: NodeJS.Timeout | null = null;
  private isRunning = false;

  constructor() {
    this.initializeMockData();
  }

  // Initialize with realistic mock data
  private initializeMockData() {
    const baseData: Omit<VenueRealtimeData, 'venueId'>[] = [
      // Bars - typically busier in evenings
      { crowdLevel: 'moderate', waitTime: 5, isOpen: true, capacity: 80, currentOccupancy: 45, lastUpdated: new Date(), trend: 'stable' },
      { crowdLevel: 'busy', waitTime: 15, isOpen: true, capacity: 120, currentOccupancy: 95, lastUpdated: new Date(), trend: 'increasing' },
      { crowdLevel: 'packed', waitTime: 25, isOpen: true, capacity: 60, currentOccupancy: 58, lastUpdated: new Date(), trend: 'increasing' },
      { crowdLevel: 'empty', waitTime: 0, isOpen: true, capacity: 40, currentOccupancy: 8, lastUpdated: new Date(), trend: 'decreasing' },
      { crowdLevel: 'moderate', waitTime: 8, isOpen: true, capacity: 90, currentOccupancy: 55, lastUpdated: new Date(), trend: 'stable' },

      // Restaurants - lunch/dinner crowds
      { crowdLevel: 'busy', waitTime: 20, isOpen: true, capacity: 100, currentOccupancy: 85, lastUpdated: new Date(), trend: 'increasing' },
      { crowdLevel: 'moderate', waitTime: 10, isOpen: true, capacity: 70, currentOccupancy: 40, lastUpdated: new Date(), trend: 'stable' },
      { crowdLevel: 'empty', waitTime: 0, isOpen: true, capacity: 50, currentOccupancy: 12, lastUpdated: new Date(), trend: 'decreasing' },

      // Clubs - busy at night, empty during day
      { crowdLevel: 'packed', waitTime: 30, isOpen: true, capacity: 200, currentOccupancy: 180, lastUpdated: new Date(), trend: 'increasing' },
      { crowdLevel: 'busy', waitTime: 15, isOpen: true, capacity: 150, currentOccupancy: 120, lastUpdated: new Date(), trend: 'stable' },
      { crowdLevel: 'moderate', waitTime: 5, isOpen: true, capacity: 100, currentOccupancy: 60, lastUpdated: new Date(), trend: 'increasing' },

      // Lounges - consistent moderate crowds
      { crowdLevel: 'moderate', waitTime: 8, isOpen: true, capacity: 60, currentOccupancy: 35, lastUpdated: new Date(), trend: 'stable' },
      { crowdLevel: 'busy', waitTime: 12, isOpen: true, capacity: 45, currentOccupancy: 38, lastUpdated: new Date(), trend: 'stable' },

      // Cafes - morning/afternoon crowds
      { crowdLevel: 'moderate', waitTime: 3, isOpen: true, capacity: 30, currentOccupancy: 18, lastUpdated: new Date(), trend: 'stable' },
      { crowdLevel: 'empty', waitTime: 0, isOpen: true, capacity: 25, currentOccupancy: 5, lastUpdated: new Date(), trend: 'decreasing' },
    ];

    // Assign to venue IDs (simulating 1-15 venues)
    baseData.forEach((data, index) => {
      this.data.set(index + 1, {
        venueId: index + 1,
        ...data,
        temperature: 20 + Math.random() * 10, // 20-30°C
        noiseLevel: this.getRandomNoiseLevel(),
      });
    });
  }

  private getRandomNoiseLevel(): 'quiet' | 'moderate' | 'loud' {
    const levels = ['quiet', 'moderate', 'loud'];
    return levels[Math.floor(Math.random() * levels.length)] as any;
  }

  // Get current data for a venue
  getVenueData(venueId: number): VenueRealtimeData | undefined {
    return this.data.get(venueId);
  }

  // Get all venue data
  getAllVenueData(): VenueRealtimeData[] {
    return Array.from(this.data.values());
  }

  // Subscribe to real-time updates
  subscribe(callback: (data: VenueRealtimeData) => void): () => void {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  // Start real-time simulation
  startSimulation() {
    if (this.isRunning) return;

    this.isRunning = true;
    this.intervalId = setInterval(() => {
      this.updateRealtimeData();
    }, 30000); // Update every 30 seconds
  }

  // Stop simulation
  stopSimulation() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
  }

  // Simulate realistic crowd changes based on time and venue type
  private updateRealtimeData() {
    const now = new Date();
    const hour = now.getHours();
    const isWeekend = now.getDay() === 0 || now.getDay() === 6;

    this.data.forEach((venueData, venueId) => {
      const oldData = { ...venueData };
      this.simulateVenueUpdate(venueData, hour, isWeekend);

      // Notify subscribers if data changed
      if (this.dataChanged(oldData, venueData)) {
        this.subscribers.forEach(callback => callback(venueData));
      }
    });
  }

  private simulateVenueUpdate(venueData: VenueRealtimeData, hour: number, isWeekend: boolean) {
    const venueType = this.getVenueType(venueData.venueId);

    // Base crowd multiplier based on time of day
    let timeMultiplier = 1;
    if (hour >= 22 || hour <= 2) timeMultiplier = 1.3; // Late night
    else if (hour >= 18 && hour <= 21) timeMultiplier = 1.2; // Dinner time
    else if (hour >= 11 && hour <= 14) timeMultiplier = 1.1; // Lunch time
    else if (hour >= 6 && hour <= 10) timeMultiplier = 0.7; // Morning
    else timeMultiplier = 0.8; // Off-peak

    if (isWeekend) timeMultiplier *= 1.2;

    // Venue type specific adjustments
    let typeMultiplier = 1;
    switch (venueType) {
      case 'Club': typeMultiplier = hour >= 22 || hour <= 2 ? 1.5 : 0.3; break;
      case 'Bar': typeMultiplier = hour >= 18 ? 1.2 : 0.6; break;
      case 'Restaurant': typeMultiplier = (hour >= 18 && hour <= 21) || (hour >= 11 && hour <= 14) ? 1.3 : 0.7; break;
      case 'Lounge': typeMultiplier = hour >= 17 ? 1.1 : 0.8; break;
      case 'Cafe': typeMultiplier = hour >= 7 && hour <= 18 ? 1.0 : 0.4; break;
    }

    const totalMultiplier = timeMultiplier * typeMultiplier;

    // Simulate occupancy changes
    const baseOccupancy = venueData.capacity * (0.3 + Math.random() * 0.6); // 30-90% base
    let newOccupancy = Math.round(baseOccupancy * totalMultiplier);

    // Add some randomness
    newOccupancy += Math.round((Math.random() - 0.5) * 20);
    newOccupancy = Math.max(0, Math.min(venueData.capacity, newOccupancy));

    // Calculate crowd level
    const occupancyRate = newOccupancy / venueData.capacity;
    let crowdLevel: 'empty' | 'moderate' | 'busy' | 'packed';
    let waitTime: number;

    if (occupancyRate < 0.3) {
      crowdLevel = 'empty';
      waitTime = 0;
    } else if (occupancyRate < 0.6) {
      crowdLevel = 'moderate';
      waitTime = Math.round(occupancyRate * 10);
    } else if (occupancyRate < 0.85) {
      crowdLevel = 'busy';
      waitTime = Math.round(occupancyRate * 15);
    } else {
      crowdLevel = 'packed';
      waitTime = Math.round(occupancyRate * 25);
    }

    // Determine trend
    const occupancyChange = newOccupancy - venueData.currentOccupancy;
    let trend: 'increasing' | 'decreasing' | 'stable';
    if (Math.abs(occupancyChange) < 5) trend = 'stable';
    else trend = occupancyChange > 0 ? 'increasing' : 'decreasing';

    // Update venue data
    venueData.currentOccupancy = newOccupancy;
    venueData.crowdLevel = crowdLevel;
    venueData.waitTime = waitTime;
    venueData.lastUpdated = new Date();
    venueData.trend = trend;
    venueData.temperature = 20 + Math.random() * 10;
    venueData.noiseLevel = this.getRandomNoiseLevel();

    // Some venues close early/late
    if (venueType === 'Restaurant' && hour > 22) {
      venueData.isOpen = false;
    } else if (venueType === 'Cafe' && (hour < 6 || hour > 20)) {
      venueData.isOpen = false;
    } else {
      venueData.isOpen = true;
    }
  }

  private getVenueType(venueId: number): string {
    // Simplified venue type mapping (would come from actual venue data)
    if (venueId <= 5) return 'Bar';
    if (venueId <= 8) return 'Restaurant';
    if (venueId <= 11) return 'Club';
    if (venueId <= 13) return 'Lounge';
    return 'Cafe';
  }

  private dataChanged(oldData: VenueRealtimeData, newData: VenueRealtimeData): boolean {
    return (
      oldData.crowdLevel !== newData.crowdLevel ||
      oldData.waitTime !== newData.waitTime ||
      oldData.isOpen !== newData.isOpen ||
      oldData.currentOccupancy !== newData.currentOccupancy ||
      oldData.trend !== newData.trend
    );
  }

  // Get trending venues (most increasing crowd levels)
  getTrendingVenues(): VenueRealtimeData[] {
    return this.getAllVenueData()
      .filter(data => data.trend === 'increasing' && data.isOpen)
      .sort((a, b) => b.currentOccupancy / b.capacity - a.currentOccupancy / a.capacity)
      .slice(0, 5);
  }

  // Get venues by crowd level
  getVenuesByCrowdLevel(level: 'empty' | 'moderate' | 'busy' | 'packed'): VenueRealtimeData[] {
    return this.getAllVenueData().filter(data => data.crowdLevel === level && data.isOpen);
  }

  // Get venues with shortest wait times
  getQuickEntryVenues(): VenueRealtimeData[] {
    return this.getAllVenueData()
      .filter(data => data.isOpen && data.waitTime <= 10)
      .sort((a, b) => a.waitTime - b.waitTime)
      .slice(0, 5);
  }
}

// Export singleton instance
export const realtimeDataService = new RealtimeDataService();
