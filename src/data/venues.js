import { venueImages, nameToImageKey } from './venueImages.js';

export const venues = [
  {
    "id": 94,
    "name": "1015 Folsom",
    "coordinates": {
      "latitude": 37.7786,
      "longitude": -122.4059
    },
    "type": "Club",
    "neighborhood": "SoMa",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "10pm–3am",
    "heroImage": venueImages[nameToImageKey('1015 Folsom')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null,
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 24,
    "name": "20 Spot",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Bar",
    "neighborhood": "San Francisco",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null,
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 27,
    "name": "ABV",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Cocktail Bar",
    "neighborhood": "Mission",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "Daily 4–2 (Kitchen till Midnight)",
    "heroImage": venueImages[nameToImageKey('ABV')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [
      "classic",
      "fast",
      "reliable",
      "often crowded—go early"
    ],
    "description": "Beloved neighborhood cocktail bar with a concise, dialed menu.",
    "ambiance": [
      "Quick service",
      "standing room"
    ],
    "cuisine": "Snacky",
    "accolades": "World’s 50 Best Bars (featured)",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ],
    "shortDescription": "Beloved neighborhood cocktail bar with a concise, dialed menu.",
    "instagram": "https://www.instagram.com/abvsf",
    "recommendedDrinks": [
      "Cocktails",
      "Beer"
    ]
  },
  {
    "id": 5,
    "name": "Anchovy Bar",
    "pricing": "$$$",
    "ambiance": [
      "Cozy",
      "Anchovy‑forward plates",
      "oysters",
      "inventive snacks"
    ],
    "musicGenre": [
      "Classical"
    ],
    "food": "Seafood (Small Plates)",
    "dressCode": "Casual",
    "crowd": [
      "Millennial",
      "Boomer"
    ],
    "optimalTime": "7:00 PM",
    "recommendedDrinks": [
      "Beer",
      "Wine",
      "Vermouth"
    ],
    "tags": [
      "seafood",
      "intimate",
      "date night",
      "anchovy emphasis",
      "small plates",
      "walk‑ins close ~9pm",
      "same group as state bird provisions",
      "the progress"
    ],
    "coordinates": {
      "latitude": 37.7849,
      "longitude": -122.4144
    },
    "type": "Wine Bar",
    "neighborhood": "Fillmore District",
    "rating": 4.2,
    "crowdLevel": "moderate",
    "waitTime": 25,
    "estimatedUber": "$13",
    "hours": "Mon–Fri 5:30–9; Sat–Sun 5–9",
    "accolades": "James Beard nominee",
    "heroImage": "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400",
    "description": "Leafy, coastal‑vibe seafood and wine bar by the State Bird team.",
    "gallery": [
      "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400"
    ],
    "cuisine": "Seafood / Western",
    "shortDescription": "Leafy, coastal‑vibe seafood and wine bar by the State Bird team.",
    "instagram": "https://www.instagram.com/theanchovybar"
  },
  {
    "id": 88,
    "name": "Anina",
    "coordinates": {
      "latitude": 37.7763,
      "longitude": -122.424
    },
    "type": "Bar",
    "neighborhood": "Hayes Valley",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "Inside: Mon–Fri 2–2; Sat–Sun 12–2 (Patio hours vary)",
    "heroImage": venueImages[nameToImageKey('Anina')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [
      "patio",
      "group‑friendly",
      "daytime"
    ],
    "description": "Sunny Hayes Valley patio bar with spritz towers and palm vibes.",
    "ambiance": [],
    "cuisine": "None",
    "accolades": "—",
    "instagram": "https://www.instagram.com/aninasf",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 51,
    "name": "Arcana",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Bar",
    "neighborhood": "San Francisco",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null,
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 91,
    "name": "Audio",
    "coordinates": {
      "latitude": 37.7786,
      "longitude": -122.4059
    },
    "type": "Club",
    "neighborhood": "SoMa",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "10pm–2am+",
    "heroImage": venueImages[nameToImageKey('Audio')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null,
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 34,
    "name": "Bar April Jean",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Bar",
    "neighborhood": "San Francisco",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null,
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 33,
    "name": "Bar Crenn",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Cocktail Salon",
    "neighborhood": "Cow Hollow",
    "rating": 4.3,
    "pricing": "$$$$",
    "hours": "Tue–Thu 4:30–11; Fri–Sat 4:30–12; Sun–Mon Closed",
    "heroImage": venueImages[nameToImageKey('Bar Crenn')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [
      "luxury",
      "omakase",
      "special occasion",
      "reservations essential"
    ],
    "description": "Elegant salon by Atelier Crenn—French omakase counter + lounge for canapés & cocktails.",
    "ambiance": [
      "Refined service",
      "seasonal pairings"
    ],
    "cuisine": "French",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ],
    "shortDescription": "Elegant salon by Atelier Crenn—French omakase counter + lounge for canapés & cocktails.",
    "instagram": "https://www.instagram.com/barcrenn",
    "accolades": "Michelin‑starred restaurant group",
    "recommendedDrinks": [
      "Cocktails",
      "Wine",
      "Champagne"
    ]
  },
  {
    "id": 9,
    "name": "Bar Gemini",
    "pricing": "$$",
    "ambiance": [
      "Warm Wood",
      "Vinyl Bar",
      "Cozy",
      "Warm wood",
      "vinyl bar",
      "cozy",
      "Vinyl on",
      "candlelight",
      "quiet chatter"
    ],
    "musicGenre": [
      "Soul",
      "Funk",
      "Jazz Vinyl Sets",
      "funk",
      "jazz vinyl sets"
    ],
    "food": "Light bites / charcuterie",
    "dressCode": "Casual",
    "crowd": [
      "Millennials",
      "Wine Lovers"
    ],
    "optimalTime": "8:00 PM",
    "recommendedDrinks": [
      "Natural Wine",
      "Sherry"
    ],
    "tags": [
      "natural wine",
      "vinyl",
      "cozy",
      "date spot",
      "reservations recommended weekends"
    ],
    "coordinates": {
      "latitude": 37.7549,
      "longitude": -122.4244
    },
    "type": "Wine Bar",
    "neighborhood": "Mission",
    "rating": 4.4,
    "crowdLevel": "moderate",
    "waitTime": 20,
    "estimatedUber": "$11",
    "hours": "Mon–Tue 5–10; Wed 5–10; Thu 5–11; Fri–Sat 4–12; Sun Closed",
    "heroImage": "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400",
    "description": "Minimal, sleek natural‑wine bar with low‑intervention gems.",
    "gallery": [
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400",
      "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=400",
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400"
    ],
    "cuisine": "Western snacks",
    "shortDescription": "Minimal, sleek natural‑wine bar with low‑intervention gems.",
    "instagram": "https://www.instagram.com/bargeminisf",
    "accolades": "—"
  },
  {
    "id": 49,
    "name": "Bar Jabroni",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Bar",
    "neighborhood": "San Francisco",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null,
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 1,
    "name": "Bar Part Time",
    "pricing": "$$",
    "ambiance": [
      "Darklit",
      "Red Lights",
      "Incense",
      "Dance floor",
      "international DJs",
      "weekend parties"
    ],
    "musicGenre": [
      "House",
      "Disco"
    ],
    "food": "None",
    "dressCode": "Casual",
    "crowd": "Indie",
    "optimalTime": "11:00 PM",
    "recommendedDrinks": [
      "Natural Wine",
      "Beer"
    ],
    "tags": [
      "listening bar",
      "dance floor",
      "happy hour",
      "vinyl",
      "international djs",
      "$10 cover on weekends"
    ],
    "coordinates": {
      "latitude": 37.7599,
      "longitude": -122.4148
    },
    "type": "Wine Bar",
    "neighborhood": "Mission",
    "rating": 4.3,
    "crowdLevel": "moderate",
    "waitTime": 15,
    "estimatedUber": "$12",
    "hours": "Tue 5–11; Wed 5–11; Thu 5–12; Fri 5–1; Sat 5–1; Sun–Mon Closed",
    "accolades": "—",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400",
    "description": "A glittering disco ball crowns a tight dance floor of natural‑wine lovers and vinyl DJs.",
    "yelpUrl": "https://www.yelp.com/biz/bar-part-time-san-francisco",
    "resyUrl": "https://resy.com/cities/sf/bar-part-time",
    "instagram": "https://www.instagram.com/barparttime",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
      "https://images.unsplash.com/photo-1532634896-26909d0d0b9f?w=400"
    ],
    "cuisine": "None",
    "shortDescription": "A glittering disco ball crowns a tight dance floor of natural‑wine lovers and vinyl DJs."
  },
  {
    "id": 56,
    "name": "Bar Shiru",
    "coordinates": {
      "latitude": 37.8044,
      "longitude": -122.2712
    },
    "type": "Bar",
    "neighborhood": "Oakland",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null,
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 18,
    "name": "Bar Sprezzatura",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Cocktail Bar",
    "neighborhood": "Jackson Square",
    "rating": 4.3,
    "pricing": "$$$",
    "hours": "Mon–Wed 11–9; Thu–Fri 11–10; Sat 4–10; Sun Closed",
    "heroImage": venueImages[nameToImageKey('Bar Sprezzatura')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [
      "aperitivo",
      "elegant",
      "classic",
      "dress‑ier crowd"
    ],
    "description": "Italian‑leaning cocktail & aperitivo lounge with refined service.",
    "ambiance": [
      "Martinis",
      "negronis",
      "Italian snacks"
    ],
    "cuisine": "Italian",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ],
    "shortDescription": "Italian‑leaning cocktail & aperitivo lounge with refined service.",
    "instagram": "https://www.instagram.com/bar.sprezzatura",
    "accolades": "—",
    "recommendedDrinks": [
      "Cocktails",
      "Amari"
    ]
  },
  {
    "id": 74,
    "name": "Bay Pocha",
    "coordinates": {
      "latitude": 37.7249,
      "longitude": -122.4543
    },
    "type": "Bar",
    "neighborhood": "Ocean Ave",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "Mon–Thu 5pm–11pm; Fri–Sat 5pm–12am; Sun 5pm–10pm",
    "heroImage": venueImages[nameToImageKey('Bay Pocha')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Korean",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 87,
    "name": "Beaux",
    "coordinates": {
      "latitude": 37.7627,
      "longitude": -122.435
    },
    "type": "Club",
    "neighborhood": "Castro",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "Daily 3–2 (Sun from 12)",
    "heroImage": venueImages[nameToImageKey('Beaux')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [
      "drag",
      "dance",
      "nightclub"
    ],
    "description": "Popular Castro nightclub with themed drag/dance nights.",
    "ambiance": [],
    "cuisine": "None",
    "accolades": "—",
    "instagram": "https://www.instagram.com/beauxsf",
    "gallery": [
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
      "https://images.unsplash.com/photo-1571266028243-b4e4d3d70130?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 75,
    "name": "Beep's Burgers",
    "coordinates": {
      "latitude": 37.7249,
      "longitude": -122.4543
    },
    "type": "Bar",
    "neighborhood": "Ocean Ave",
    "rating": 4.3,
    "pricing": "$",
    "hours": "Daily 11am–12am",
    "heroImage": venueImages[nameToImageKey("Beep's Burgers")]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Western",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 44,
    "name": "Birba",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Bar",
    "neighborhood": "San Francisco",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null,
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 69,
    "name": "Bob's Donut",
    "coordinates": {
      "latitude": 37.793,
      "longitude": -122.4162
    },
    "type": "Bar",
    "neighborhood": "Nob Hill",
    "rating": 4.3,
    "pricing": "$",
    "hours": "Daily 24h",
    "heroImage": venueImages[nameToImageKey("Bob's Donut")]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Western",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 82,
    "name": "Bodega",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Bar",
    "neighborhood": "San Francisco",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Vietnamese",
    "food": "Vietnamese",
    "recommendedDrinks": [
      "Cocktails"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 11,
    "name": "Bodega North Beach",
    "coordinates": {
      "latitude": 37.8061,
      "longitude": -122.4106
    },
    "type": "Wine Bar",
    "neighborhood": "North Beach",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "Tue–Fri 4–11; Sat 9–11; Sun 1–8; Mon Closed",
    "heroImage": venueImages[nameToImageKey('Bodega North Beach')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [
      "natural wine",
      "small plates",
      "date night",
      "casual dining",
      "natural wine focus",
      "casual",
      "sister to key klub",
      "celeste"
    ],
    "description": "Neon‑pink corner shop pouring natural wine with playful New American bites.",
    "ambiance": [
      "Lively",
      "Cozy",
      "Dimly lit",
      "Small plates",
      "natural wine focus"
    ],
    "cuisine": "Western",
    "shortDescription": "Neon‑pink corner shop pouring natural wine with playful New American bites.",
    "recommendedDrinks": [
      "Natural Wine",
      "Beer"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ],
    "instagram": "https://www.instagram.com/bodeganorthbeach",
    "accolades": "—"
  },
  {
    "id": 14,
    "name": "Buddy",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Neighborhood / Cocktail Bar",
    "neighborhood": "Mission",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "Sun–Fri 4–10; Sat 2–10",
    "heroImage": venueImages[nameToImageKey('Buddy')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [
      "casual",
      "amaro",
      "sandwiches",
      "neighborhood",
      "walk‑in friendly"
    ],
    "description": "Chill neighborhood bar with amari, natty wine, and satisfying sandwiches.",
    "ambiance": [
      "Friendly staff",
      "counter‑service vibes"
    ],
    "cuisine": "New American",
    "recommendedDrinks": [
      "Wine",
      "Cocktails",
      "Beer"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ],
    "shortDescription": "Chill neighborhood bar with amari, natty wine, and satisfying sandwiches.",
    "instagram": "https://www.instagram.com/buddysf",
    "accolades": "—"
  },
  {
    "id": 45,
    "name": "Cantina Los Mayas",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Bar",
    "neighborhood": "San Francisco",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null,
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 31,
    "name": "Cavana",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Bar",
    "neighborhood": "San Francisco",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null,
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 7,
    "name": "Celeste",
    "pricing": "$$",
    "ambiance": [
      "Mediterranean Coastal",
      "Candlelit",
      "Intimate",
      "Mediterranean coastal",
      "candlelit",
      "intimate",
      "Breakfast burritos (select hours)",
      "shareables"
    ],
    "musicGenre": [
      "Jazz",
      "Soulful Electronic",
      "soulful electronic"
    ],
    "food": "Mediterranean (Small Plates)",
    "dressCode": "Smart casual",
    "crowd": [
      "Couples",
      "Professionals"
    ],
    "optimalTime": "7:00 PM",
    "recommendedDrinks": [
      "Vermouth",
      "Herbal Cocktails",
      "Wine",
      "Cocktails"
    ],
    "tags": [
      "date night",
      "mediterranean",
      "cozy",
      "romantic",
      "sister to key klub",
      "bodega"
    ],
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4094
    },
    "type": "Wine Bar",
    "neighborhood": "Marina",
    "rating": 4.5,
    "crowdLevel": "moderate",
    "waitTime": 30,
    "estimatedUber": "$14",
    "hours": "Tue–Thu 4–11:30; Fri 2–12:30; Sat 2–12; Sun 11–7; Mon Closed",
    "heroImage": "https://images.unsplash.com/photo-1544148103-bf50c5e7836b?w=400",
    "description": "Trendy, red‑lit wine bar with upbeat tunes and Mediterranean‑leaning bites.",
    "gallery": [
      "https://images.unsplash.com/photo-1544148103-bf50c5e7836b?w=400",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
      "https://images.unsplash.com/photo-1550096462-ea0621244d6d?w=400"
    ],
    "cuisine": "Mediterranean",
    "shortDescription": "Trendy, red‑lit wine bar with upbeat tunes and Mediterranean‑leaning bites.",
    "instagram": "https://www.instagram.com/celestesf",
    "accolades": "—"
  },
  {
    "id": 21,
    "name": "Chambers",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Hotel Bar",
    "neighborhood": "Tenderloin",
    "rating": 4.3,
    "pricing": "$$$",
    "hours": "Thu 5–11; Fri–Sat 5–12; Sun–Wed Closed",
    "heroImage": venueImages[nameToImageKey('Chambers')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [
      "retro",
      "patio",
      "hotel bar",
      "great before/after shows"
    ],
    "description": "Poolside‑adjacent lounge with mid‑century flair at the Phoenix Hotel.",
    "ambiance": [
      "Outdoor patio",
      "records wall"
    ],
    "cuisine": "Cal‑American",
    "accolades": "Michelin Guide mention",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ],
    "shortDescription": "Poolside‑adjacent lounge with mid‑century flair at the Phoenix Hotel.",
    "instagram": "https://www.instagram.com/chambers_sf",
    "recommendedDrinks": [
      "Cocktails",
      "Wine"
    ]
  },
  {
    "id": 10,
    "name": "Charmaine's",
    "pricing": "$$$",
    "ambiance": [
      "Rooftop Lounge",
      "Panoramic Views",
      "Rooftop lounge",
      "panoramic views",
      "Sweeping vistas",
      "stylish crowd"
    ],
    "musicGenre": [
      "Chill Electronic",
      "Lounge",
      "Chill electronic",
      "lounge"
    ],
    "food": "Upscale bar bites",
    "dressCode": "Upscale",
    "crowd": [
      "Tourists",
      "Professionals"
    ],
    "optimalTime": "Sunset hours",
    "recommendedDrinks": [
      "Craft Cocktails",
      "Cocktails",
      "Wine"
    ],
    "tags": [
      "scenic views",
      "elegant",
      "trendy",
      "rooftop",
      "heaters on",
      "windy evenings"
    ],
    "coordinates": {
      "latitude": 37.7879,
      "longitude": -122.4074
    },
    "type": "Rooftop Bar",
    "neighborhood": "Mid‑Market",
    "rating": 4.2,
    "crowdLevel": "busy",
    "waitTime": 45,
    "estimatedUber": "$18",
    "hours": "Mon–Thu 5–11; Fri–Sat 4–12; Sun 4–11",
    "heroImage": "https://images.unsplash.com/photo-1491316037411-40279662960e?w=400",
    "description": "Euro‑inspired rooftop lounge with fire pits and postcard skyline views.",
    "gallery": [
      "https://images.unsplash.com/photo-1491316037411-40279662960e?w=400",
      "https://images.unsplash.com/photo-1518916171747-a2f21ddcb7ee?w=400",
      "https://images.unsplash.com/photo-1520083772178-a6b6f48f071b?w=400"
    ],
    "cuisine": "Western",
    "shortDescription": "Euro‑inspired rooftop lounge with fire pits and postcard skyline views.",
    "instagram": "https://www.instagram.com/charmainessf",
    "accolades": "—"
  },
  {
    "id": 29,
    "name": "Chotto Matte",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Bar",
    "neighborhood": "San Francisco",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null,
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 62,
    "name": "Cocobang",
    "coordinates": {
      "latitude": 37.789,
      "longitude": -122.4133
    },
    "type": "Bar",
    "neighborhood": "Lower Nob Hill",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "Daily 5pm–2am",
    "heroImage": venueImages[nameToImageKey('Cocobang')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Korean",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 89,
    "name": "Dalva",
    "coordinates": {
      "latitude": 37.7599,
      "longitude": -122.4148
    },
    "type": "Bar",
    "neighborhood": "Mission",
    "rating": 4.3,
    "pricing": "$",
    "hours": "Mon–Tue 5–12; Wed–Sat 5–2; Sun 5–12",
    "heroImage": venueImages[nameToImageKey('Dalva')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [
      "dance",
      "DJs",
      "classic"
    ],
    "description": "Beloved Mission standby; back‑room ‘Hideout’ hosts DJs and dancing.",
    "ambiance": [],
    "cuisine": "None",
    "accolades": "—",
    "instagram": "https://www.instagram.com/dalvasf",
    "gallery": [
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
      "https://images.unsplash.com/photo-1571266028243-b4e4d3d70130?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 46,
    "name": "Decant",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Bar",
    "neighborhood": "San Francisco",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null,
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 13,
    "name": "El Chato",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Wine Bar",
    "neighborhood": "Mission District",
    "rating": 4.3,
    "pricing": "$$$",
    "hours": "Mon–Thu 4–10; Fri–Sat 4–11; Sun 3–9",
    "heroImage": venueImages[nameToImageKey('El Chato')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [
      "Live bands",
      "indie sleaze",
      "Spanish pop"
    ],
    "tags": [
      "porróns",
      "live music",
      "communal tables",
      "intimate",
      "late-night vibe",
      "late‑night",
      "small space",
      "porrón etiquette encouraged"
    ],
    "description": "Spanish taberna pouring curated wines, vermouth, and pintxos/tapas.",
    "ambiance": [
      "Intimate",
      "playful",
      "Mural-lit pink walls",
      "Porróns",
      "tinto",
      "jamón",
      "occasional live music"
    ],
    "cuisine": "Spanish",
    "food": "Spanish tapas & pintxos",
    "recommendedDrinks": [
      "Wine",
      "Vermouth"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ],
    "shortDescription": "Spanish taberna pouring curated wines, vermouth, and pintxos/tapas.",
    "instagram": "https://www.instagram.com/elchatosf",
    "accolades": "—"
  },
  {
    "id": 47,
    "name": "Fool's Errand",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Bar",
    "neighborhood": "San Francisco",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null,
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 57,
    "name": "Friends and Family",
    "coordinates": {
      "latitude": 37.8044,
      "longitude": -122.2712
    },
    "type": "Bar",
    "neighborhood": "Oakland",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [
      "Retro",
      "Neighborhood-y",
      "Pink Tones"
    ],
    "cuisine": null,
    "food": "Hawaiian/Californian (Small Plates) — musubi, deviled eggs, fried chicken sandwich",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 12,
    "name": "Gigi's",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Neighborhood Bar",
    "neighborhood": "NoPa",
    "rating": 4.3,
    "pricing": "$",
    "hours": "Tue–Sat 4–9; Sun–Mon Closed",
    "heroImage": venueImages[nameToImageKey("Gigi's")]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [
      "casual",
      "cheap eats",
      "lively",
      "great for groups",
      "limited seating"
    ],
    "description": "Casual Vietnamese hang with late‑night energy and playful drinks.",
    "ambiance": [
      "Retro-chic",
      "warm lighting",
      "Loud",
      "lively",
      "crowd‑pleasing bites"
    ],
    "cuisine": "Vietnamese",
    "dressCode": "Casual, trendy",
    "food": "Vietnamese (Small Plates)",
    "recommendedDrinks": [
      "Beer",
      "Cocktails",
      "Chambong"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ],
    "shortDescription": "Casual Vietnamese hang with late‑night energy and playful drinks.",
    "accolades": "—"
  },
  {
    "id": 61,
    "name": "Grubstake",
    "coordinates": {
      "latitude": 37.789,
      "longitude": -122.4133
    },
    "type": "Bar",
    "neighborhood": "Lower Nob Hill",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "Daily 5pm–4am",
    "heroImage": venueImages[nameToImageKey('Grubstake')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Western",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 72,
    "name": "Gyro Xpress",
    "coordinates": {
      "latitude": 37.7627,
      "longitude": -122.435
    },
    "type": "Bar",
    "neighborhood": "Castro",
    "rating": 4.3,
    "pricing": "$",
    "hours": "Mon–Sat 11am–10pm; Sun Closed",
    "heroImage": venueImages[nameToImageKey('Gyro Xpress')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Mediterranean",
    "gallery": [
      "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 92,
    "name": "Halcyon",
    "coordinates": {
      "latitude": 37.7786,
      "longitude": -122.4059
    },
    "type": "Bar",
    "neighborhood": "SoMa",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "11pm–late",
    "heroImage": venueImages[nameToImageKey('Halcyon')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null,
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 4,
    "name": "Harlan Records",
    "pricing": "$$",
    "ambiance": [
      "Darklit",
      "Retro",
      "Dive",
      "Music‑inspired cocktails",
      "live vinyl DJs"
    ],
    "musicGenre": [
      "House"
    ],
    "food": "None",
    "dressCode": "Casual",
    "crowd": "Music Lovers",
    "optimalTime": "10:00 PM",
    "recommendedDrinks": [
      "Craft Cocktails",
      "Cocktails"
    ],
    "tags": [
      "music venue",
      "records",
      "dj sets",
      "listening bar",
      "vinyl",
      "retro",
      "music inspired cocktails",
      "live vinyl dj sets",
      "intimate",
      "small space",
      "arrive early"
    ],
    "coordinates": {
      "latitude": 37.7649,
      "longitude": -122.4248
    },
    "type": "Speakeasy / Listening Bar",
    "neighborhood": "Union Square",
    "rating": 4.4,
    "crowdLevel": "busy",
    "waitTime": 15,
    "estimatedUber": "$11",
    "hours": "Mon 2–12; Tue–Fri 2–1:30; Sat 4–1:30; Sun 4–12",
    "heroImage": "https://images.unsplash.com/photo-1510735166794-1e22c7d230f1?w=400",
    "description": "Alley‑hidden Japanese‑leaning listening bar with eclectic vinyl sets.",
    "gallery": [
      "https://images.unsplash.com/photo-1510735166794-1e22c7d230f1?w=400",
      "https://images.unsplash.com/photo-1505925456422-1d8a438d4f88?w=400",
      "https://images.unsplash.com/photo-1453090927415-5f45085b65c0?w=400"
    ],
    "cuisine": "None",
    "shortDescription": "Alley‑hidden Japanese‑leaning listening bar with eclectic vinyl sets.",
    "instagram": "https://www.instagram.com/harlanrecordssf",
    "accolades": "—"
  },
  {
    "id": 86,
    "name": "Hi‑Tops",
    "coordinates": {
      "latitude": 37.7627,
      "longitude": -122.435
    },
    "type": "Bar",
    "neighborhood": "Castro",
    "rating": 4.3,
    "pricing": "$",
    "hours": "Mon–Wed 12–12; Thu–Fri 12–2; Sat 10–2; Sun 10–12",
    "heroImage": venueImages[nameToImageKey('Hi‑Tops')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [
      "queer",
      "sports",
      "lively"
    ],
    "description": "Lively sports‑centric Castro bar with a big, friendly crowd.",
    "ambiance": [],
    "cuisine": "Bar snacks",
    "accolades": "—",
    "instagram": "https://www.instagram.com/hitopssf",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 43,
    "name": "High Treason",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Wine Bar",
    "neighborhood": "Inner Richmond",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "Daily 4–11 (Fri–Sat until Midnight)",
    "heroImage": venueImages[nameToImageKey('High Treason')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [
      "vinyl",
      "retail",
      "cozy",
      "retail bottle shop pricing to‑go"
    ],
    "description": "Chill neighborhood wine bar with eclectic vinyl and smart bottle list.",
    "ambiance": [
      "Vinyl spins",
      "retail bottles"
    ],
    "cuisine": "None",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ],
    "shortDescription": "Chill neighborhood wine bar with eclectic vinyl and smart bottle list.",
    "instagram": "https://www.instagram.com/hightreasonsf",
    "accolades": "—",
    "recommendedDrinks": [
      "Wine",
      "Beer"
    ]
  },
  {
    "id": 63,
    "name": "Hinodeya",
    "coordinates": {
      "latitude": 37.785,
      "longitude": -122.43
    },
    "type": "Bar",
    "neighborhood": "Japantown",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "Daily 11am–9:30pm",
    "heroImage": venueImages[nameToImageKey('Hinodeya')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Japanese",
    "gallery": [
      "https://images.unsplash.com/photo-1595424762791-7ef88838ad01?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 53,
    "name": "Jilli",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Bar",
    "neighborhood": "San Francisco",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null,
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 67,
    "name": "Joyful Garden",
    "coordinates": {
      "latitude": 37.7627,
      "longitude": -122.435
    },
    "type": "Bar",
    "neighborhood": "Castro",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "Daily 11am–10pm",
    "heroImage": venueImages[nameToImageKey('Joyful Garden')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Chinese",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 2,
    "name": "Key Klub",
    "pricing": "$$",
    "ambiance": [
      "Darklit",
      "Red Lights",
      "Exposed brick",
      "Brooklyn vibe",
      "Big plates",
      "wide wine",
      "beer range"
    ],
    "musicGenre": [
      "Mixed"
    ],
    "food": "New American (Big Plates, Small Bites)",
    "dressCode": "Casual",
    "crowd": "Gen Z",
    "optimalTime": "9:00 PM",
    "recommendedDrinks": [
      "Natural Wine",
      "Beer"
    ],
    "tags": [
      "dinner",
      "drinks",
      "young crowd",
      "wine bar",
      "new american",
      "big plates",
      "wide range of wine",
      "beer",
      "date spot",
      "sister spot to bodega",
      "celeste"
    ],
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Wine Bar",
    "neighborhood": "Nob Hill",
    "rating": 4.1,
    "crowdLevel": "busy",
    "waitTime": 20,
    "estimatedUber": "$10",
    "hours": "Tue–Wed 4–11; Thu–Fri 4–12; Sat 2–12; Sun–Mon Closed",
    "heroImage": "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=400",
    "description": "Glowing lights, New American bites, and natural wine pours in a photogenic space.",
    "yelpUrl": "https://www.yelp.com/biz/key-klub-san-francisco",
    "resyUrl": "https://resy.com/cities/sf/key-klub",
    "instagram": "https://www.instagram.com/key.klubsf",
    "gallery": [
      "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=400",
      "https://images.unsplash.com/photo-1515162305281-4524d839d4a5?w=400",
      "https://images.unsplash.com/photo-1510626176961-4b0b5a2a7f91?w=400"
    ],
    "cuisine": "Western",
    "shortDescription": "Glowing lights, New American bites, and natural wine pours in a photogenic space.",
    "accolades": "—"
  },
  {
    "id": 26,
    "name": "Kis cafe",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Bar",
    "neighborhood": "San Francisco",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null,
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 80,
    "name": "Kowloon Tong Dessert Cafe",
    "coordinates": {
      "latitude": 37.7534,
      "longitude": -122.4944
    },
    "type": "Bar",
    "neighborhood": "Outer Sunset",
    "rating": 4.3,
    "pricing": "$",
    "hours": "Daily 1pm–12am",
    "heroImage": venueImages[nameToImageKey('Kowloon Tong Dessert Cafe')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Chinese",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 22,
    "name": "Left Door",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Bar",
    "neighborhood": "San Francisco",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null,
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 84,
    "name": "Li Po Cocktail Lounge",
    "coordinates": {
      "latitude": 37.7941,
      "longitude": -122.4078
    },
    "type": "Bar",
    "neighborhood": "Chinatown",
    "rating": 4.3,
    "pricing": "$",
    "hours": "Mon–Wed 2–1; Thu–Fri 2–2; Sat 1–2; Sun 1–1",
    "heroImage": venueImages[nameToImageKey('Li Po Cocktail Lounge')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [
      "historic",
      "dive",
      "neon"
    ],
    "description": "Historic Chinatown dive with the infamous Chinese Mai Tai.",
    "ambiance": [],
    "cuisine": "None",
    "accolades": "—",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 30,
    "name": "Madrone Art Bar",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Bar",
    "neighborhood": "San Francisco",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null,
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 85,
    "name": "Make‑Out Room",
    "coordinates": {
      "latitude": 37.7599,
      "longitude": -122.4148
    },
    "type": "Bar",
    "neighborhood": "Mission",
    "rating": 4.3,
    "pricing": "$",
    "hours": "Tue–Sun 6–2; Mon Closed",
    "heroImage": venueImages[nameToImageKey('Make‑Out Room')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [
      "indie",
      "dance floor",
      "live music"
    ],
    "description": "Mission institution for live bands, DJ nights, and indie dance parties.",
    "ambiance": [],
    "cuisine": "None",
    "accolades": "—",
    "instagram": "https://www.instagram.com/makeoutroomsf",
    "gallery": [
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
      "https://images.unsplash.com/photo-1571266028243-b4e4d3d70130?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 54,
    "name": "Mari's Mogura",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Bar",
    "neighborhood": "San Francisco",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null,
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 6,
    "name": "Millay",
    "pricing": "$$",
    "ambiance": [
      "Minimalist",
      "Modern",
      "Cozy",
      "Cozy room",
      "by‑the‑glass list",
      "light bites"
    ],
    "musicGenre": [
      "Lo-fi",
      "Ambient",
      "Eclectic Vinyl",
      "Low-fi",
      "ambient",
      "eclectic vinyl sets"
    ],
    "food": "Japanese-inspired bar snacks (light)",
    "dressCode": "Casual chic",
    "crowd": [
      "Millennials",
      "Creative Professionals"
    ],
    "optimalTime": "8:30 PM",
    "recommendedDrinks": [
      "Sake",
      "Highballs",
      "Cocktails",
      "Wine"
    ],
    "tags": [
      "sake bar",
      "date spot",
      "intimate",
      "natural wine",
      "bar‑only seating",
      "limited tables"
    ],
    "coordinates": {
      "latitude": 37.7549,
      "longitude": -122.4194
    },
    "type": "Sake Bar / Wine Bar",
    "neighborhood": "Mission",
    "rating": 4.3,
    "crowdLevel": "moderate",
    "waitTime": 20,
    "estimatedUber": "$10",
    "hours": "Mon/Wed/Thu 5–10; Fri 5–12; Sat 3–12; Sun 3–8; Tue Closed",
    "heroImage": "https://images.unsplash.com/photo-1595424762791-7ef88838ad01?w=400",
    "description": "Stylish sake‑and‑wine bar with pink neon, wood seating, and a tiny disco ball.",
    "gallery": [
      "https://images.unsplash.com/photo-1595424762791-7ef88838ad01?w=400",
      "https://images.unsplash.com/photo-1532634896-26909d0d0b9f?w=400",
      "https://images.unsplash.com/photo-1544547082-0426b6c7e49f?w=400"
    ],
    "cuisine": "Japanese",
    "shortDescription": "Stylish sake‑and‑wine bar with pink neon, wood seating, and a tiny disco ball.",
    "instagram": "https://www.instagram.com/millaysf",
    "accolades": "—"
  },
  {
    "id": 90,
    "name": "Monroe's",
    "coordinates": {
      "latitude": 37.8061,
      "longitude": -122.4106
    },
    "type": "Club",
    "neighborhood": "North Beach",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "10pm–2am",
    "heroImage": venueImages[nameToImageKey("Monroe's")]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null,
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 8,
    "name": "Mothership",
    "pricing": "$$",
    "ambiance": [
      "Futuristic",
      "Colorful Lighting",
      "Space-themed",
      "colorful lighting",
      "space-themed",
      "Creative cocktails",
      "relaxed crowd",
      "plants"
    ],
    "musicGenre": [
      "Synthwave",
      "Retro-funk",
      "Electronic",
      "retro-funk",
      "electronic"
    ],
    "food": "Small bites/snacks",
    "dressCode": "Trendy / fun",
    "crowd": [
      "Gen Z",
      "Creatives"
    ],
    "optimalTime": "10:00 PM",
    "recommendedDrinks": [
      "Themed Cocktails",
      "Cocktails"
    ],
    "tags": [
      "space bar",
      "immersive",
      "cocktails",
      "funky",
      "back patio closes earlier than bar"
    ],
    "coordinates": {
      "latitude": 37.7649,
      "longitude": -122.4294
    },
    "type": "Cocktail Bar",
    "neighborhood": "Mission",
    "rating": 4.1,
    "crowdLevel": "busy",
    "waitTime": 15,
    "estimatedUber": "$12",
    "hours": "Tue–Thu 4–12; Fri 4–2; Sat 2–2; Sun 2–10; Mon Closed",
    "heroImage": "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?w=400",
    "description": "Verdant, space‑themed Mission hideaway with inventive drinks and a lush patio.",
    "gallery": [
      "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?w=400",
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=400",
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400"
    ],
    "cuisine": "None",
    "shortDescription": "Verdant, space‑themed Mission hideaway with inventive drinks and a lush patio.",
    "instagram": "https://www.instagram.com/mothershipsf",
    "accolades": "—"
  },
  {
    "id": 70,
    "name": "Naan N Curry",
    "coordinates": {
      "latitude": 37.7793,
      "longitude": -122.4193
    },
    "type": "Bar",
    "neighborhood": "Civic Center",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "Daily 11am–3am",
    "heroImage": venueImages[nameToImageKey('Naan N Curry')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Indian",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 68,
    "name": "Orphan Andy's",
    "coordinates": {
      "latitude": 37.7627,
      "longitude": -122.435
    },
    "type": "Bar",
    "neighborhood": "Castro",
    "rating": 4.3,
    "pricing": "$",
    "hours": "Daily 24h",
    "heroImage": venueImages[nameToImageKey("Orphan Andy's")]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Western",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 48,
    "name": "Palm City",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Wine Bar / Deli",
    "neighborhood": "Outer Sunset",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "Wed–Sun 12–9 (beer & wine till 9); Mon–Tue 4–10 (kitchen till 9)",
    "heroImage": venueImages[nameToImageKey('Palm City')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [
      "hoagies",
      "natural wine",
      "casual",
      "order early—sandos sell out"
    ],
    "description": "South‑side hang known for hoagies, natural wine, and an easy vibe.",
    "ambiance": [
      "Hoagies till sell‑out"
    ],
    "cuisine": "Deli / American",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ],
    "shortDescription": "South‑side hang known for hoagies, natural wine, and an easy vibe.",
    "instagram": "https://www.instagram.com/palmcitysf",
    "accolades": "—",
    "recommendedDrinks": [
      "Wine",
      "Beer"
    ]
  },
  {
    "id": 76,
    "name": "Panchita's Pupuseria Restaurant",
    "coordinates": {
      "latitude": 37.7599,
      "longitude": -122.4148
    },
    "type": "Bar",
    "neighborhood": "Mission",
    "rating": 4.3,
    "pricing": "$",
    "hours": "Mon–Thu & Sun 10am–11pm; Fri–Sat 10am–2:30am",
    "heroImage": venueImages[nameToImageKey("Panchita's Pupuseria Restaurant")]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Salvadoran",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 16,
    "name": "PCH",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Bar",
    "neighborhood": "San Francisco",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null,
    "accolades": "World’s Best 50 Bars",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 83,
    "name": "PCH (Pacific Cocktail Haven)",
    "coordinates": {
      "latitude": 37.7881,
      "longitude": -122.4075
    },
    "type": "Bar",
    "neighborhood": "Union Square",
    "rating": 4.3,
    "pricing": "$$$",
    "hours": "Mon–Sat 5–12; Sun Closed",
    "heroImage": venueImages[nameToImageKey('PCH (Pacific Cocktail Haven)')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [
      "award‑winning",
      "inventive",
      "date spot"
    ],
    "description": "Renowned cocktail bar with Pacific/Asian flavor profiles and creative technique.",
    "ambiance": [],
    "cuisine": "None",
    "accolades": "World’s 50 Best Bars (featured)",
    "instagram": "https://www.instagram.com/pchsfo",
    "gallery": [
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 15,
    "name": "Peacekeeper",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Cocktail Bar",
    "neighborhood": "SoMa",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "Mon–Thu 2–2; Fri 2–2; Sat–Sun 1–2",
    "heroImage": venueImages[nameToImageKey('Peacekeeper')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [
      "retractable roof",
      "games",
      "lively",
      "lines form on weekends"
    ],
    "description": "Bi‑level cocktail bar with a retractable roof and pool/arcade games.",
    "ambiance": [
      "Roof open on warm nights",
      "lively crowd"
    ],
    "cuisine": "None",
    "recommendedDrinks": [
      "Cocktails",
      "Beer",
      "Wine"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ],
    "shortDescription": "Bi‑level cocktail bar with a retractable roof and pool/arcade games.",
    "instagram": "https://www.instagram.com/peacekeepersf",
    "accolades": "—"
  },
  {
    "id": 28,
    "name": "Phonobar",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Bar",
    "neighborhood": "San Francisco",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null,
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 59,
    "name": "Pinecrest",
    "coordinates": {
      "latitude": 37.7881,
      "longitude": -122.4075
    },
    "type": "Bar",
    "neighborhood": "Union Square",
    "rating": 4.3,
    "pricing": "$",
    "hours": "Mon–Wed 7am–11pm; Thu 7am–12am; Fri–Sat 24h; Sun 12am–11pm",
    "heroImage": venueImages[nameToImageKey('Pinecrest')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Western",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 42,
    "name": "Press Club",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Wine Lounge",
    "neighborhood": "SoMa",
    "rating": 4.3,
    "pricing": "$$$",
    "hours": "Wed–Thu 5–11; Fri–Sat 4–12; Sun 3–9; Mon–Tue Closed",
    "heroImage": venueImages[nameToImageKey('Press Club')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [
      "sleek",
      "corporate‑friendly",
      "spacious",
      "great for groups/events"
    ],
    "description": "Sleek subterranean wine lounge pouring flights from notable producers.",
    "ambiance": [
      "Large space",
      "events"
    ],
    "cuisine": "None",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ],
    "shortDescription": "Sleek subterranean wine lounge pouring flights from notable producers.",
    "instagram": "https://www.instagram.com/pressclubsf",
    "accolades": "—",
    "recommendedDrinks": [
      "Wine",
      "Champagne"
    ]
  },
  {
    "id": 77,
    "name": "Primo Pizza",
    "coordinates": {
      "latitude": 37.7802,
      "longitude": -122.463
    },
    "type": "Bar",
    "neighborhood": "Inner Richmond",
    "rating": 4.3,
    "pricing": "$",
    "hours": "Mon–Thu 11am–10pm; Fri–Sat 11am–11pm; Sun 12pm–10pm",
    "heroImage": venueImages[nameToImageKey('Primo Pizza')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Italian",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 64,
    "name": "Public Izakaya",
    "coordinates": {
      "latitude": 37.789,
      "longitude": -122.4133
    },
    "type": "Bar",
    "neighborhood": "Lower Nob Hill",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "Tue–Sat 5pm–11pm; Sun–Mon Closed",
    "heroImage": venueImages[nameToImageKey('Public Izakaya')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Japanese",
    "gallery": [
      "https://images.unsplash.com/photo-1595424762791-7ef88838ad01?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 93,
    "name": "Public Works",
    "coordinates": {
      "latitude": 37.7599,
      "longitude": -122.4148
    },
    "type": "Bar",
    "neighborhood": "Mission",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "9pm–3am",
    "heroImage": venueImages[nameToImageKey('Public Works')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null,
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 40,
    "name": "Roaming Goat",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Bar",
    "neighborhood": "San Francisco",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null,
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 41,
    "name": "robberbaron",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Bar",
    "neighborhood": "San Francisco",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null,
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 79,
    "name": "Sam's",
    "coordinates": {
      "latitude": 37.8061,
      "longitude": -122.4106
    },
    "type": "Bar",
    "neighborhood": "North Beach",
    "rating": 4.3,
    "pricing": "$",
    "hours": "Daily 11am–3am",
    "heroImage": venueImages[nameToImageKey("Sam's")]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Western",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 20,
    "name": "Shoji",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Cocktail Bar",
    "neighborhood": "SoMa",
    "rating": 4.3,
    "pricing": "$$$",
    "hours": "Tuesday-Saturday from 5:00 PM to 12:00 AM",
    "heroImage": venueImages[nameToImageKey('Shoji')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [
      "speakeasy feel",
      "seasonal menu",
      "date night",
      "reservations recommended"
    ],
    "description": "Japanese cocktail bar blending omakase-style hospitality with high-end mixology.",
    "ambiance": [
      "Japanese ingredients",
      "elegant space",
      "outdoor space"
    ],
    "cuisine": "Japanese",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ],
    "shortDescription": "Japanese cocktail bar blending omakase-style hospitality with high-end mixology.",
    "instagram": "https://www.instagram.com/shojisf",
    "accolades": "-",
    "recommendedDrinks": [
      "Cocktails",
      "Sake"
    ]
  },
  {
    "id": 17,
    "name": "Shuggie's Trash Pizza",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Bar",
    "neighborhood": "San Francisco",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null,
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 35,
    "name": "Smuggler's Cove",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Tiki Bar",
    "neighborhood": "Hayes Valley",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "Daily 5–1:15",
    "heroImage": venueImages[nameToImageKey("Smuggler's Cove")]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [
      "tiki",
      "immersive",
      "rum",
      "membership grog club exists"
    ],
    "description": "Iconic multi‑level tiki temple with hundreds of rums.",
    "ambiance": [
      "Tiki mugs",
      "elaborate garnishes"
    ],
    "cuisine": "None",
    "accolades": "World’s 50 Best Bars (featured)",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ],
    "shortDescription": "Iconic multi‑level tiki temple with hundreds of rums.",
    "instagram": "https://www.instagram.com/smugglerscovesf",
    "recommendedDrinks": [
      "Rum",
      "Tiki Cocktails"
    ]
  },
  {
    "id": 55,
    "name": "Snail Bar",
    "coordinates": {
      "latitude": 37.8044,
      "longitude": -122.2712
    },
    "type": "Bar",
    "neighborhood": "Oakland",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [
      "Hip",
      "minimalist",
      "intimate"
    ],
    "cuisine": null,
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 23,
    "name": "Starlite",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Bar",
    "neighborhood": "San Francisco",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null,
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 60,
    "name": "Taishan",
    "coordinates": {
      "latitude": 37.7941,
      "longitude": -122.4078
    },
    "type": "Bar",
    "neighborhood": "Chinatown",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "Daily 11am–3am",
    "heroImage": venueImages[nameToImageKey('Taishan')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Chinese",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 58,
    "name": "Tallboy",
    "coordinates": {
      "latitude": 37.8044,
      "longitude": -122.2712
    },
    "type": "Bar",
    "neighborhood": "Oakland",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [
      "Indie",
      "house",
      "playful hits"
    ],
    "tags": [],
    "description": "",
    "ambiance": [
      "Laid-back",
      "Nostalgic"
    ],
    "cuisine": null,
    "food": "100% vegan, chili dogs",
    "recommendedDrinks": [
      "Signature martinis",
      "Jell-O shots",
      "espresso martini slushies"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 66,
    "name": "Taqueria El Farolito",
    "coordinates": {
      "latitude": 37.7599,
      "longitude": -122.4148
    },
    "type": "Bar",
    "neighborhood": "Mission",
    "rating": 4.3,
    "pricing": "$",
    "hours": "Daily 10am–2:30am",
    "heroImage": venueImages[nameToImageKey('Taqueria El Farolito')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Mexican",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 96,
    "name": "Temple",
    "coordinates": {
      "latitude": 37.7786,
      "longitude": -122.4059
    },
    "type": "Bar",
    "neighborhood": "SoMa",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "10pm–4am",
    "heroImage": venueImages[nameToImageKey('Temple')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null,
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 39,
    "name": "The Halfway Club",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Bar",
    "neighborhood": "San Francisco",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null,
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 95,
    "name": "The Midway",
    "coordinates": {
      "latitude": 37.7577,
      "longitude": -122.3885
    },
    "type": "Bar",
    "neighborhood": "Dogpatch",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "6pm–3am",
    "heroImage": venueImages[nameToImageKey('The Midway')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null,
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 37,
    "name": "Tommy's Mexican Restaurant",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Mexican Restaurant Bar",
    "neighborhood": "Outer Richmond",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "Wed–Fri 5–8:30; Sat–Sun 1–8:30; Mon–Tue Closed",
    "heroImage": venueImages[nameToImageKey("Tommy's Mexican Restaurant")]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [
      "tequila",
      "classic",
      "institution",
      "ask about the tequila club"
    ],
    "description": "Legendary tequila shrine famed for its classic margarita.",
    "ambiance": [
      "Tequila list bible",
      "no‑frills room"
    ],
    "cuisine": "Mexican",
    "accolades": "World’s 50 Best Bars (featured)",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ],
    "shortDescription": "Legendary tequila shrine famed for its classic margarita.",
    "instagram": "https://www.instagram.com/tommysmexicansf",
    "recommendedDrinks": [
      "Tequila",
      "Margaritas"
    ]
  },
  {
    "id": 65,
    "name": "Toyose",
    "coordinates": {
      "latitude": 37.7534,
      "longitude": -122.4944
    },
    "type": "Bar",
    "neighborhood": "Outer Sunset",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "Daily 6pm–2am",
    "heroImage": venueImages[nameToImageKey('Toyose')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Korean",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 19,
    "name": "Trick Dog",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Cocktail Bar",
    "neighborhood": "Mission",
    "rating": 4.3,
    "pricing": "$$$",
    "hours": "Sun–Thu 4–12; Fri–Sat 4–2",
    "heroImage": venueImages[nameToImageKey('Trick Dog')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [
      "themed menus",
      "inventive",
      "buzzy",
      "menu changes periodically—collect the zines"
    ],
    "description": "Ever‑changing themed menus and playful, world‑class cocktails.",
    "ambiance": [
      "Creative menus",
      "lively buzz"
    ],
    "cuisine": "None",
    "accolades": "World’s 50 Best Bars; Tales; JBF nominee",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ],
    "shortDescription": "Ever‑changing themed menus and playful, world‑class cocktails.",
    "instagram": "https://www.instagram.com/trickdogbar",
    "recommendedDrinks": [
      "Cocktails"
    ]
  },
  {
    "id": 36,
    "name": "True Laurel",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Cocktail Bar",
    "neighborhood": "Mission",
    "rating": 4.3,
    "pricing": "$$$",
    "hours": "Tue–Wed 4–10; Thu 4–11; Fri 4–12; Sat 11–12; Sun 11–10; Mon Closed",
    "heroImage": venueImages[nameToImageKey('True Laurel')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [
      "seasonal",
      "chef‑y",
      "inventive",
      "food is a must here"
    ],
    "description": "Chef‑driven cocktail den pairing seasonal drinks with inventive bar food.",
    "ambiance": [
      "House ferments",
      "seasonal flavors"
    ],
    "cuisine": "New American",
    "accolades": "World’s 50 Best Bars (featured)",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ],
    "shortDescription": "Chef‑driven cocktail den pairing seasonal drinks with inventive bar food.",
    "instagram": "https://www.instagram.com/truelaurelsf",
    "recommendedDrinks": [
      "Cocktails",
      "Low‑ABV"
    ]
  },
  {
    "id": 73,
    "name": "Turtle Tower",
    "coordinates": {
      "latitude": 37.7946,
      "longitude": -122.3999
    },
    "type": "Bar",
    "neighborhood": "Financial District",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "Daily 10am–9pm",
    "heroImage": venueImages[nameToImageKey('Turtle Tower')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Vietnamese",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 78,
    "name": "Uncle Boy's",
    "coordinates": {
      "latitude": 37.7802,
      "longitude": -122.463
    },
    "type": "Bar",
    "neighborhood": "Inner Richmond",
    "rating": 4.3,
    "pricing": "$",
    "hours": "Daily 5pm–12am",
    "heroImage": venueImages[nameToImageKey("Uncle Boy's")]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Western",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 50,
    "name": "Ungrafted",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Wine Bar / Restaurant",
    "neighborhood": "Dogpatch",
    "rating": 4.3,
    "pricing": "$$$",
    "hours": "Tue–Wed 12–8; Thu–Sat 12–9; Sun–Mon Closed",
    "heroImage": venueImages[nameToImageKey('Ungrafted')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [
      "somm‑run",
      "flights",
      "date night",
      "reservations suggested"
    ],
    "description": "Sommelier‑run wine bar & restaurant with deep bottle list and snacks.",
    "ambiance": [
      "Flights",
      "serious bottle list"
    ],
    "cuisine": "Cal‑American",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ],
    "shortDescription": "Sommelier‑run wine bar & restaurant with deep bottle list and snacks.",
    "instagram": "https://www.instagram.com/ungraftedsf",
    "accolades": "—",
    "recommendedDrinks": [
      "Wine",
      "Champagne"
    ]
  },
  {
    "id": 3,
    "name": "Verjus",
    "pricing": "$$$",
    "ambiance": [
      "Darklit",
      "Dimly lit",
      "Rustic",
      "Conserva",
      "Red ceiling",
      "Weekly menu",
      "unique bottles",
      "great food"
    ],
    "musicGenre": [
      "Jazz"
    ],
    "food": "French (Big & Small Plates)",
    "dressCode": "Casual",
    "crowd": "Millennial",
    "optimalTime": "7:00 PM",
    "recommendedDrinks": [
      "Wine",
      "Cocktails"
    ],
    "tags": [
      "french cuisine",
      "wine bar",
      "upscale",
      "vinyl",
      "small plates",
      "date spot",
      "weekly changing menu",
      "unique wines",
      "delicious food",
      "same group as quince",
      "cotogna",
      "vinyl à verjus on weekends"
    ],
    "coordinates": {
      "latitude": 37.7849,
      "longitude": -122.4094
    },
    "type": "Wine Bar",
    "neighborhood": "Financial District",
    "rating": 4.5,
    "crowdLevel": "moderate",
    "waitTime": 30,
    "estimatedUber": "$15",
    "hours": "Tue–Wed 4–10; Thu 11:30–10; Fri–Sat 11:30–11; Sun–Mon Closed",
    "accolades": "Michelin Guide; James Beard nominee",
    "heroImage": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
    "description": "Parisian cave à manger with open kitchen and vintage hi‑fi; feels like a dinner party.",
    "gallery": [
      "",
      "",
      ""
    ],
    "cuisine": "French",
    "shortDescription": "Parisian cave à manger with open kitchen and vintage hi‑fi; feels like a dinner party.",
    "instagram": "https://www.instagram.com/verjus_sf"
  },
  {
    "id": 25,
    "name": "Waystone",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Bar",
    "neighborhood": "San Francisco",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null,
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 32,
    "name": "White Rabbit",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Bar",
    "neighborhood": "San Francisco",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null,
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 38,
    "name": "Wildhawk",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Cocktail Bar",
    "neighborhood": "Mission",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "Tue–Wed 5–12; Thu–Sat 5–2; Sun–Mon Closed",
    "heroImage": venueImages[nameToImageKey('Wildhawk')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [
      "aperitif",
      "neighborhood",
      "colorful",
      "good for small groups"
    ],
    "description": "Colorful corner cocktail bar with sherry and aperitif leanings.",
    "ambiance": [
      "Friendly bartenders",
      "neighborhood vibe"
    ],
    "cuisine": "None",
    "accolades": "—",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ],
    "shortDescription": "Colorful corner cocktail bar with sherry and aperitif leanings.",
    "instagram": "https://www.instagram.com/wildhawksf",
    "recommendedDrinks": [
      "Cocktails",
      "Sherry"
    ]
  },
  {
    "id": 71,
    "name": "Wok Station",
    "coordinates": {
      "latitude": 37.7534,
      "longitude": -122.4944
    },
    "type": "Bar",
    "neighborhood": "Outer Sunset",
    "rating": 4.3,
    "pricing": "$",
    "hours": "Mon–Sat 11am–9:30pm; Sun 12pm–9pm",
    "heroImage": venueImages[nameToImageKey('Wok Station')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Chinese",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 52,
    "name": "Yokai",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Bar",
    "neighborhood": "San Francisco",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null,
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  },
  {
    "id": 81,
    "name": "ZZAN",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Bar",
    "neighborhood": "Tenderloin",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "Daily 4pm–1am",
    "heroImage": venueImages[nameToImageKey('ZZAN')]?.hero || require('../../assets/icon.png'),
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Korean Fusion",
    "gallery": [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800"
    ]
  }
];

export const filterOptions = {
  "venueType": [
    "Club",
    "Bar",
    "Cocktail Bar",
    "Wine Bar",
    "Cocktail Salon",
    "Neighborhood / Cocktail Bar",
    "Hotel Bar",
    "Rooftop Bar",
    "Neighborhood Bar",
    "Speakeasy / Listening Bar",
    "Sake Bar / Wine Bar",
    "Wine Bar / Deli",
    "Wine Lounge",
    "Tiki Bar",
    "Mexican Restaurant Bar",
    "Wine Bar / Restaurant"
  ],
  "pricing": [
    "$$",
    "$$$",
    "$$$$",
    "$"
  ],
  "musicGenre": [
    "Classical",
    "Soul",
    "Funk",
    "Jazz Vinyl Sets",
    "funk",
    "jazz vinyl sets",
    "House",
    "Disco",
    "Jazz",
    "Soulful Electronic",
    "soulful electronic",
    "Chill Electronic",
    "Lounge",
    "Chill electronic",
    "lounge",
    "Live bands",
    "indie sleaze",
    "Spanish pop",
    "Mixed",
    "Lo-fi",
    "Ambient",
    "Eclectic Vinyl",
    "Low-fi",
    "ambient",
    "eclectic vinyl sets",
    "Synthwave",
    "Retro-funk",
    "Electronic",
    "retro-funk",
    "electronic",
    "Indie",
    "house",
    "playful hits"
  ],
  "ambiance": [
    "Quick service",
    "standing room",
    "Cozy",
    "Anchovy‑forward plates",
    "oysters",
    "inventive snacks",
    "Refined service",
    "seasonal pairings",
    "Warm Wood",
    "Vinyl Bar",
    "Warm wood",
    "vinyl bar",
    "cozy",
    "Vinyl on",
    "candlelight",
    "quiet chatter",
    "Darklit",
    "Red Lights",
    "Incense",
    "Dance floor",
    "international DJs",
    "weekend parties",
    "Martinis",
    "negronis",
    "Italian snacks",
    "Lively",
    "Dimly lit",
    "Small plates",
    "natural wine focus",
    "Friendly staff",
    "counter‑service vibes",
    "Mediterranean Coastal",
    "Candlelit",
    "Intimate",
    "Mediterranean coastal",
    "candlelit",
    "intimate",
    "Breakfast burritos (select hours)",
    "shareables",
    "Outdoor patio",
    "records wall",
    "Rooftop Lounge",
    "Panoramic Views",
    "Rooftop lounge",
    "panoramic views",
    "Sweeping vistas",
    "stylish crowd",
    "playful",
    "Mural-lit pink walls",
    "Porróns",
    "tinto",
    "jamón",
    "occasional live music",
    "Retro",
    "Neighborhood-y",
    "Pink Tones",
    "Retro-chic",
    "warm lighting",
    "Loud",
    "lively",
    "crowd‑pleasing bites",
    "Dive",
    "Music‑inspired cocktails",
    "live vinyl DJs",
    "Vinyl spins",
    "retail bottles",
    "Exposed brick",
    "Brooklyn vibe",
    "Big plates",
    "wide wine",
    "beer range",
    "Minimalist",
    "Modern",
    "Cozy room",
    "by‑the‑glass list",
    "light bites",
    "Futuristic",
    "Colorful Lighting",
    "Space-themed",
    "colorful lighting",
    "space-themed",
    "Creative cocktails",
    "relaxed crowd",
    "plants",
    "Hoagies till sell‑out",
    "Roof open on warm nights",
    "lively crowd",
    "Large space",
    "events",
    "Japanese ingredients",
    "elegant space",
    "outdoor space",
    "Tiki mugs",
    "elaborate garnishes",
    "Hip",
    "minimalist",
    "Laid-back",
    "Nostalgic",
    "Tequila list bible",
    "no‑frills room",
    "Creative menus",
    "lively buzz",
    "House ferments",
    "seasonal flavors",
    "Flights",
    "serious bottle list",
    "Rustic",
    "Conserva",
    "Red ceiling",
    "Weekly menu",
    "unique bottles",
    "great food",
    "Friendly bartenders",
    "neighborhood vibe"
  ],
  "dressCode": [
    "Casual",
    "Smart casual",
    "Upscale",
    "Casual, trendy",
    "Casual chic",
    "Trendy / fun"
  ],
  "neighborhood": [
    "SoMa",
    "San Francisco",
    "Mission",
    "Fillmore District",
    "Hayes Valley",
    "Cow Hollow",
    "Oakland",
    "Jackson Square",
    "Ocean Ave",
    "Castro",
    "Nob Hill",
    "North Beach",
    "Marina",
    "Tenderloin",
    "Mid‑Market",
    "Lower Nob Hill",
    "Mission District",
    "NoPa",
    "Union Square",
    "Inner Richmond",
    "Japantown",
    "Outer Sunset",
    "Chinatown",
    "Civic Center",
    "Dogpatch",
    "Outer Richmond",
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

export const moodMapping = {
  "chill": [
    "Bar Crenn",
    "Bar Gemini",
    "Bar Sprezzatura",
    "Buddy",
    "Celeste",
    "Chambers",
    "Charmaine's",
    "High Treason",
    "Press Club"
  ],
  "party": [
    "Bar Part Time",
    "Beaux",
    "Chambers",
    "Dalva",
    "Harlan Records",
    "Make‑Out Room",
    "Smuggler's Cove",
    "Tommy's Mexican Restaurant"
  ],
  "date": [
    "Anchovy Bar",
    "Bar Gemini",
    "Bodega North Beach",
    "Celeste",
    "El Chato",
    "Harlan Records",
    "High Treason",
    "Key Klub",
    "Millay",
    "PCH (Pacific Cocktail Haven)",
    "Shoji",
    "Ungrafted",
    "Verjus"
  ],
  "classy": [
    "Bar Crenn",
    "Bar Sprezzatura",
    "Charmaine's"
  ],
  "music": [
    "Anchovy Bar",
    "Bar Gemini",
    "Bar Part Time",
    "Celeste",
    "Charmaine's",
    "El Chato",
    "Harlan Records",
    "High Treason",
    "Key Klub",
    "Make‑Out Room",
    "Millay",
    "Mothership",
    "Tallboy",
    "Verjus"
  ],
  "drinks": [
    "Bar Crenn",
    "Bar Gemini",
    "Bodega North Beach",
    "El Chato",
    "Harlan Records",
    "Key Klub",
    "Millay",
    "Mothership",
    "Palm City",
    "Trick Dog",
    "Wildhawk"
  ]
};
