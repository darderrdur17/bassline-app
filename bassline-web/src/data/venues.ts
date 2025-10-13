import { Venue, FilterOptions, MoodMapping } from '@/types/venue';

export const venues: Venue[] = [
  {
    "id": 1,
    "name": "Bar Part Time",
    "type": "Wine Bar",
    "neighborhood": "Mission",
    "rating": 4.3,
    "pricing": "$$",
    "averageDrinkPrice": "$14–16 per wine glass",
    "hours": "Tue 5–11; Wed 5–11; Thu 5–12; Fri 5–1; Sat 5–1; Sun–Mon Closed",
    "heroImage": "/images/venues/bar-sprezzatura-hero.jpg",
    "description": "A glittering disco ball crowns a tight dance floor of natural‑wine lovers and vinyl DJs.",
    "tags": [
      "listening bar",
      "dance floor",
      "happy hour",
      "vinyl"
    ],
    "cuisine": null,
    "shortDescription": "A glittering disco ball crowns a tight dance floor of natural‑wine lovers and vinyl DJs.",
    "instagram": "https://www.instagram.com/barparttime",
    "ambiance": [
      "Dance floor",
      "international DJs",
      "weekend parties"
    ],
    "recommendedDrinks": [
      "Natural Wine",
      "Beer"
    ],
    "recommendations": [
      "Pet-nat by the glass",
      "orange wine flights"
    ],
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "goodToKnow": "$10 cover on weekends",
    "whereToGoIf": "you want to dance",
    "gallery": [
      "/images/venues/bar-part-time-2.jpg"
    ]
  },
  {
    "id": 2,
    "name": "Key Klub",
    "type": "Wine Bar",
    "neighborhood": "Nob Hill",
    "rating": 4.3,
    "pricing": "$$",
    "averageDrinkPrice": "$16–18 wine, $8 beer pint",
    "hours": "Tue–Wed 4–11; Thu–Fri 4–12; Sat 2–12; Sun–Mon Closed",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "description": "Glowing lights, New American bites, and natural wine pours in a photogenic space.",
    "tags": [
      "wine bar",
      "new american",
      "date spot"
    ],
    "cuisine": "Western",
    "shortDescription": "Glowing lights, New American bites, and natural wine pours in a photogenic space.",
    "instagram": "https://www.instagram.com/key.klubsf",
    "ambiance": [
      "Big plates",
      "wide wine & beer range"
    ],
    "recommendedDrinks": [
      "Natural Wine",
      "Beer"
    ],
    "recommendations": [
      "French toast",
      "Burger"
    ],
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "goodToKnow": "Sister spot to Bodega & Celeste",
    "whereToGoIf": "you want good pictures"
  },
  {
    "id": 3,
    "name": "Verjus",
    "type": "Wine Bar",
    "neighborhood": "Financial District",
    "rating": 4.3,
    "pricing": "$$$",
    "averageDrinkPrice": "$16–18 per glass",
    "hours": "Tue–Wed 4–10; Thu 11:30–10; Fri–Sat 11:30–11; Sun–Mon Closed",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "description": "Parisian cave à manger with open kitchen and vintage hi‑fi; feels like a dinner party.",
    "tags": [
      "wine bar",
      "vinyl",
      "small plates",
      "date spot"
    ],
    "cuisine": "French",
    "shortDescription": "Parisian cave à manger with open kitchen and vintage hi‑fi; feels like a dinner party.",
    "accolades": "Michelin Guide; James Beard nominee",
    "instagram": "https://www.instagram.com/verjus_sf",
    "ambiance": [
      "Weekly menu",
      "unique bottles",
      "great food"
    ],
    "recommendedDrinks": [
      "Wine",
      "Cocktails"
    ],
    "recommendations": [
      "Pain perdu",
      "pâté en croûte",
      "charred sausage w/ manchego"
    ],
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "goodToKnow": "Same group as Quince & Cotogna; vinyl à Verjus on weekends",
    "whereToGoIf": "you miss euro summer"
  },
  {
    "id": 4,
    "name": "Harlan Records",
    "type": "Speakeasy / Listening Bar",
    "neighborhood": "Union Square",
    "rating": 4.3,
    "pricing": "$$",
    "averageDrinkPrice": "$12–18 per drink",
    "hours": "Mon 2–12; Tue–Fri 2–1:30; Sat 4–1:30; Sun 4–12",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "description": "Alley‑hidden Japanese‑leaning listening bar with eclectic vinyl sets.",
    "tags": [
      "listening bar",
      "vinyl",
      "retro",
      "intimate"
    ],
    "cuisine": null,
    "shortDescription": "Alley‑hidden Japanese‑leaning listening bar with eclectic vinyl sets.",
    "instagram": "https://www.instagram.com/harlanrecordssf",
    "ambiance": [
      "Music‑inspired cocktails",
      "live vinyl DJs"
    ],
    "recommendedDrinks": [
      "Cocktails"
    ],
    "recommendations": [
      "Espresso Martini",
      "Japanese whisky highball"
    ],
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "goodToKnow": "Small space; arrive early",
    "whereToGoIf": "you love vinyl"
  },
  {
    "id": 5,
    "name": "Bodega North Beach",
    "type": "Wine Bar",
    "neighborhood": "North Beach",
    "rating": 4.3,
    "pricing": "$$",
    "averageDrinkPrice": "$12–18 per glass",
    "hours": "Tue–Fri 4–11; Sat 9–11; Sun 1–8; Mon Closed",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "description": "Neon‑pink corner shop pouring natural wine with playful New American bites.",
    "tags": [
      "natural wine",
      "small plates",
      "date night",
      "casual"
    ],
    "cuisine": "Western",
    "shortDescription": "Neon‑pink corner shop pouring natural wine with playful New American bites.",
    "instagram": "https://www.instagram.com/bodeganorthbeach",
    "ambiance": [
      "Small plates",
      "natural wine focus"
    ],
    "recommendedDrinks": [
      "Natural Wine",
      "Beer"
    ],
    "recommendations": [
      "Mushroom toast",
      "breakfast burrito (wknd)"
    ],
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "goodToKnow": "Sister to Key Klub & Celeste",
    "whereToGoIf": "you want a burrito with your mimosa"
  },
  {
    "id": 6,
    "name": "Anchovy Bar",
    "type": "Wine Bar",
    "neighborhood": "Fillmore District",
    "rating": 4.3,
    "pricing": "$$$",
    "averageDrinkPrice": "$9–13 beer, $15–22 wine",
    "hours": "Mon–Fri 5:30–9; Sat–Sun 5–9",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "description": "Leafy, coastal‑vibe seafood and wine bar by the State Bird team.",
    "tags": [
      "seafood",
      "date night",
      "small plates"
    ],
    "cuisine": "Seafood / Western",
    "shortDescription": "Leafy, coastal‑vibe seafood and wine bar by the State Bird team.",
    "accolades": "James Beard nominee",
    "instagram": "https://www.instagram.com/theanchovybar",
    "ambiance": [
      "Anchovy‑forward plates",
      "oysters",
      "inventive snacks"
    ],
    "recommendedDrinks": [
      "Beer",
      "Wine",
      "Vermouth"
    ],
    "recommendations": [
      "Anchovy toast",
      "oysters"
    ],
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "goodToKnow": "Walk‑ins close ~9pm; same group as State Bird Provisions and The Progress",
    "whereToGoIf": "you want fresh seafood"
  },
  {
    "id": 7,
    "name": "Millay",
    "type": "Sake Bar / Wine Bar",
    "neighborhood": "Mission",
    "rating": 4.3,
    "pricing": "$$",
    "averageDrinkPrice": "$12–16 per glass",
    "hours": "Mon/Wed/Thu 5–10; Fri 5–12; Sat 3–12; Sun 3–8; Tue Closed",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "description": "Stylish sake‑and‑wine bar with pink neon, wood seating, and a tiny disco ball.",
    "tags": [
      "natural wine",
      "sake bar",
      "date spot",
      "intimate"
    ],
    "cuisine": "Japanese",
    "shortDescription": "Stylish sake‑and‑wine bar with pink neon, wood seating, and a tiny disco ball.",
    "instagram": "https://www.instagram.com/millaysf",
    "ambiance": [
      "Cozy room",
      "by‑the‑glass list",
      "light bites"
    ],
    "recommendedDrinks": [
      "Sake",
      "Wine",
      "Highballs"
    ],
    "recommendations": [
      "Highballs",
      "junmai flights"
    ],
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "goodToKnow": "Bar‑only seating; limited tables",
    "whereToGoIf": "you want to try sake and natural wine"
  },
  {
    "id": 8,
    "name": "Celeste",
    "type": "Wine Bar",
    "neighborhood": "Marina",
    "rating": 4.3,
    "pricing": "$$",
    "averageDrinkPrice": "$14–18 per glass",
    "hours": "Tue–Thu 4–11:30; Fri 2–12:30; Sat 2–12; Sun 11–7; Mon Closed",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "description": "Trendy, red‑lit wine bar with upbeat tunes and Mediterranean‑leaning bites.",
    "tags": [
      "date night",
      "Mediterranean",
      "cozy"
    ],
    "cuisine": "Mediterranean",
    "shortDescription": "Trendy, red‑lit wine bar with upbeat tunes and Mediterranean‑leaning bites.",
    "instagram": "https://www.instagram.com/celestesf",
    "ambiance": [
      "Breakfast burritos (select hours)",
      "shareables"
    ],
    "recommendedDrinks": [
      "Wine",
      "Cocktails",
      "Vermouth"
    ],
    "recommendations": [
      "Herbal spritz",
      "vermouth & soda"
    ],
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "goodToKnow": "Sister to Key Klub & Bodega",
    "whereToGoIf": "you want mediterranean food with your wine"
  },
  {
    "id": 9,
    "name": "Mothership",
    "type": "Cocktail Bar",
    "neighborhood": "Mission",
    "rating": 4.3,
    "pricing": "$$",
    "averageDrinkPrice": "$13–17 cocktails",
    "hours": "Tue–Thu 4–12; Fri 4–2; Sat 2–2; Sun 2–10; Mon Closed",
    "heroImage": "/images/venues/the-midway-hero.jpg",
    "description": "Verdant, space‑themed Mission hideaway with inventive drinks and a lush patio.",
    "tags": [
      "space bar",
      "immersive",
      "cocktails",
      "funky"
    ],
    "cuisine": null,
    "shortDescription": "Verdant, space‑themed Mission hideaway with inventive drinks and a lush patio.",
    "instagram": "https://www.instagram.com/mothershipsf",
    "ambiance": [
      "Creative cocktails",
      "relaxed crowd",
      "plants"
    ],
    "recommendedDrinks": [
      "Cocktails"
    ],
    "recommendations": [
      "Frozen specials",
      "seasonal signatures"
    ],
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "goodToKnow": "Back patio closes earlier than bar",
    "whereToGoIf": "you want a great back patio",
    "gallery": [
      "/images/venues/the-midway-1.jpg",
      "/images/venues/the-midway-2.jpg"
    ]
  },
  {
    "id": 10,
    "name": "Bar Gemini",
    "type": "Wine Bar",
    "neighborhood": "Mission",
    "rating": 4.3,
    "pricing": "$$",
    "averageDrinkPrice": "$14–18 per glass",
    "hours": "Mon–Tue 5–10; Wed 5–10; Thu 5–11; Fri–Sat 4–12; Sun Closed",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "description": "Minimal, sleek natural‑wine bar with low‑intervention gems.",
    "tags": [
      "natural wine",
      "vinyl",
      "cozy",
      "date spot"
    ],
    "cuisine": "Western snacks",
    "shortDescription": "Minimal, sleek natural‑wine bar with low‑intervention gems.",
    "instagram": "https://www.instagram.com/bargeminisf",
    "ambiance": [
      "Vinyl on",
      "candlelight",
      "quiet chatter"
    ],
    "recommendedDrinks": [
      "Natural Wine",
      "Sherry"
    ],
    "recommendations": [
      "Sherry pour",
      "skin‑contact picks"
    ],
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "goodToKnow": "Reservations recommended weekends",
    "whereToGoIf": "you like rare bottles and clean design"
  },
  {
    "id": 11,
    "name": "Gigi's",
    "type": "Neighborhood Bar",
    "neighborhood": "NoPa",
    "rating": 4.3,
    "pricing": "$",
    "averageDrinkPrice": "$6–9 beer, $10–12 cocktails",
    "hours": "Tue–Sat 4–9; Sun–Mon Closed",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "description": "Casual Vietnamese hang with late‑night energy and playful drinks.",
    "tags": [
      "casual",
      "cheap eats",
      "lively"
    ],
    "cuisine": "Vietnamese",
    "shortDescription": "Casual Vietnamese hang with late‑night energy and playful drinks.",
    "ambiance": [
      "Loud",
      "lively",
      "crowd‑pleasing bites"
    ],
    "recommendedDrinks": [
      "Beer",
      "Cocktails",
      "Chambong"
    ],
    "recommendations": [
      "Chili‑salt wings",
      "chambong"
    ],
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "goodToKnow": "Great for groups; limited seating",
    "whereToGoIf": "you want Vietnamese snacks with cheap drinks"
  },
  {
    "id": 12,
    "name": "Charmaine's",
    "type": "Rooftop Bar",
    "neighborhood": "Mid‑Market",
    "rating": 4.3,
    "pricing": "$$$",
    "averageDrinkPrice": "$17–22 cocktails",
    "hours": "Mon–Thu 5–11; Fri–Sat 4–12; Sun 4–11",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "description": "Euro‑inspired rooftop lounge with fire pits and postcard skyline views.",
    "tags": [
      "scenic views",
      "elegant",
      "trendy"
    ],
    "cuisine": "Western",
    "shortDescription": "Euro‑inspired rooftop lounge with fire pits and postcard skyline views.",
    "instagram": "https://www.instagram.com/charmainessf",
    "ambiance": [
      "Sweeping vistas",
      "stylish crowd"
    ],
    "recommendedDrinks": [
      "Cocktails",
      "Wine"
    ],
    "recommendations": [
      "Martinis",
      "spritzes"
    ],
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "goodToKnow": "Heaters on; windy evenings",
    "whereToGoIf": "you want to feel glamorous with a view"
  },
  {
    "id": 13,
    "name": "El Chato",
    "type": "Wine Bar",
    "neighborhood": "Mission District",
    "rating": 4.3,
    "pricing": "$$$",
    "averageDrinkPrice": "$14–18 wine, $12–16 vermouth",
    "hours": "Mon–Thu 4–10; Fri–Sat 4–11; Sun 3–9",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "description": "Spanish taberna pouring curated wines, vermouth, and pintxos/tapas.",
    "tags": [
      "porróns",
      "communal tables",
      "intimate",
      "late‑night"
    ],
    "cuisine": "Spanish",
    "shortDescription": "Spanish taberna pouring curated wines, vermouth, and pintxos/tapas.",
    "instagram": "https://www.instagram.com/elchatosf",
    "ambiance": [
      "Porróns",
      "tinto",
      "jamón",
      "occasional live music"
    ],
    "recommendedDrinks": [
      "Wine",
      "Vermouth"
    ],
    "recommendations": [
      "Tinto",
      "porrón of vino blanco"
    ],
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "goodToKnow": "Small space; porrón etiquette encouraged",
    "whereToGoIf": "you’re craving Spain"
  },
  {
    "id": 14,
    "name": "Buddy",
    "type": "Neighborhood / Cocktail Bar",
    "neighborhood": "Mission",
    "rating": 4.3,
    "pricing": "$$",
    "averageDrinkPrice": "$12–15 cocktails",
    "hours": "Sun–Fri 4–10; Sat 2–10",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "description": "Chill neighborhood bar with amari, natty wine, and satisfying sandwiches.",
    "tags": [
      "casual",
      "amaro",
      "sandwiches",
      "neighborhood"
    ],
    "cuisine": "New American",
    "shortDescription": "Chill neighborhood bar with amari, natty wine, and satisfying sandwiches.",
    "instagram": "https://www.instagram.com/buddysf",
    "ambiance": [
      "Friendly staff",
      "counter‑service vibes"
    ],
    "recommendedDrinks": [
      "Wine",
      "Cocktails",
      "Beer"
    ],
    "recommendations": [
      "Amaro highball",
      "mortadella sando"
    ],
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "goodToKnow": "Walk‑in friendly",
    "whereToGoIf": "you want low‑key drinks & good snacks"
  },
  {
    "id": 15,
    "name": "Peacekeeper",
    "type": "Cocktail Bar",
    "neighborhood": "SoMa",
    "rating": 4.3,
    "pricing": "$$",
    "averageDrinkPrice": "$13–16 cocktails",
    "hours": "Mon–Thu 2–2; Fri 2–2; Sat–Sun 1–2",
    "heroImage": "/images/venues/peacekeeper-hero.jpg",
    "description": "Bi‑level cocktail bar with a retractable roof and pool/arcade games.",
    "tags": [
      "retractable roof",
      "games",
      "lively"
    ],
    "cuisine": null,
    "shortDescription": "Bi‑level cocktail bar with a retractable roof and pool/arcade games.",
    "instagram": "https://www.instagram.com/peacekeepersf",
    "ambiance": [
      "Roof open on warm nights",
      "lively crowd"
    ],
    "recommendedDrinks": [
      "Cocktails",
      "Beer",
      "Wine"
    ],
    "recommendations": [
      "Margaritas",
      "mezcal cocktails"
    ],
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "goodToKnow": "Lines form on weekends",
    "whereToGoIf": "you want open‑air drinks and games"
  },
  {
    "id": 16,
    "name": "PCH (Pacific Cocktail Haven)",
    "type": "Cocktail Bar",
    "neighborhood": "Union Square",
    "rating": 4.3,
    "pricing": "$$$",
    "averageDrinkPrice": "$16–20 cocktails",
    "hours": "Mon–Sat 5–12; Sun Closed",
    "heroImage": "/images/venues/pch-pacific-cocktail-haven-hero.jpg",
    "description": "Renowned cocktail bar with Pacific/Asian flavor profiles and creative technique.",
    "tags": [
      "award‑winning",
      "inventive",
      "date spot"
    ],
    "cuisine": null,
    "shortDescription": "Renowned cocktail bar with Pacific/Asian flavor profiles and creative technique.",
    "accolades": "World’s 50 Best Bars (featured)",
    "instagram": "https://www.instagram.com/pchsfo",
    "ambiance": [
      "Balanced",
      "inventive signatures"
    ],
    "recommendedDrinks": [
      "Cocktails"
    ],
    "recommendations": [
      "Claremont Club",
      "Banana Life"
    ],
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "goodToKnow": "Reservations recommended",
    "whereToGoIf": "you want top‑tier cocktails",
    "gallery": [
      "/images/venues/peacekeeper-1.jpg",
      "/images/venues/peacekeeper-2.jpg"
    ]
  },
  {
    "id": 17,
    "name": "Bar Sprezzatura",
    "type": "Cocktail Bar",
    "neighborhood": "Jackson Square",
    "rating": 4.3,
    "pricing": "$$$",
    "averageDrinkPrice": "$16–20 cocktails",
    "hours": "Mon–Wed 11–9; Thu–Fri 11–10; Sat 4–10; Sun Closed",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "description": "Italian‑leaning cocktail & aperitivo lounge with refined service.",
    "tags": [
      "aperitivo",
      "elegant",
      "classic"
    ],
    "cuisine": "Italian",
    "shortDescription": "Italian‑leaning cocktail & aperitivo lounge with refined service.",
    "instagram": "https://www.instagram.com/bar.sprezzatura",
    "ambiance": [
      "old-school vibe",
      "seafood",
      "big plates"
    ],
    "recommendedDrinks": [
      "Cocktails",
      "Amari"
    ],
    "recommendations": [
      "Sbagliato",
      "Martini",
      "Negronis",
      "tuna carpaccio"
    ],
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "goodToKnow": "Dress‑ier crowd",
    "whereToGoIf": "you want aperitivo hour done right"
  },
  {
    "id": 18,
    "name": "Trick Dog",
    "type": "Cocktail Bar",
    "neighborhood": "Mission",
    "rating": 4.3,
    "pricing": "$$$",
    "averageDrinkPrice": "$15–19 cocktails",
    "hours": "Sun–Thu 4–12; Fri–Sat 4–2",
    "heroImage": "/images/venues/trick-dog-hero.jpg",
    "description": "Ever‑changing themed menus and playful, world‑class cocktails.",
    "tags": [
      "themed menus",
      "inventive",
      "buzzy"
    ],
    "cuisine": null,
    "shortDescription": "Ever‑changing themed menus and playful, world‑class cocktails.",
    "accolades": "World’s 50 Best Bars; Tales; JBF nominee",
    "instagram": "https://www.instagram.com/trickdogbar",
    "ambiance": [
      "Creative menus",
      "lively buzz"
    ],
    "recommendedDrinks": [
      "Cocktails"
    ],
    "recommendations": [
      "Whatever’s on the current themed list"
    ],
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "goodToKnow": "Menu changes periodically—collect the zines",
    "whereToGoIf": "you want a menu that’s a concept",
    "gallery": [
      "/images/venues/trick-dog-1.jpg",
      "/images/venues/trick-dog-2.jpg"
    ]
  },
  {
    "id": 19,
    "name": "Chambers",
    "type": "Hotel Bar",
    "neighborhood": "Tenderloin",
    "rating": 4.3,
    "pricing": "$$$",
    "averageDrinkPrice": "$15–19 cocktails",
    "hours": "Thu 5–11; Fri–Sat 5–12; Sun–Wed Closed",
    "heroImage": "/images/venues/chambers-hero.jpg",
    "description": "Poolside‑adjacent lounge with mid‑century flair at the Phoenix Hotel.",
    "tags": [
      "retro",
      "patio",
      "hotel bar"
    ],
    "cuisine": "Cal‑American",
    "shortDescription": "Poolside‑adjacent lounge with mid‑century flair at the Phoenix Hotel.",
    "accolades": "Michelin Guide mention",
    "instagram": "https://www.instagram.com/chambers_sf",
    "ambiance": [
      "Outdoor patio",
      "records wall"
    ],
    "recommendedDrinks": [
      "Cocktails",
      "Wine"
    ],
    "recommendations": [
      "Old Fashioned",
      "spritz"
    ],
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "goodToKnow": "Great before/after shows",
    "whereToGoIf": "you want a stylish retro night"
  },
  {
    "id": 20,
    "name": "ABV",
    "type": "Cocktail Bar",
    "neighborhood": "Mission",
    "rating": 4.3,
    "pricing": "$$",
    "averageDrinkPrice": "$12–16 cocktails",
    "hours": "Daily 4–2 (Kitchen till Midnight)",
    "heroImage": "/images/venues/abv-hero.jpg",
    "description": "Beloved neighborhood cocktail bar with a concise, dialed menu.",
    "tags": [
      "classic",
      "fast",
      "reliable"
    ],
    "cuisine": "Snacky",
    "shortDescription": "Beloved neighborhood cocktail bar with a concise, dialed menu.",
    "accolades": "World’s 50 Best Bars (featured)",
    "instagram": "https://www.instagram.com/abvsf",
    "ambiance": [
      "Quick service",
      "standing room"
    ],
    "recommendedDrinks": [
      "Cocktails",
      "Beer"
    ],
    "recommendations": [
      "Gimlet",
      "Old Fashioned"
    ],
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "goodToKnow": "Often crowded—go early",
    "whereToGoIf": "you want flawless classics",
    "gallery": [
      "/images/venues/chambers-1.jpg",
      "/images/venues/chambers-2.jpg"
    ]
  },
  {
    "id": 21,
    "name": "Smuggler's Cove",
    "type": "Tiki Bar",
    "neighborhood": "Hayes Valley",
    "rating": 4.3,
    "pricing": "$$",
    "averageDrinkPrice": "$12–16 cocktails",
    "hours": "Daily 5–1:15",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "description": "Iconic multi‑level tiki temple with hundreds of rums.",
    "tags": [
      "tiki",
      "immersive",
      "rum"
    ],
    "cuisine": null,
    "shortDescription": "Iconic multi‑level tiki temple with hundreds of rums.",
    "accolades": "World’s 50 Best Bars (featured)",
    "instagram": "https://www.instagram.com/smugglerscovesf",
    "ambiance": [
      "Tiki mugs",
      "elaborate garnishes"
    ],
    "recommendedDrinks": [
      "Rum",
      "Tiki Cocktails"
    ],
    "recommendations": [
      "Mai Tai",
      "Zombie"
    ],
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "goodToKnow": "Membership grog club exists",
    "whereToGoIf": "you want tiki escapism"
  },
  {
    "id": 22,
    "name": "True Laurel",
    "type": "Cocktail Bar",
    "neighborhood": "Mission",
    "rating": 4.3,
    "pricing": "$$$",
    "averageDrinkPrice": "$15–19 cocktails",
    "hours": "Tue–Wed 4–10; Thu 4–11; Fri 4–12; Sat 11–12; Sun 11–10; Mon Closed",
    "heroImage": "/images/venues/true-laurel-hero.jpg",
    "description": "Chef‑driven cocktail den pairing seasonal drinks with inventive bar food.",
    "tags": [
      "seasonal",
      "chef‑y",
      "inventive"
    ],
    "cuisine": "New American",
    "shortDescription": "Chef‑driven cocktail den pairing seasonal drinks with inventive bar food.",
    "accolades": "World’s 50 Best Bars (featured)",
    "instagram": "https://www.instagram.com/truelaurelsf",
    "ambiance": [
      "House ferments",
      "seasonal flavors"
    ],
    "recommendedDrinks": [
      "Cocktails",
      "Low‑ABV"
    ],
    "recommendations": [
      "TL Margarita",
      "patty melt"
    ],
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "goodToKnow": "Food is a must here",
    "whereToGoIf": "you want chef energy with cocktails",
    "gallery": [
      "/images/venues/true-laurel-1.jpg",
      "/images/venues/true-laurel-2.jpg"
    ]
  },
  {
    "id": 23,
    "name": "Tommy's Mexican Restaurant",
    "type": "Mexican Restaurant Bar",
    "neighborhood": "Outer Richmond",
    "rating": 4.3,
    "pricing": "$$",
    "averageDrinkPrice": "$12–15 tequila/margs",
    "hours": "Wed–Fri 5–8:30; Sat–Sun 1–8:30; Mon–Tue Closed",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "description": "Legendary tequila shrine famed for its classic margarita.",
    "tags": [
      "tequila",
      "classic",
      "institution"
    ],
    "cuisine": "Mexican",
    "shortDescription": "Legendary tequila shrine famed for its classic margarita.",
    "accolades": "World’s 50 Best Bars (featured)",
    "instagram": "https://www.instagram.com/tommysmexicansf",
    "ambiance": [
      "Tequila list bible",
      "no‑frills room"
    ],
    "recommendedDrinks": [
      "Tequila",
      "Margaritas"
    ],
    "recommendations": [
      "Tommy’s Margarita"
    ],
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "goodToKnow": "Ask about the tequila club",
    "whereToGoIf": "you love agave spirits"
  },
  {
    "id": 24,
    "name": "Wildhawk",
    "type": "Cocktail Bar",
    "neighborhood": "Mission",
    "rating": 4.3,
    "pricing": "$$",
    "averageDrinkPrice": "$13–16 cocktails",
    "hours": "Tue–Wed 5–12; Thu–Sat 5–2; Sun–Mon Closed",
    "heroImage": "/images/venues/wildhawk-hero.jpg",
    "description": "Colorful corner cocktail bar with sherry and aperitif leanings.",
    "tags": [
      "aperitif",
      "neighborhood",
      "colorful"
    ],
    "cuisine": null,
    "shortDescription": "Colorful corner cocktail bar with sherry and aperitif leanings.",
    "instagram": "https://www.instagram.com/wildhawksf",
    "ambiance": [
      "Friendly bartenders",
      "neighborhood vibe"
    ],
    "recommendedDrinks": [
      "Cocktails",
      "Sherry"
    ],
    "recommendations": [
      "Sherry cobbler",
      "martini"
    ],
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "goodToKnow": "Good for small groups",
    "whereToGoIf": "you want aperitif‑forward drinks",
    "gallery": [
      "/images/venues/wildhawk-1.jpg",
      "/images/venues/wildhawk-2.jpg"
    ]
  },
  {
    "id": 25,
    "name": "Bar Crenn",
    "type": "Cocktail Salon",
    "neighborhood": "Cow Hollow",
    "rating": 4.3,
    "pricing": "$$$$",
    "averageDrinkPrice": "$22–30+ cocktails / pairings",
    "hours": "Tue–Thu 4:30–11; Fri–Sat 4:30–12; Sun–Mon Closed",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "description": "Elegant salon by Atelier Crenn—French omakase counter + lounge for canapés & cocktails.",
    "tags": [
      "luxury",
      "omakase",
      "special occasion"
    ],
    "cuisine": "French",
    "shortDescription": "Elegant salon by Atelier Crenn—French omakase counter + lounge for canapés & cocktails.",
    "accolades": "Michelin‑starred restaurant group",
    "instagram": "https://www.instagram.com/barcrenn",
    "ambiance": [
      "Refined service",
      "seasonal pairings"
    ],
    "recommendedDrinks": [
      "Cocktails",
      "Wine",
      "Champagne"
    ],
    "recommendations": [
      "Martini service",
      "seasonal omakase"
    ],
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "goodToKnow": "Reservations essential",
    "whereToGoIf": "you want a high‑end, artistic experience"
  },
  {
    "id": 26,
    "name": "Press Club",
    "type": "Wine Lounge",
    "neighborhood": "SoMa",
    "rating": 4.3,
    "pricing": "$$$",
    "averageDrinkPrice": "$16–20 wine flights",
    "hours": "Wed–Thu 5–11; Fri–Sat 4–12; Sun 3–9; Mon–Tue Closed",
    "heroImage": "/images/venues/press-club-hero.jpg",
    "description": "Sleek subterranean wine lounge pouring flights from notable producers.",
    "tags": [
      "sleek",
      "corporate‑friendly",
      "spacious"
    ],
    "cuisine": null,
    "shortDescription": "Sleek subterranean wine lounge pouring flights from notable producers.",
    "instagram": "https://www.instagram.com/pressclubsf",
    "ambiance": [
      "Large space",
      "events"
    ],
    "recommendedDrinks": [
      "Wine",
      "Champagne"
    ],
    "recommendations": [
      "Producer flights"
    ],
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "goodToKnow": "Great for groups/events",
    "whereToGoIf": "you want a polished tasting lounge"
  },
  {
    "id": 27,
    "name": "High Treason",
    "type": "Wine Bar",
    "neighborhood": "Inner Richmond",
    "rating": 4.3,
    "pricing": "$$",
    "averageDrinkPrice": "$12–16 per glass",
    "hours": "Daily 4–11 (Fri–Sat until Midnight)",
    "heroImage": "/images/venues/high-treason-hero.jpg",
    "description": "Chill neighborhood wine bar with eclectic vinyl and smart bottle list.",
    "tags": [
      "vinyl",
      "retail",
      "cozy"
    ],
    "cuisine": null,
    "shortDescription": "Chill neighborhood wine bar with eclectic vinyl and smart bottle list.",
    "instagram": "https://www.instagram.com/hightreasonsf",
    "ambiance": [
      "Vinyl spins",
      "retail bottles"
    ],
    "recommendedDrinks": [
      "Wine",
      "Beer"
    ],
    "recommendations": [
      "Skin‑contact picks",
      "sparkling flights"
    ],
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "goodToKnow": "Retail bottle shop pricing to‑go",
    "whereToGoIf": "you want low‑key natty wine",
    "gallery": [
      "/images/venues/press-club-1.jpg",
      "/images/venues/press-club-2.jpg"
    ]
  },
  {
    "id": 28,
    "name": "Palm City",
    "type": "Wine Bar / Deli",
    "neighborhood": "Outer Sunset",
    "rating": 4.3,
    "pricing": "$$",
    "averageDrinkPrice": "$12–15 wine/beer",
    "hours": "Wed–Sun 12–9 (beer & wine till 9); Mon–Tue 4–10 (kitchen till 9)",
    "heroImage": "/images/venues/palm-city-hero.jpg",
    "description": "South‑side hang known for hoagies, natural wine, and an easy vibe.",
    "tags": [
      "hoagies",
      "natural wine",
      "casual"
    ],
    "cuisine": "Deli / American",
    "shortDescription": "South‑side hang known for hoagies, natural wine, and an easy vibe.",
    "instagram": "https://www.instagram.com/palmcitysf",
    "ambiance": [
      "Hoagies till sell‑out"
    ],
    "recommendedDrinks": [
      "Wine",
      "Beer"
    ],
    "recommendations": [
      "Italian hoagie",
      "hoagie salad"
    ],
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "goodToKnow": "Order early—sandos sell out",
    "whereToGoIf": "you want excellent sandwiches with wine",
    "gallery": [
      "/images/venues/palm-city-1.jpg",
      "/images/venues/palm-city-2.jpg"
    ]
  },
  {
    "id": 29,
    "name": "Ungrafted",
    "type": "Wine Bar / Restaurant",
    "neighborhood": "Dogpatch",
    "rating": 4.3,
    "pricing": "$$$",
    "averageDrinkPrice": "$15–20 per glass",
    "hours": "Tue–Wed 12–8; Thu–Sat 12–9; Sun–Mon Closed",
    "heroImage": "/images/venues/ungrafted-hero.jpg",
    "description": "Sommelier‑run wine bar & restaurant with deep bottle list and snacks.",
    "tags": [
      "somm‑run",
      "flights",
      "date night"
    ],
    "cuisine": "Cal‑American",
    "shortDescription": "Sommelier‑run wine bar & restaurant with deep bottle list and snacks.",
    "instagram": "https://www.instagram.com/ungraftedsf",
    "ambiance": [
      "Flights",
      "serious bottle list"
    ],
    "recommendedDrinks": [
      "Wine",
      "Champagne"
    ],
    "recommendations": [
      "Blind flight",
      "sparkling picks"
    ],
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "goodToKnow": "Reservations suggested",
    "whereToGoIf": "you want som‑level guidance"
  },
  {
    "id": 30,
    "name": "Li Po Cocktail Lounge",
    "type": "Dive Bar",
    "neighborhood": "Chinatown",
    "rating": 4.3,
    "pricing": "$",
    "averageDrinkPrice": "$9–12 cocktails",
    "hours": "Mon–Wed 2–1; Thu–Fri 2–2; Sat 1–2; Sun 1–1",
    "heroImage": "/images/venues/li-po-cocktail-lounge-hero.jpg",
    "description": "Historic Chinatown dive with the infamous Chinese Mai Tai.",
    "tags": [
      "historic",
      "dive",
      "neon"
    ],
    "cuisine": null,
    "shortDescription": "Historic Chinatown dive with the infamous Chinese Mai Tai.",
    "ambiance": [
      "Cash‑only vibe",
      "neon cave"
    ],
    "recommendedDrinks": [
      "Mai Tais",
      "Beer"
    ],
    "recommendations": [
      "Chinese Mai Tai"
    ],
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "goodToKnow": "Cash preferred; strong pours",
    "whereToGoIf": "you want a classic SF dive",
    "gallery": [
      "/images/venues/ungrafted-1.jpg",
      "/images/venues/ungrafted-2.jpg"
    ]
  },
  {
    "id": 31,
    "name": "Make‑Out Room",
    "type": "Music Venue / Bar",
    "neighborhood": "Mission",
    "rating": 4.3,
    "pricing": "$",
    "averageDrinkPrice": "$8–12 cocktails/beer",
    "hours": "Tue–Sun 6–2; Mon Closed",
    "heroImage": "/images/venues/make-out-room-hero.jpg",
    "description": "Mission institution for live bands, DJ nights, and indie dance parties.",
    "tags": [
      "indie",
      "dance floor",
      "live music"
    ],
    "cuisine": null,
    "shortDescription": "Mission institution for live bands, DJ nights, and indie dance parties.",
    "instagram": "https://www.instagram.com/makeoutroomsf",
    "ambiance": [
      "Themed nights",
      "cover charges"
    ],
    "recommendedDrinks": [
      "Beer",
      "Cocktails"
    ],
    "recommendations": [
      "Draft beer",
      "well drinks"
    ],
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "goodToKnow": "Cash at door for some shows",
    "whereToGoIf": "you want to dance to indie",
    "gallery": [
      "/images/venues/make-out-room-1.jpg",
      "/images/venues/make-out-room-2.jpg"
    ]
  },
  {
    "id": 32,
    "name": "Hi‑Tops",
    "type": "Sports Bar",
    "neighborhood": "Castro",
    "rating": 4.3,
    "pricing": "$",
    "averageDrinkPrice": "$8–12 beer/cocktails",
    "hours": "Mon–Wed 12–12; Thu–Fri 12–2; Sat 10–2; Sun 10–12",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "description": "Lively sports‑centric Castro bar with a big, friendly crowd.",
    "tags": [
      "queer",
      "sports",
      "lively"
    ],
    "cuisine": "Bar snacks",
    "shortDescription": "Lively sports‑centric Castro bar with a big, friendly crowd.",
    "instagram": "https://www.instagram.com/hitopssf",
    "ambiance": [
      "Games on",
      "pitchers",
      "shots"
    ],
    "recommendedDrinks": [
      "Beer",
      "Cocktails"
    ],
    "recommendations": [
      "Frozen drinks",
      "beer pitchers"
    ],
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "goodToKnow": "Gets packed during big games",
    "whereToGoIf": "you want a queer sports bar vibe"
  },
  {
    "id": 33,
    "name": "Beaux",
    "type": "Nightclub",
    "neighborhood": "Castro",
    "rating": 4.3,
    "pricing": "$$",
    "averageDrinkPrice": "$10–14 cocktails",
    "hours": "Daily 3–2 (Sun from 12)",
    "heroImage": "/images/venues/beaux-hero.jpg",
    "description": "Popular Castro nightclub with themed drag/dance nights.",
    "tags": [
      "drag",
      "dance",
      "nightclub"
    ],
    "cuisine": null,
    "shortDescription": "Popular Castro nightclub with themed drag/dance nights.",
    "instagram": "https://www.instagram.com/beauxsf",
    "ambiance": [
      "Drag shows",
      "DJs",
      "lines"
    ],
    "recommendedDrinks": [
      "Cocktails",
      "Shots"
    ],
    "recommendations": [
      "Specialty slushies"
    ],
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "goodToKnow": "Arrive early on weekends",
    "whereToGoIf": "you want a big night out"
  },
  {
    "id": 34,
    "name": "Anina",
    "type": "Cocktail Bar",
    "neighborhood": "Hayes Valley",
    "rating": 4.3,
    "pricing": "$$",
    "averageDrinkPrice": "$11–14 cocktails",
    "hours": "Inside: Mon–Fri 2–2; Sat–Sun 12–2 (Patio hours vary)",
    "heroImage": "/images/venues/anina-hero.jpg",
    "description": "Sunny Hayes Valley patio bar with spritz towers and palm vibes.",
    "tags": [
      "patio",
      "group‑friendly",
      "daytime"
    ],
    "cuisine": null,
    "shortDescription": "Sunny Hayes Valley patio bar with spritz towers and palm vibes.",
    "instagram": "https://www.instagram.com/aninasf",
    "ambiance": [
      "Large patio",
      "group tables"
    ],
    "recommendedDrinks": [
      "Cocktails",
      "Spritzes"
    ],
    "recommendations": [
      "Spritz tower",
      "slushies"
    ],
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "goodToKnow": "Great for sunny afternoons",
    "whereToGoIf": "you want group‑friendly day drinks",
    "gallery": [
      "/images/venues/beaux-1.jpg",
      "/images/venues/beaux-2.jpg"
    ]
  },
  {
    "id": 35,
    "name": "Dalva",
    "type": "Neighborhood Bar + Back Room",
    "neighborhood": "Mission",
    "rating": 4.3,
    "pricing": "$",
    "averageDrinkPrice": "$9–12 cocktails/beer",
    "hours": "Mon–Tue 5–12; Wed–Sat 5–2; Sun 5–12",
    "heroImage": "/images/venues/dalva-hero.jpg",
    "description": "Beloved Mission standby; back‑room ‘Hideout’ hosts DJs and dancing.",
    "tags": [
      "dance",
      "DJs",
      "classic"
    ],
    "cuisine": null,
    "shortDescription": "Beloved Mission standby; back‑room ‘Hideout’ hosts DJs and dancing.",
    "instagram": "https://www.instagram.com/dalvasf",
    "ambiance": [
      "Crowded weekends",
      "DJs in Hideout"
    ],
    "recommendedDrinks": [
      "Beer",
      "Cocktails"
    ],
    "recommendations": [
      "Shot & beer",
      "house specials"
    ],
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "goodToKnow": "Hideout opens later; check nights",
    "whereToGoIf": "you want a classic Mission night",
    "gallery": [
      "/images/venues/dalva-1.jpg",
      "/images/venues/dalva-2.jpg"
    ]
  },
  {
    "id": 36,
    "name": "Shoji",
    "type": "Cocktail Bar",
    "neighborhood": "SoMa",
    "rating": 4.3,
    "pricing": "$$$",
    "averageDrinkPrice": "$16–20 cocktails",
    "hours": "Tuesday-Saturday from 5:00 PM to 12:00 AM",
    "heroImage": "/images/venues/shoji-hero.jpg",
    "description": "Japanese cocktail bar blending omakase-style hospitality with high-end mixology.",
    "tags": [
      "speakeasy feel",
      "seasonal menu",
      "date night"
    ],
    "cuisine": "Japanese",
    "shortDescription": "Japanese cocktail bar blending omakase-style hospitality with high-end mixology.",
    "accolades": "-",
    "instagram": "https://www.instagram.com/shojisf",
    "ambiance": [
      "Elegant space",
      "outdoor space"
    ],
    "recommendedDrinks": [
      "Cocktails",
      "Sake"
    ],
    "recommendations": [
      "Shochu highball",
      "seasonal cocktail",
      "matcha",
      "burger"
    ],
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "goodToKnow": "Reservations recommended",
    "whereToGoIf": "you want a good meal with refined Japanese-inspired cocktails",
    "gallery": [
      "/images/venues/shoji-1.jpg",
      "/images/venues/shoji-2.jpg"
    ]
  },
  {
    "id": 37,
    "name": "Monroe's",
    "type": "Club/Lounge",
    "neighborhood": "North Beach",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "10pm–2am",
    "heroImage": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
    "tags": [
      "nightlife",
      "dancing"
    ],
    "musicGenre": [
      "Top 40’s",
      "rap"
    ],
    "openPast2AM": false,
    "whereToGoIf": "you want a younger crowd",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    }
  },
  {
    "id": 38,
    "name": "Audio",
    "type": "Club",
    "neighborhood": "SoMa",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "10pm–2am+",
    "heroImage": "/images/venues/audio-hero.jpg",
    "tags": [
      "nightlife",
      "dancing"
    ],
    "musicGenre": [
      "House",
      "techno",
      "EDM"
    ],
    "openPast2AM": true,
    "whereToGoIf": "you want the best sound system",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    }
  },
  {
    "id": 39,
    "name": "Halcyon",
    "type": "Warehouse",
    "neighborhood": "SoMa",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "11pm–late",
    "heroImage": "/images/venues/halcyon-hero.jpg",
    "tags": [
      "nightlife",
      "dancing"
    ],
    "musicGenre": [
      "Techno",
      "house"
    ],
    "openPast2AM": true,
    "whereToGoIf": "you're not ready to go home",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    }
  },
  {
    "id": 40,
    "name": "Public Works",
    "type": "Warehouse",
    "neighborhood": "Mission",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "9pm–3am",
    "heroImage": "/images/venues/public-works-hero.jpg",
    "tags": [
      "nightlife",
      "dancing"
    ],
    "musicGenre": [
      "House",
      "techno",
      "hip-hop"
    ],
    "openPast2AM": true,
    "whereToGoIf": "you want a warehouse-style party",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    }
  },
  {
    "id": 41,
    "name": "1015 Folsom",
    "type": "Mega-club",
    "neighborhood": "SoMa",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "10pm–3am",
    "heroImage": "/images/venues/1015-folsom-hero.jpg",
    "tags": [
      "nightlife",
      "dancing"
    ],
    "musicGenre": [
      "EDM",
      "hip-hop",
      "top 40’s"
    ],
    "openPast2AM": true,
    "whereToGoIf": "you want to experience the most iconic club in the Bay Area",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "gallery": [
      "/images/venues/public-works-1.jpg",
      "/images/venues/public-works-2.jpg"
    ]
  },
  {
    "id": 42,
    "name": "The Midway",
    "type": "Warehouse",
    "neighborhood": "Dogpatch",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "6pm–3am",
    "heroImage": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
    "tags": [
      "nightlife",
      "dancing"
    ],
    "musicGenre": [
      "Electronic",
      "live shows"
    ],
    "openPast2AM": true,
    "whereToGoIf": "you want a festival-like warehouse experience",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    }
  },
  {
    "id": 43,
    "name": "Temple",
    "type": "Multi-room",
    "neighborhood": "SoMa",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "10pm–4am",
    "heroImage": "/images/venues/temple-hero.jpg",
    "tags": [
      "nightlife",
      "dancing"
    ],
    "musicGenre": [
      "EDM",
      "house",
      "hip-hop"
    ],
    "openPast2AM": true,
    "whereToGoIf": "you want multi-level stages & Vegas-style energy",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    }
  },
  {
    "id": 44,
    "name": "Pinecrest",
    "type": "Restaurant",
    "neighborhood": "Union Square",
    "rating": 4.3,
    "pricing": "$",
    "hours": "Mon–Wed 7am–11pm; Thu 7am–12am; Fri–Sat 24h; Sun 12am–11pm",
    "heroImage": "/images/venues/pinecrest-hero.jpg",
    "description": "Late night Western spot in Union Square",
    "shortDescription": "Late night Western spot in Union Square",
    "tags": [
      "late night",
      "food",
      "western"
    ],
    "cuisine": "Western",
    "recommendations": [
      "Steak & eggs",
      "chili hash browns",
      "banana pancakes"
    ],
    "whereToGoIf": "you need late night food",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    }
  ,
    "gallery": [
      "/images/venues/the-midway-1.jpg",
      "/images/venues/the-midway-2.jpg"
    ]},
  {
    "id": 45,
    "name": "Taishan",
    "type": "Restaurant",
    "neighborhood": "Chinatown",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "Daily 11am–3am",
    "heroImage": "/images/venues/taishan-hero.jpg",
    "description": "Late night Chinese spot in Chinatown",
    "shortDescription": "Late night Chinese spot in Chinatown",
    "tags": [
      "late night",
      "food",
      "chinese"
    ],
    "cuisine": "Chinese",
    "recommendations": [
      "Eel claypot rice",
      "pork tripe soup",
      "beef bone pot"
    ],
    "whereToGoIf": "you need late night food",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    }
  },
  {
    "id": 46,
    "name": "Grubstake",
    "type": "Restaurant",
    "neighborhood": "Lower Nob Hill",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "Daily 5pm–4am",
    "heroImage": "/images/venues/grubstake-hero.jpg",
    "description": "Late night Western spot in Lower Nob Hill",
    "shortDescription": "Late night Western spot in Lower Nob Hill",
    "tags": [
      "late night",
      "food",
      "western"
    ],
    "cuisine": "Western",
    "recommendations": [
      "Codfish plate",
      "cheeseburger",
      "pie"
    ],
    "whereToGoIf": "you need late night food",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    }
  },
  {
    "id": 47,
    "name": "Cocobang",
    "type": "Restaurant",
    "neighborhood": "Lower Nob Hill",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "Daily 5pm–2am",
    "heroImage": "/images/venues/cocobang-hero.jpg",
    "description": "Late night Korean spot in Lower Nob Hill",
    "shortDescription": "Late night Korean spot in Lower Nob Hill",
    "tags": [
      "late night",
      "food",
      "korean"
    ],
    "cuisine": "Korean",
    "recommendations": [
      "Kimchi fried rice",
      "corn cheese",
      "spicy tofu soup"
    ],
    "whereToGoIf": "you need late night food",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "gallery": [
      "/images/venues/taishan-1.jpg",
      "/images/venues/taishan-2.jpg"
    ]
  },
  {
    "id": 48,
    "name": "Hinodeya",
    "type": "Restaurant",
    "neighborhood": "Japantown",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "Daily 11am–9:30pm",
    "heroImage": "/images/venues/hinodeya-hero.jpg",
    "description": "Late night Japanese spot in Japantown",
    "shortDescription": "Late night Japanese spot in Japantown",
    "tags": [
      "late night",
      "food",
      "japanese"
    ],
    "cuisine": "Japanese",
    "recommendations": [
      "Spicy miso ramen",
      "tonkotsu ramen"
    ],
    "whereToGoIf": "you need late night food",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "gallery": [
      "/images/venues/hinodeya-1.jpg",
      "/images/venues/hinodeya-2.jpg"
    ]
  },
  {
    "id": 49,
    "name": "Public Izakaya",
    "type": "Restaurant",
    "neighborhood": "Lower Nob Hill",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "Tue–Sat 5pm–11pm; Sun–Mon Closed",
    "heroImage": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    "description": "Late night Japanese spot in Lower Nob Hill",
    "shortDescription": "Late night Japanese spot in Lower Nob Hill",
    "tags": [
      "late night",
      "food",
      "japanese"
    ],
    "cuisine": "Japanese",
    "recommendations": [
      "Yakitori skewers",
      "karaage"
    ],
    "whereToGoIf": "you need late night food",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    }
  },
  {
    "id": 50,
    "name": "Toyose",
    "type": "Restaurant",
    "neighborhood": "Outer Sunset",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "Daily 6pm–2am",
    "heroImage": "/images/venues/toyose-hero.jpg",
    "description": "Late night Korean spot in Outer Sunset",
    "shortDescription": "Late night Korean spot in Outer Sunset",
    "tags": [
      "late night",
      "food",
      "korean"
    ],
    "cuisine": "Korean",
    "recommendations": [
      "Seafood pancake",
      "kimchi stew",
      "fried rice"
    ],
    "whereToGoIf": "you need late night food",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    }
  },
  {
    "id": 51,
    "name": "Taqueria El Farolito",
    "type": "Restaurant",
    "neighborhood": "Mission",
    "rating": 4.3,
    "pricing": "$",
    "hours": "Daily 10am–2:30am",
    "heroImage": "/images/venues/taqueria-el-farolito-hero.jpg",
    "description": "Late night Mexican spot in Mission",
    "shortDescription": "Late night Mexican spot in Mission",
    "tags": [
      "late night",
      "food",
      "mexican"
    ],
    "cuisine": "Mexican",
    "recommendations": [
      "Super burrito",
      "lengua tacos"
    ],
    "whereToGoIf": "you need late night food",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    }
  },
  {
    "id": 52,
    "name": "Joyful Garden",
    "type": "Restaurant",
    "neighborhood": "Castro",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "Daily 11am–10pm",
    "heroImage": "/images/venues/joyful-garden-hero.jpg",
    "description": "Late night Chinese spot in Castro",
    "shortDescription": "Late night Chinese spot in Castro",
    "tags": [
      "late night",
      "food",
      "chinese"
    ],
    "cuisine": "Chinese",
    "recommendations": [
      "Spicy tofu",
      "stir-fried noodles"
    ],
    "whereToGoIf": "you need late night food",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "gallery": [
      "/images/venues/toyose-1.jpg",
      "/images/venues/toyose-2.jpg"
    ]
  },
  {
    "id": 53,
    "name": "Orphan Andy's",
    "type": "Restaurant",
    "neighborhood": "Castro",
    "rating": 4.3,
    "pricing": "$",
    "hours": "Daily 24h",
    "heroImage": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    "description": "Late night Western spot in Castro",
    "shortDescription": "Late night Western spot in Castro",
    "tags": [
      "late night",
      "food",
      "western"
    ],
    "cuisine": "Western",
    "recommendations": [
      "Patty melt",
      "chicken-fried steak",
      "hotcakes"
    ],
    "whereToGoIf": "you need late night food",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    }
  },
  {
    "id": 54,
    "name": "Bob's Donut",
    "type": "Restaurant",
    "neighborhood": "Nob Hill",
    "rating": 4.3,
    "pricing": "$",
    "hours": "Daily 24h",
    "heroImage": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    "description": "Late night Western spot in Nob Hill",
    "shortDescription": "Late night Western spot in Nob Hill",
    "tags": [
      "late night",
      "food",
      "western"
    ],
    "cuisine": "Western",
    "recommendations": [
      "Apple fritter",
      "bear claw",
      "glazed donut"
    ],
    "whereToGoIf": "you need late night food",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    }
  },
  {
    "id": 55,
    "name": "Naan N Curry",
    "type": "Restaurant",
    "neighborhood": "Civic Center",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "Daily 11am–3am",
    "heroImage": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    "description": "Late night Indian spot in Civic Center",
    "shortDescription": "Late night Indian spot in Civic Center",
    "tags": [
      "late night",
      "food",
      "indian"
    ],
    "cuisine": "Indian",
    "recommendations": [
      "Chicken tikka masala",
      "garlic naan",
      "lamb biryani"
    ],
    "whereToGoIf": "you need late night food",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    }
  },
  {
    "id": 56,
    "name": "Wok Station",
    "type": "Restaurant",
    "neighborhood": "Outer Sunset",
    "rating": 4.3,
    "pricing": "$",
    "hours": "Mon–Sat 11am–9:30pm; Sun 12pm–9pm",
    "heroImage": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    "description": "Late night Chinese spot in Outer Sunset",
    "shortDescription": "Late night Chinese spot in Outer Sunset",
    "tags": [
      "late night",
      "food",
      "chinese"
    ],
    "cuisine": "Chinese",
    "recommendations": [
      "Salt & pepper wings",
      "chow mein",
      "fried rice"
    ],
    "whereToGoIf": "you need late night food",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    }
  },
  {
    "id": 57,
    "name": "Gyro Xpress",
    "type": "Restaurant",
    "neighborhood": "Castro",
    "rating": 4.3,
    "pricing": "$",
    "hours": "Mon–Sat 11am–10pm; Sun Closed",
    "heroImage": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    "description": "Late night Mediterranean spot in Castro",
    "shortDescription": "Late night Mediterranean spot in Castro",
    "tags": [
      "late night",
      "food",
      "mediterranean"
    ],
    "cuisine": "Mediterranean",
    "recommendations": [
      "Lamb gyro plate",
      "hummus",
      "fries"
    ],
    "whereToGoIf": "you need late night food",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    }
  },
  {
    "id": 58,
    "name": "Turtle Tower",
    "type": "Restaurant",
    "neighborhood": "Financial District",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "Daily 10am–9pm",
    "heroImage": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    "description": "Late night Vietnamese spot in Financial District",
    "shortDescription": "Late night Vietnamese spot in Financial District",
    "tags": [
      "late night",
      "food",
      "vietnamese"
    ],
    "cuisine": "Vietnamese",
    "recommendations": [
      "Pho ga",
      "Hanoi fried chicken"
    ],
    "whereToGoIf": "you need late night food",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    }
  },
  {
    "id": 59,
    "name": "Bay Pocha",
    "type": "Restaurant",
    "neighborhood": "Ocean Ave",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "Mon–Thu 5pm–11pm; Fri–Sat 5pm–12am; Sun 5pm–10pm",
    "heroImage": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    "description": "Late night Korean spot in Ocean Ave",
    "shortDescription": "Late night Korean spot in Ocean Ave",
    "tags": [
      "late night",
      "food",
      "korean"
    ],
    "cuisine": "Korean",
    "recommendations": [
      "Bossam pork",
      "army stew",
      "corn cheese"
    ],
    "whereToGoIf": "you need late night food",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    }
  },
  {
    "id": 60,
    "name": "Beep's Burgers",
    "type": "Restaurant",
    "neighborhood": "Ocean Ave",
    "rating": 4.3,
    "pricing": "$",
    "hours": "Daily 11am–12am",
    "heroImage": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    "description": "Late night Western spot in Ocean Ave",
    "shortDescription": "Late night Western spot in Ocean Ave",
    "tags": [
      "late night",
      "food",
      "western"
    ],
    "cuisine": "Western",
    "recommendations": [
      "Beep’s burger",
      "garlic fries",
      "milkshake"
    ],
    "whereToGoIf": "you need late night food",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    }
  },
  {
    "id": 61,
    "name": "Panchita's Pupuseria Restaurant",
    "type": "Restaurant",
    "neighborhood": "Mission",
    "rating": 4.3,
    "pricing": "$",
    "hours": "Mon–Thu & Sun 10am–11pm; Fri–Sat 10am–2:30am",
    "heroImage": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    "description": "Late night Salvadoran spot in Mission",
    "shortDescription": "Late night Salvadoran spot in Mission",
    "tags": [
      "late night",
      "food",
      "salvadoran"
    ],
    "cuisine": "Salvadoran",
    "recommendations": [
      "Revuelta pupusas",
      "tamales"
    ],
    "whereToGoIf": "you need late night food",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    }
  },
  {
    "id": 62,
    "name": "Primo Pizza",
    "type": "Restaurant",
    "neighborhood": "Inner Richmond",
    "rating": 4.3,
    "pricing": "$",
    "hours": "Mon–Thu 11am–10pm; Fri–Sat 11am–11pm; Sun 12pm–10pm",
    "heroImage": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    "description": "Late night Italian spot in Inner Richmond",
    "shortDescription": "Late night Italian spot in Inner Richmond",
    "tags": [
      "late night",
      "food",
      "italian"
    ],
    "cuisine": "Italian",
    "recommendations": [
      "Pepperoni slice",
      "meat lover’s pizza"
    ],
    "whereToGoIf": "you need late night food",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    }
  },
  {
    "id": 63,
    "name": "Uncle Boy's",
    "type": "Restaurant",
    "neighborhood": "Inner Richmond",
    "rating": 4.3,
    "pricing": "$",
    "hours": "Daily 5pm–12am",
    "heroImage": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    "description": "Late night Western spot in Inner Richmond",
    "shortDescription": "Late night Western spot in Inner Richmond",
    "tags": [
      "late night",
      "food",
      "western"
    ],
    "cuisine": "Western",
    "recommendations": [
      "Garlic fries",
      "burgers"
    ],
    "whereToGoIf": "you need late night food",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    }
  },
  {
    "id": 64,
    "name": "Sam's",
    "type": "Restaurant",
    "neighborhood": "North Beach",
    "rating": 4.3,
    "pricing": "$",
    "hours": "Daily 11am–3am",
    "heroImage": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    "description": "Late night Western spot in North Beach",
    "shortDescription": "Late night Western spot in North Beach",
    "tags": [
      "late night",
      "food",
      "western"
    ],
    "cuisine": "Western",
    "recommendations": [
      "Cheeseburger",
      "onion rings"
    ],
    "whereToGoIf": "you need late night food",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    }
  },
  {
    "id": 65,
    "name": "Kowloon Tong Dessert Cafe",
    "type": "Restaurant",
    "neighborhood": "Outer Sunset",
    "rating": 4.3,
    "pricing": "$",
    "hours": "Daily 1pm–12am",
    "heroImage": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    "description": "Late night Chinese spot in Outer Sunset",
    "shortDescription": "Late night Chinese spot in Outer Sunset",
    "tags": [
      "late night",
      "food",
      "chinese"
    ],
    "cuisine": "Chinese",
    "recommendations": [
      "Mango sago",
      "black sesame tofu pudding"
    ],
    "whereToGoIf": "you need late night food",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    }
  },
  {
    "id": 66,
    "name": "ZZAN",
    "type": "Restaurant",
    "neighborhood": "Tenderloin",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "Daily 4pm–1am",
    "heroImage": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    "description": "Late night Korean Fusion spot in Tenderloin",
    "shortDescription": "Late night Korean Fusion spot in Tenderloin",
    "tags": [
      "late night",
      "food",
      "korean fusion"
    ],
    "cuisine": "Korean Fusion",
    "recommendations": [
      "Soju cocktails",
      "Korean tapas",
      "corn cheese",
      "fried chicken"
    ],
    "whereToGoIf": "you need late night food",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    }
  }
];

