export interface Venue {
  id: number;
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  type: string;
  neighborhood: string;
  rating: number;
  pricing: string;
  hours: string;
  heroImage: string;
  musicGenre: string[];
  tags: string[];
  description: string;
  ambiance: string[];

  cuisine: string | null;
  dressCode?: string;
  waitTime?: string;
  shortDescription?: string;
  accolades?: string;
  yelpUrl?: string;
  resyUrl?: string;
  instagram?: string;
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

export interface MoodMapping {
  [key: string]: string[];
} 