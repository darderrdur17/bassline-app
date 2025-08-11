import { Venue, FilterOptions, MoodMapping } from '@/types/venue';

export const venues: Venue[] = [
  {
    "id": 5,
    "name": "Anchovy Bar",
    "coordinates": {
      "latitude": 37.7849,
      "longitude": -122.4144
    },
    "type": "Bar",
    "neighborhood": "Castro",
    "rating": 4.2,
    "pricing": "$$$",
    "hours": "5 PM - 11 PM",
    "heroImage": "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400",
    "musicGenre": [
      "Classical"
    ],
    "tags": [
      "seafood",
      "intimate",
      "date night"
    ],
    "description": "Cozy seafood-focused bar with classical music ambiance",
    "ambiance": [
      "Cozy"
    ],
    "cuisine": null,
    "dressCode": "Casual",
    "waitTime": "25",
    "accolades": "James Beard Award Finalist"
  },
  {
    "id": 9,
    "name": "Bar Gemini",
    "coordinates": {
      "latitude": 37.7549,
      "longitude": -122.4244
    },
    "type": "Bar",
    "neighborhood": "Mission",
    "rating": 4.4,
    "pricing": "$$",
    "hours": "6 PM - 1 AM",
    "heroImage": "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400",
    "musicGenre": [
      "Soul",
      "Funk",
      "Jazz Vinyl Sets"
    ],
    "tags": [
      "natural wine",
      "vinyl",
      "cozy",
      "date spot"
    ],
    "description": "Cozy natural wine bar with soul and funk vinyl sets",
    "ambiance": [
      "Warm Wood",
      "Vinyl Bar",
      "Cozy"
    ],
    "cuisine": null,
    "dressCode": "Casual",
    "waitTime": "20"
  },
  {
    "id": 1,
    "name": "Bar Part Time",
    "coordinates": {
      "latitude": 37.7599,
      "longitude": -122.4148
    },
    "type": "Bar",
    "neighborhood": "Mission",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "5 PM - 2 AM",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400",
    "musicGenre": [
      "House",
      "Disco"
    ],
    "tags": [
      "listening bar",
      "dance floor",
      "happy hour",
      "vinyl"
    ],
    "description": "Darklit red lights with vinyl listening bar and dance floor",
    "ambiance": [
      "Darklit",
      "Red Lights",
      "Incense"
    ],
    "cuisine": "Natural wine, bar snacks, pop-up food partners",
    "dressCode": "Casual",
    "waitTime": "15",
    "shortDescription": "Hip natural wine bar with a vinyl listening vibe, DJ sets, and a lively dance floor.",
    "accolades": "World's 50 Best Bars 2023",
    "yelpUrl": "https://www.yelp.com/biz/bar-part-time-san-francisco",
    "resyUrl": "https://resy.com/cities/sf/bar-part-time",
    "instagram": "https://instagram.com/barparttime"
  },
  {
    "id": 7,
    "name": "Celeste",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4094
    },
    "type": "Bar",
    "neighborhood": "SOMA",
    "rating": 4.5,
    "pricing": "$$$",
    "hours": "5:30 PM - 11 PM",
    "heroImage": "https://images.unsplash.com/photo-1544148103-bf50c5e7836b?w=400",
    "musicGenre": [
      "Jazz",
      "Soulful Electronic"
    ],
    "tags": [
      "date night",
      "mediterranean",
      "cozy",
      "romantic"
    ],
    "description": "Intimate Mediterranean bar perfect for date nights",
    "ambiance": [
      "Mediterranean Coastal",
      "Candlelit",
      "Intimate"
    ],
    "cuisine": null,
    "dressCode": "Smart Casual",
    "waitTime": "30"
  },
  {
    "id": 10,
    "name": "Charmaine's",
    "coordinates": {
      "latitude": 37.7879,
      "longitude": -122.4074
    },
    "type": "Lounge",
    "neighborhood": "Financial District",
    "rating": 4.2,
    "pricing": "$$$",
    "hours": "4 PM - 12 AM",
    "heroImage": "https://images.unsplash.com/photo-1491316037411-40279662960e?w=400",
    "musicGenre": [
      "Chill Electronic",
      "Lounge"
    ],
    "tags": [
      "scenic views",
      "elegant",
      "trendy",
      "rooftop"
    ],
    "description": "Sophisticated rooftop lounge with panoramic city views",
    "ambiance": [
      "Rooftop Lounge",
      "Panoramic Views"
    ],
    "cuisine": null,
    "dressCode": "Upscale",
    "waitTime": "45"
  },
  {
    "id": 4,
    "name": "Harlan Records",
    "coordinates": {
      "latitude": 37.7649,
      "longitude": -122.4248
    },
    "type": "Bar",
    "neighborhood": "Mission",
    "rating": 4.4,
    "pricing": "$$",
    "hours": "7 PM - 2 AM",
    "heroImage": "https://images.unsplash.com/photo-1510735166794-1e22c7d230f1?w=400",
    "musicGenre": [
      "House"
    ],
    "tags": [
      "music venue",
      "records",
      "DJ sets"
    ],
    "description": "Record store meets cocktail bar with live DJ sets",
    "ambiance": [
      "Darklit"
    ],
    "cuisine": null,
    "dressCode": "Casual",
    "waitTime": "15"
  },
  {
    "id": 2,
    "name": "Key Klub",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Bar",
    "neighborhood": "Mission",
    "rating": 4.1,
    "pricing": "$$",
    "hours": "6 PM - 2 AM",
    "heroImage": "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=400",
    "musicGenre": [
      "Mixed"
    ],
    "tags": [
      "dinner",
      "drinks",
      "young crowd"
    ],
    "description": "Hip Gen Z spot with New American food and drinks",
    "ambiance": [
      "Darklit",
      "Red Lights"
    ],
    "cuisine": "New American, cocktails, wine",
    "dressCode": "Casual",
    "waitTime": "20",
    "shortDescription": "Hip Gen Z spot with New American food and drinks",
    "accolades": "Featured in SF nightlife guides and 'best bars' lists for music and wine.",
    "yelpUrl": "https://www.yelp.com/biz/key-klub-san-francisco",
    "resyUrl": "https://resy.com/cities/sf/key-klub",
    "instagram": "https://instagram.com/keyklubsf"
  },
  {
    "id": 6,
    "name": "Millay",
    "coordinates": {
      "latitude": 37.7549,
      "longitude": -122.4194
    },
    "type": "Bar",
    "neighborhood": "Mission",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "6 PM - 12 AM",
    "heroImage": "https://images.unsplash.com/photo-1595424762791-7ef88838ad01?w=400",
    "musicGenre": [
      "Lo-fi",
      "Ambient",
      "Eclectic Vinyl"
    ],
    "tags": [
      "sake bar",
      "date spot",
      "intimate",
      "natural wine"
    ],
    "description": "Minimalist sake bar with Japanese-inspired snacks and vinyl sets",
    "ambiance": [
      "Minimalist",
      "Modern",
      "Cozy"
    ],
    "cuisine": null,
    "dressCode": "Casual Chic",
    "waitTime": "20"
  },
  {
    "id": 8,
    "name": "Mothership",
    "coordinates": {
      "latitude": 37.7649,
      "longitude": -122.4294
    },
    "type": "Bar",
    "neighborhood": "Mission",
    "rating": 4.1,
    "pricing": "$$",
    "hours": "7 PM - 2 AM",
    "heroImage": "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?w=400",
    "musicGenre": [
      "Synthwave",
      "Retro-funk",
      "Electronic"
    ],
    "tags": [
      "space bar",
      "immersive",
      "cocktails",
      "funky"
    ],
    "description": "Futuristic space-themed bar with immersive cocktail experience",
    "ambiance": [
      "Futuristic",
      "Colorful Lighting",
      "Space-themed"
    ],
    "cuisine": null,
    "dressCode": "Trendy / Fun",
    "waitTime": "15"
  },
  {
    "id": 3,
    "name": "Verjus",
    "coordinates": {
      "latitude": 37.7849,
      "longitude": -122.4094
    },
    "type": "Restaurant",
    "neighborhood": "SOMA",
    "rating": 4.5,
    "pricing": "$$$",
    "hours": "5:30 PM - 11 PM",
    "heroImage": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
    "musicGenre": [
      "Jazz"
    ],
    "tags": [
      "french cuisine",
      "wine bar",
      "upscale"
    ],
    "description": "Sophisticated French dining with extensive wine selection",
    "ambiance": [
      "Darklit"
    ],
    "cuisine": "French cuisine, wine, cocktails",
    "dressCode": "Casual",
    "waitTime": "30",
    "shortDescription": "Sophisticated French dining with extensive wine selection",
    "accolades": "Michelin Guide Recommended"
  }
];