export const filterOptions: FilterOptions = {
  "venueType": ["Wine Bar", "Speakeasy / Listening Bar", "Sake Bar / Wine Bar", "Cocktail Bar", "Neighborhood Bar", "Rooftop Bar", "Neighborhood / Cocktail Bar", "Hotel Bar", "Tiki Bar", "Mexican Restaurant Bar", "Cocktail Salon", "Wine Lounge", "Wine Bar / Deli", "Wine Bar / Restaurant", "Dive Bar", "Music Venue / Bar", "Sports Bar", "Nightclub", "Neighborhood Bar + Back Room", "Club/Lounge", "Club", "Warehouse", "Mega-club", "Multi-room", "Restaurant"],
  "pricing": ["$", "$$", "$$$", "$$$$"],
  "neighborhood": ["Mission", "Nob Hill", "Financial District", "Union Square", "North Beach", "Fillmore District", "Marina", "NoPa", "Mid‑Market", "Mission District", "SoMa", "Jackson Square", "Tenderloin", "Hayes Valley", "Outer Richmond", "Cow Hollow", "Inner Richmond", "Outer Sunset", "Dogpatch", "Chinatown", "Castro", "Lower Nob Hill", "Japantown", "Civic Center", "Ocean Ave"],
  "hours": ["Open Now", "Past 2 AM", "24 Hours"]
};

export const moodMapping: MoodMapping = {
  "chill": ["Key Klub","Verjus","Bodega North Beach","Anchovy Bar","Millay","Celeste","Bar Gemini","PCH (Pacific Cocktail Haven)","High Treason","Ungrafted"],
  "party": ["Monroe's","Audio","Halcyon","Public Works","1015 Folsom","The Midway","Temple"],
  "date": ["Key Klub","Verjus","Millay","Bar Gemini","PCH (Pacific Cocktail Haven)"],
  "lateNight": ["Monroe's","Audio","Halcyon","Public Works","1015 Folsom","The Midway","Temple","Pinecrest","Taishan","Grubstake"]
};
