import { Venue, FilterOptions, MoodMapping } from '@/types/venue';

export const venues: Venue[] = [
  {
    id: 1,
    name: "Bar Part Time",
    coordinates: {
      latitude: 37.7599,
      longitude: -122.4148,
    },
    type: "Bar",
    neighborhood: "Mission", 
    rating: 4.3,
    pricing: "$$",
    hours: "5 PM - 2 AM",
    heroImage: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400",
    musicGenre: ["House", "Disco"],
    tags: ["listening bar", "dance floor", "happy hour", "vinyl"],
    description: "Darklit red lights with vinyl listening bar and dance floor",
    ambiance: ["Darklit", "Red Lights", "Incense"],
    cuisine: "Natural wine, bar snacks, pop-up food partners",
    dressCode: "Casual",
    shortDescription: "Hip natural wine bar with a vinyl listening vibe, DJ sets, and a lively dance floor.",
    accolades: "Featured in SF nightlife guides and 'best bars' lists for music and wine.",
  },
  {
    id: 2, 
    name: "Key Klub",
    coordinates: {
      latitude: 37.7849,
      longitude: -122.4094,
    },
    type: "Restaurant",
    neighborhood: "Mission",
    rating: 4.1,
    pricing: "$$", 
    hours: "6 PM - 12 AM",
    heroImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
    musicGenre: ["Mixed"],
    tags: ["dinner", "drinks", "young crowd"],
    description: "Hip Gen Z spot with New American food and drinks",
    ambiance: ["Darklit", "Red Lights"],
    cuisine: "New American, cocktails, wine",
    dressCode: "Casual",
    shortDescription: "Hip Gen Z spot with New American food and drinks",
    accolades: "Featured in SF nightlife guides and 'best bars' lists for music and wine.",
  },
  {
    id: 3,
    name: "Verjus", 
    coordinates: {
      latitude: 37.7949,
      longitude: -122.3994,
    },
    type: "Restaurant",
    neighborhood: "SOMA",
    rating: 4.5,
    pricing: "$$$",
    hours: "5:30 PM - 10 PM", 
    heroImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
    musicGenre: ["Jazz"],
    tags: ["wine", "french", "date night"],
    description: "Sophisticated French dining with extensive wine selection",
    ambiance: ["Darklit"],
    cuisine: "French cuisine, wine, cocktails",
    dressCode: "Casual",
    shortDescription: "Sophisticated French dining with extensive wine selection",
    accolades: "Featured in SF nightlife guides and 'best bars' lists for music and wine.",
  }
];

// Filter options based on venue data
export const filterOptions: FilterOptions = {
  venueType: ['Bar', 'Restaurant', 'Club'],
  pricing: ['$', '$$', '$$$'],
  musicGenre: ['House', 'Jazz', 'Electronic', 'Classical', 'Mixed', 'Lo-fi', 'Hip-Hop', 'Soul', 'Funk', 'Disco', 'Synthwave'],
  ambiance: ['Darklit', 'Cozy', 'Rooftop', 'Minimalist', 'Futuristic', 'Red Lights'],
  dressCode: ['Casual', 'Smart Casual', 'Trendy', 'Upscale'],
  neighborhood: ['Mission', 'SOMA', 'Castro', 'Financial District'],
  hours: ['Open Now', 'Past 2 AM', '24 Hours'],
  ambianceDensity: ['Chill', 'Lively', 'High-energy', 'VIP'],
  distance: ['<0.5 mi', '<1 mi', '<2 mi', '<5 mi'],
};

// Mood-based venue matching
export const moodMapping: MoodMapping = {
  chill: ['Millay', 'Bar Gemini', 'Anchovy Bar'],
  party: ['Mothership', 'Harlan Records', 'Bar Part Time'],
  date: ['Celeste', 'Verjus', 'Millay'],
  classy: ['Charmaine\'s Rooftop', 'Verjus', 'Celeste'],
  music: ['Harlan Records', 'Bar Part Time', 'Bar Gemini'],
  drinks: ['Bar Part Time', 'Key Klub', 'Mothership'],
};
