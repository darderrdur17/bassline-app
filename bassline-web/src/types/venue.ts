export interface Venue {
  id: number;
  name: string;
  pricing: string;
  ambiance: string[];
  musicGenre: string[];
  food: string | null;
  dressCode: string;
  crowd: string | string[];
  optimalTime: string;
  recommendedDrinks: string[];
  tags: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  type: 'Bar' | 'Restaurant' | 'Lounge' | 'Club';
  neighborhood: string;
  rating: number;
  crowdLevel: 'empty' | 'moderate' | 'busy' | 'packed';
  waitTime: number;
  estimatedUber: string;
  hours: string;
  heroImage: string;
  description: string;
  yelpUrl?: string;
  resyUrl?: string;
  instagram?: string;
  gallery?: string[];
  cuisine?: string;
  shortDescription?: string;
  accolades?: string;
}

export interface FilterOptions {
  venueType: string[];
  pricing: string[];
  musicGenre: string[];
  ambiance: string[];
  crowd: string[];
  dressCode: string[];
  neighborhood: string[];
  hours: string[];
  ambianceDensity: string[];
  crowdScene: string[];
  distance: string[];
}

export interface MoodMapping {
  [key: string]: string[];
} 