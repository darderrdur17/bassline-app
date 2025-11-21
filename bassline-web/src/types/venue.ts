export interface Coordinates {
  latitude: number;
  longitude: number;
}

// Lightweight venue data for fast initial map loading
export interface VenueLight {
  id: number;
  name: string;
  type: string;
  neighborhood: string;
  rating: number;
  pricing: string;
  coordinates: Coordinates;
  currentCrowdLevel?: 'empty' | 'moderate' | 'busy' | 'packed';
}

export interface VenueHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
  notes?: string;
}

export interface Venue {
  id: number;
  name: string;
  type: string; // Keeping flexible for existing data like "Wine Bar", "Lounge", etc.
  neighborhood: string;
  rating: number;
  pricing: '$$' | '$$$' | '$$$$' | '$';
  averageDrinkPrice?: string;

  // Hours - enhanced structure
  hours: VenueHours | string; // Support both structured and legacy string format

  // Images
  heroImage: string;
  gallery?: string[];

  // Descriptions
  description?: string;
  shortDescription?: string;

  // Categories and tags
  tags: string[];
  musicGenre?: string[];
  ambiance?: string[];

  // Legacy fields (keeping for compatibility)
  cuisine?: string | null;
  dressCode?: string;
  waitTime?: string;
  accolades?: string;
  yelpUrl?: string;
  resyUrl?: string;
  instagram?: string;
  recommendedDrinks?: string[];
  recommendations?: string[];
  goodToKnow?: string;
  whereToGoIf?: string;
  openPast2AM?: boolean;
  crowd?: string | string[];
  estimatedUber?: string;

  // Location
  coordinates: Coordinates;
  address?: string;

  // Business info
  phone?: string;
  website?: string;

  // Venue features
  hasOutdoorSeating?: boolean;
  hasLiveMusic?: boolean;
  hasDancing?: boolean;
  hasHappyHour?: boolean;
  hasReservations?: boolean;
  ageRestriction?: string;

  // Real-time data (would come from API)
  currentCrowdLevel?: 'empty' | 'moderate' | 'busy' | 'packed';
  currentWaitTime?: number; // in minutes
  isOpen?: boolean;
  lastUpdated?: Date;

  // User-generated content
  userRating?: number;
  userReviews?: number;

  // Internal use
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface VenueFilters {
  searchText: string;
  types: string[];
  neighborhoods: string[];
  pricing: string[];
  musicGenres: string[];
  minRating: number;
  crowdLevels: string[];
  features: string[];
  hasOutdoorSeating?: boolean;
  hasLiveMusic?: boolean;
  hasDancing?: boolean;
  hasHappyHour?: boolean;
  isOpenNow?: boolean;
}

export interface VenueStats {
  totalVenues: number;
  averageRating: number;
  venueTypes: string[];
  neighborhoods: string[];
  priceRanges: string[];
  musicGenres: string[];
}

export interface MoodMapping {
  [key: string]: string[]; // venue names
}

export interface VenueCluster {
  id: string;
  coordinates: Coordinates;
  venues: Venue[];
  count: number;
  averageRating: number;
  types: string[];
}

export interface MapViewport {
  latitude: number;
  longitude: number;
  zoom: number;
  bearing?: number;
  pitch?: number;
}

export interface VenueSearchResult {
  venue: Venue;
  relevanceScore: number;
  matchedFields: string[];
}

export interface VenueRecommendation {
  venue: Venue;
  reason: string;
  confidence: number;
}

// Real-time venue status (would come from API)
export interface VenueStatus {
  venueId: number;
  crowdLevel: 'empty' | 'moderate' | 'busy' | 'packed';
  waitTime: number; // minutes
  isOpen: boolean;
  lastUpdated: Date;
  capacity?: number;
  currentOccupancy?: number;
}

// User preferences for recommendations
export interface UserPreferences {
  favoriteTypes: string[];
  favoriteNeighborhoods: string[];
  preferredPricing: string[];
  preferredMusicGenres: string[];
  preferredAmbiance: string[];
  dietaryRestrictions?: string[];
  accessibilityNeeds?: string[];
}

// Social features
export interface VenueCheckIn {
  id: string;
  userId: string;
  venueId: number;
  timestamp: Date;
  mood?: string;
  rating?: number;
  comment?: string;
  photos?: string[];
}

export interface VenueReview {
  id: string;
  userId: string;
  venueId: number;
  rating: number;
  comment: string;
  photos?: string[];
  timestamp: Date;
  helpful: number;
  verified: boolean;
}

export interface FilterOptions {
  venueType: string[];
  pricing: string[];
  musicGenre: string[];
  ambiance: string[];
  dressCode: string[];
  neighborhood: string[];
  hours: string[];
  ambianceDensity: string[];
  distance: string[];
} 