export const filterOptions: FilterOptions = {
  "venueType": [
    "Bar",
    "Lounge",
    "Restaurant"
  ],
  "pricing": [
    "$$$",
    "$$"
  ],
  "musicGenre": [
    "Classical",
    "Soul",
    "Funk",
    "Jazz Vinyl Sets",
    "House",
    "Disco",
    "Jazz",
    "Soulful Electronic",
    "Chill Electronic",
    "Lounge",
    "Mixed",
    "Lo-fi",
    "Ambient",
    "Eclectic Vinyl",
    "Synthwave",
    "Retro-funk",
    "Electronic"
  ],
  "ambiance": [
    "Cozy",
    "Warm Wood",
    "Vinyl Bar",
    "Darklit",
    "Red Lights",
    "Incense",
    "Mediterranean Coastal",
    "Candlelit",
    "Intimate",
    "Rooftop Lounge",
    "Panoramic Views",
    "Minimalist",
    "Modern",
    "Futuristic",
    "Colorful Lighting",
    "Space-themed"
  ],
  "dressCode": [
    "Casual",
    "Smart Casual",
    "Upscale",
    "Casual Chic",
    "Trendy / Fun"
  ],
  "neighborhood": [
    "Castro",
    "Mission",
    "SOMA",
    "Financial District"
  ],
  "hours": [
    "Open Now",
    "Past 2 AM",
    "24 Hours"
  ],
  "ambianceDensity": [
    "Chill",
    "Lively",
    "High-energy",
    "VIP"
  ],
  "distance": [
    "<0.5 mi",
    "<1 mi",
    "<2 mi",
    "<5 mi"
  ]
};

export const moodMapping: MoodMapping = {
  "chill": [
    "Anchovy Bar",
    "Bar Gemini",
    "Celeste",
    "Charmaine's",
    "Millay"
  ],
  "party": [
    "Bar Part Time",
    "Harlan Records"
  ],
  "date": [
    "Anchovy Bar",
    "Bar Gemini",
    "Celeste",
    "Millay"
  ],
  "classy": [
    "Charmaine's"
  ],
  "music": [
    "Anchovy Bar",
    "Bar Gemini",
    "Bar Part Time",
    "Celeste",
    "Charmaine's",
    "Harlan Records",
    "Key Klub",
    "Millay",
    "Mothership",
    "Verjus"
  ],
  "drinks": [
    "Bar Gemini",
    "Bar Part Time",
    "Millay",
    "Mothership"
  ]
};
