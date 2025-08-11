export const venues = [
  {
    id: 1,
    name: "Bar Part Time",
    pricing: "$$",
    ambiance: ["Darklit", "Red Lights", "Incense"],
    musicGenre: ["House", "Disco"],
    food: null,
    dressCode: "Casual",
    crowd: "Indie",
    optimalTime: "11:00 PM",
    recommendedDrinks: ["Natural Wine"],
    tags: ["listening bar", "dance floor", "happy hour", "vinyl"],
    coordinates: { latitude: 37.7599, longitude: -122.4148 },
    type: "Bar",
    neighborhood: "Mission",
    rating: 4.3,
    crowdLevel: "moderate",
    waitTime: 15,
    estimatedUber: "$12",
    hours: "5 PM - 2 AM",
    heroImage: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400",
    description: "Darklit red lights with vinyl listening bar and dance floor",
    instagram: "https://instagram.com/barparttime",
  },
];

export const filterOptions = {
  venueType: ['Bar', 'Restaurant', 'Lounge', 'Club'],
  pricing: ['$', '$$', '$$$'],
  musicGenre: ['House', 'Jazz', 'Electronic', 'Classical', 'Mixed', 'Lo-fi', 'Hip-Hop', 'Soul', 'Funk', 'Disco', 'Synthwave'],
  ambiance: ['Darklit', 'Cozy', 'Rooftop', 'Minimalist', 'Futuristic'],
  crowd: ['Gen Z', 'Millennial', 'Indie', 'Professionals', 'Tourists', 'Couples', 'Creatives', 'Wine Lovers'],
  dressCode: ['Casual', 'Smart Casual', 'Trendy', 'Upscale'],
  neighborhood: ['Mission', 'SOMA', 'Castro', 'Financial District'],
  hours: ['Open Now', 'Past 2 AM', '24 Hours'],
  ambianceDensity: ['Chill', 'Lively', 'High-energy', 'VIP'],
  crowdScene: ['LGBTQ+', 'College', 'Trendy', 'Industry'],
  distance: ['<0.5 mi', '<1 mi', '<2 mi', '<5 mi'],
};

export const moodMapping = {
  chill: ['Millay', 'Bar Gemini', 'Anchovy Bar'],
  party: ['Mothership', 'Harlan Records', 'Bar Part Time'],
  date: ['Celeste', 'Verjus', 'Millay'],
  classy: ["Charmaine's", 'Verjus', 'Celeste'],
  music: ['Harlan Records', 'Bar Part Time', 'Bar Gemini'],
  drinks: ['Bar Part Time', 'Key Klub', 'Mothership'],
};
