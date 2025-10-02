import { Venue, FilterOptions, MoodMapping } from '@/types/venue';

export const venues: Venue[] = [
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null
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
    "cuisine": null
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
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
    "shortDescription": "Beloved neighborhood cocktail bar with a concise, dialed menu.",
    "accolades": "World’s 50 Best Bars (featured)",
    "instagram": "https://www.instagram.com/abvsf"
  },
  {
    "id": 5,
    "name": "Anchovy Bar",
    "coordinates": {
      "latitude": 37.7849,
      "longitude": -122.4144
    },
    "type": "Wine Bar",
    "neighborhood": "Fillmore District",
    "rating": 4.2,
    "pricing": "$$$",
    "hours": "Mon–Fri 5:30–9; Sat–Sun 5–9",
    "heroImage": "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400",
    "musicGenre": [
      "Classical"
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
    "description": "Leafy, coastal‑vibe seafood and wine bar by the State Bird team.",
    "ambiance": [
      "Cozy",
      "Anchovy‑forward plates",
      "oysters",
      "inventive snacks"
    ],
    "cuisine": "Seafood / Western",
    "dressCode": "Casual",
    "waitTime": "25",
    "shortDescription": "Leafy, coastal‑vibe seafood and wine bar by the State Bird team.",
    "accolades": "James Beard nominee",
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
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
    "instagram": "https://www.instagram.com/aninasf"
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
    "cuisine": null
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null
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
    "cuisine": null
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
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
    "shortDescription": "Elegant salon by Atelier Crenn—French omakase counter + lounge for canapés & cocktails.",
    "accolades": "Michelin‑starred restaurant group",
    "instagram": "https://www.instagram.com/barcrenn"
  },
  {
    "id": 9,
    "name": "Bar Gemini",
    "coordinates": {
      "latitude": 37.7549,
      "longitude": -122.4244
    },
    "type": "Wine Bar",
    "neighborhood": "Mission",
    "rating": 4.4,
    "pricing": "$$",
    "hours": "Mon–Tue 5–10; Wed 5–10; Thu 5–11; Fri–Sat 4–12; Sun Closed",
    "heroImage": "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400",
    "musicGenre": [
      "Soul",
      "Funk",
      "Jazz Vinyl Sets",
      "funk",
      "jazz vinyl sets"
    ],
    "tags": [
      "natural wine",
      "vinyl",
      "cozy",
      "date spot",
      "reservations recommended weekends"
    ],
    "description": "Minimal, sleek natural‑wine bar with low‑intervention gems.",
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
    "cuisine": "Western snacks",
    "dressCode": "Casual",
    "waitTime": "20",
    "shortDescription": "Minimal, sleek natural‑wine bar with low‑intervention gems.",
    "accolades": "—",
    "instagram": "https://www.instagram.com/bargeminisf"
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
    "cuisine": null
  },
  {
    "id": 1,
    "name": "Bar Part Time",
    "coordinates": {
      "latitude": 37.7599,
      "longitude": -122.4148
    },
    "type": "Wine Bar",
    "neighborhood": "Mission",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "Tue 5–11; Wed 5–11; Thu 5–12; Fri 5–1; Sat 5–1; Sun–Mon Closed",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400",
    "musicGenre": [
      "House",
      "Disco"
    ],
    "tags": [
      "listening bar",
      "dance floor",
      "happy hour",
      "vinyl",
      "international djs",
      "$10 cover on weekends"
    ],
    "description": "A glittering disco ball crowns a tight dance floor of natural‑wine lovers and vinyl DJs.",
    "ambiance": [
      "Darklit",
      "Red Lights",
      "Incense",
      "Dance floor",
      "international DJs",
      "weekend parties"
    ],
    "cuisine": "None",
    "dressCode": "Casual",
    "waitTime": "15",
    "shortDescription": "A glittering disco ball crowns a tight dance floor of natural‑wine lovers and vinyl DJs.",
    "accolades": "—",
    "yelpUrl": "https://www.yelp.com/biz/bar-part-time-san-francisco",
    "resyUrl": "https://resy.com/cities/sf/bar-part-time",
    "instagram": "https://www.instagram.com/barparttime"
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
    "cuisine": null
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
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
    "shortDescription": "Italian‑leaning cocktail & aperitivo lounge with refined service.",
    "accolades": "—",
    "instagram": "https://www.instagram.com/bar.sprezzatura"
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Korean"
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
    "heroImage": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
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
    "instagram": "https://www.instagram.com/beauxsf"
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Western"
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
    "cuisine": null
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Western"
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
    "cuisine": "Vietnamese"
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
    "heroImage": "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800",
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
    "accolades": "—",
    "instagram": "https://www.instagram.com/bodeganorthbeach"
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
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
    "shortDescription": "Chill neighborhood bar with amari, natty wine, and satisfying sandwiches.",
    "accolades": "—",
    "instagram": "https://www.instagram.com/buddysf"
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
    "cuisine": null
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
    "cuisine": null
  },
  {
    "id": 7,
    "name": "Celeste",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4094
    },
    "type": "Wine Bar",
    "neighborhood": "Marina",
    "rating": 4.5,
    "pricing": "$$",
    "hours": "Tue–Thu 4–11:30; Fri 2–12:30; Sat 2–12; Sun 11–7; Mon Closed",
    "heroImage": "https://images.unsplash.com/photo-1544148103-bf50c5e7836b?w=400",
    "musicGenre": [
      "Jazz",
      "Soulful Electronic",
      "soulful electronic"
    ],
    "tags": [
      "date night",
      "mediterranean",
      "cozy",
      "romantic",
      "sister to key klub",
      "bodega"
    ],
    "description": "Trendy, red‑lit wine bar with upbeat tunes and Mediterranean‑leaning bites.",
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
    "cuisine": "Mediterranean",
    "dressCode": "Smart casual",
    "waitTime": "30",
    "shortDescription": "Trendy, red‑lit wine bar with upbeat tunes and Mediterranean‑leaning bites.",
    "accolades": "—",
    "instagram": "https://www.instagram.com/celestesf"
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
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
    "shortDescription": "Poolside‑adjacent lounge with mid‑century flair at the Phoenix Hotel.",
    "accolades": "Michelin Guide mention",
    "instagram": "https://www.instagram.com/chambers_sf"
  },
  {
    "id": 10,
    "name": "Charmaine's",
    "coordinates": {
      "latitude": 37.7879,
      "longitude": -122.4074
    },
    "type": "Rooftop Bar",
    "neighborhood": "Mid‑Market",
    "rating": 4.2,
    "pricing": "$$$",
    "hours": "Mon–Thu 5–11; Fri–Sat 4–12; Sun 4–11",
    "heroImage": "https://images.unsplash.com/photo-1491316037411-40279662960e?w=400",
    "musicGenre": [
      "Chill Electronic",
      "Lounge",
      "Chill electronic",
      "lounge"
    ],
    "tags": [
      "scenic views",
      "elegant",
      "trendy",
      "rooftop",
      "heaters on",
      "windy evenings"
    ],
    "description": "Euro‑inspired rooftop lounge with fire pits and postcard skyline views.",
    "ambiance": [
      "Rooftop Lounge",
      "Panoramic Views",
      "Rooftop lounge",
      "panoramic views",
      "Sweeping vistas",
      "stylish crowd"
    ],
    "cuisine": "Western",
    "dressCode": "Upscale",
    "waitTime": "45",
    "shortDescription": "Euro‑inspired rooftop lounge with fire pits and postcard skyline views.",
    "accolades": "—",
    "instagram": "https://www.instagram.com/charmainessf"
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
    "cuisine": null
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Korean"
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
    "heroImage": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
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
    "instagram": "https://www.instagram.com/dalvasf"
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
    "cuisine": null
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
    "heroImage": "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800",
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
    "shortDescription": "Spanish taberna pouring curated wines, vermouth, and pintxos/tapas.",
    "accolades": "—",
    "instagram": "https://www.instagram.com/elchatosf"
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
    "cuisine": null
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
    "cuisine": null
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Western"
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
    "heroImage": "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Mediterranean"
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null
  },
  {
    "id": 4,
    "name": "Harlan Records",
    "coordinates": {
      "latitude": 37.7649,
      "longitude": -122.4248
    },
    "type": "Speakeasy / Listening Bar",
    "neighborhood": "Union Square",
    "rating": 4.4,
    "pricing": "$$",
    "hours": "Mon 2–12; Tue–Fri 2–1:30; Sat 4–1:30; Sun 4–12",
    "heroImage": "https://images.unsplash.com/photo-1510735166794-1e22c7d230f1?w=400",
    "musicGenre": [
      "House"
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
    "description": "Alley‑hidden Japanese‑leaning listening bar with eclectic vinyl sets.",
    "ambiance": [
      "Darklit",
      "Retro",
      "Dive",
      "Music‑inspired cocktails",
      "live vinyl DJs"
    ],
    "cuisine": "None",
    "dressCode": "Casual",
    "waitTime": "15",
    "shortDescription": "Alley‑hidden Japanese‑leaning listening bar with eclectic vinyl sets.",
    "accolades": "—",
    "instagram": "https://www.instagram.com/harlanrecordssf"
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
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
    "instagram": "https://www.instagram.com/hitopssf"
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
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
    "shortDescription": "Chill neighborhood wine bar with eclectic vinyl and smart bottle list.",
    "accolades": "—",
    "instagram": "https://www.instagram.com/hightreasonsf"
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
    "heroImage": "https://images.unsplash.com/photo-1595424762791-7ef88838ad01?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Japanese"
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
    "cuisine": null
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Chinese"
  },
  {
    "id": 2,
    "name": "Key Klub",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "type": "Wine Bar",
    "neighborhood": "Nob Hill",
    "rating": 4.1,
    "pricing": "$$",
    "hours": "Tue–Wed 4–11; Thu–Fri 4–12; Sat 2–12; Sun–Mon Closed",
    "heroImage": "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=400",
    "musicGenre": [
      "Mixed"
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
    "description": "Glowing lights, New American bites, and natural wine pours in a photogenic space.",
    "ambiance": [
      "Darklit",
      "Red Lights",
      "Exposed brick",
      "Brooklyn vibe",
      "Big plates",
      "wide wine",
      "beer range"
    ],
    "cuisine": "Western",
    "dressCode": "Casual",
    "waitTime": "20",
    "shortDescription": "Glowing lights, New American bites, and natural wine pours in a photogenic space.",
    "accolades": "—",
    "yelpUrl": "https://www.yelp.com/biz/key-klub-san-francisco",
    "resyUrl": "https://resy.com/cities/sf/key-klub",
    "instagram": "https://www.instagram.com/key.klubsf"
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
    "cuisine": null
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Chinese"
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
    "cuisine": null
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [
      "historic",
      "dive",
      "neon"
    ],
    "description": "Historic Chinatown dive with the infamous Chinese Mai Tai.",
    "ambiance": [],
    "cuisine": "None",
    "accolades": "—"
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
    "cuisine": null
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
    "heroImage": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
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
    "instagram": "https://www.instagram.com/makeoutroomsf"
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
    "cuisine": null
  },
  {
    "id": 6,
    "name": "Millay",
    "coordinates": {
      "latitude": 37.7549,
      "longitude": -122.4194
    },
    "type": "Sake Bar / Wine Bar",
    "neighborhood": "Mission",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "Mon/Wed/Thu 5–10; Fri 5–12; Sat 3–12; Sun 3–8; Tue Closed",
    "heroImage": "https://images.unsplash.com/photo-1595424762791-7ef88838ad01?w=400",
    "musicGenre": [
      "Lo-fi",
      "Ambient",
      "Eclectic Vinyl",
      "Low-fi",
      "ambient",
      "eclectic vinyl sets"
    ],
    "tags": [
      "sake bar",
      "date spot",
      "intimate",
      "natural wine",
      "bar‑only seating",
      "limited tables"
    ],
    "description": "Stylish sake‑and‑wine bar with pink neon, wood seating, and a tiny disco ball.",
    "ambiance": [
      "Minimalist",
      "Modern",
      "Cozy",
      "Cozy room",
      "by‑the‑glass list",
      "light bites"
    ],
    "cuisine": "Japanese",
    "dressCode": "Casual chic",
    "waitTime": "20",
    "shortDescription": "Stylish sake‑and‑wine bar with pink neon, wood seating, and a tiny disco ball.",
    "accolades": "—",
    "instagram": "https://www.instagram.com/millaysf"
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null
  },
  {
    "id": 8,
    "name": "Mothership",
    "coordinates": {
      "latitude": 37.7649,
      "longitude": -122.4294
    },
    "type": "Cocktail Bar",
    "neighborhood": "Mission",
    "rating": 4.1,
    "pricing": "$$",
    "hours": "Tue–Thu 4–12; Fri 4–2; Sat 2–2; Sun 2–10; Mon Closed",
    "heroImage": "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?w=400",
    "musicGenre": [
      "Synthwave",
      "Retro-funk",
      "Electronic",
      "retro-funk",
      "electronic"
    ],
    "tags": [
      "space bar",
      "immersive",
      "cocktails",
      "funky",
      "back patio closes earlier than bar"
    ],
    "description": "Verdant, space‑themed Mission hideaway with inventive drinks and a lush patio.",
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
    "cuisine": "None",
    "dressCode": "Trendy / fun",
    "waitTime": "15",
    "shortDescription": "Verdant, space‑themed Mission hideaway with inventive drinks and a lush patio.",
    "accolades": "—",
    "instagram": "https://www.instagram.com/mothershipsf"
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Indian"
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Western"
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
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
    "shortDescription": "South‑side hang known for hoagies, natural wine, and an easy vibe.",
    "accolades": "—",
    "instagram": "https://www.instagram.com/palmcitysf"
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Salvadoran"
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
    "accolades": "World’s Best 50 Bars"
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
    "heroImage": "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800",
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
    "instagram": "https://www.instagram.com/pchsfo"
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
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
    "shortDescription": "Bi‑level cocktail bar with a retractable roof and pool/arcade games.",
    "accolades": "—",
    "instagram": "https://www.instagram.com/peacekeepersf"
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
    "cuisine": null
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Western"
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
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
    "shortDescription": "Sleek subterranean wine lounge pouring flights from notable producers.",
    "accolades": "—",
    "instagram": "https://www.instagram.com/pressclubsf"
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Italian"
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
    "heroImage": "https://images.unsplash.com/photo-1595424762791-7ef88838ad01?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Japanese"
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null
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
    "cuisine": null
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
    "cuisine": null
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Western"
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
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
    "shortDescription": "Japanese cocktail bar blending omakase-style hospitality with high-end mixology.",
    "accolades": "-",
    "instagram": "https://www.instagram.com/shojisf"
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
    "cuisine": null
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
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
    "shortDescription": "Iconic multi‑level tiki temple with hundreds of rums.",
    "accolades": "World’s 50 Best Bars (featured)",
    "instagram": "https://www.instagram.com/smugglerscovesf"
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
    "cuisine": null
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
    "cuisine": null
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Chinese"
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
    "cuisine": null
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Mexican"
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null
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
    "cuisine": null
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": null
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
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
    "shortDescription": "Legendary tequila shrine famed for its classic margarita.",
    "accolades": "World’s 50 Best Bars (featured)",
    "instagram": "https://www.instagram.com/tommysmexicansf"
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Korean"
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
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
    "shortDescription": "Ever‑changing themed menus and playful, world‑class cocktails.",
    "accolades": "World’s 50 Best Bars; Tales; JBF nominee",
    "instagram": "https://www.instagram.com/trickdogbar"
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
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
    "shortDescription": "Chef‑driven cocktail den pairing seasonal drinks with inventive bar food.",
    "accolades": "World’s 50 Best Bars (featured)",
    "instagram": "https://www.instagram.com/truelaurelsf"
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Vietnamese"
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Western"
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
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
    "shortDescription": "Sommelier‑run wine bar & restaurant with deep bottle list and snacks.",
    "accolades": "—",
    "instagram": "https://www.instagram.com/ungraftedsf"
  },
  {
    "id": 3,
    "name": "Verjus",
    "coordinates": {
      "latitude": 37.7849,
      "longitude": -122.4094
    },
    "type": "Wine Bar",
    "neighborhood": "Financial District",
    "rating": 4.5,
    "pricing": "$$$",
    "hours": "Tue–Wed 4–10; Thu 11:30–10; Fri–Sat 11:30–11; Sun–Mon Closed",
    "heroImage": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
    "musicGenre": [
      "Jazz"
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
    "description": "Parisian cave à manger with open kitchen and vintage hi‑fi; feels like a dinner party.",
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
    "cuisine": "French",
    "dressCode": "Casual",
    "waitTime": "30",
    "shortDescription": "Parisian cave à manger with open kitchen and vintage hi‑fi; feels like a dinner party.",
    "accolades": "Michelin Guide; James Beard nominee",
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
    "cuisine": null
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
    "cuisine": null
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
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
    "shortDescription": "Colorful corner cocktail bar with sherry and aperitif leanings.",
    "accolades": "—",
    "instagram": "https://www.instagram.com/wildhawksf"
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Chinese"
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
    "cuisine": null
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
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Korean Fusion"
  }
];

export const filterOptions: FilterOptions = {
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

export const moodMapping: MoodMapping = {
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
