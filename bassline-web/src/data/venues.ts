import { Venue, FilterOptions, MoodMapping } from '@/types/venue';

export const venues: Venue[] = [
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
    "id": 5,
    "name": "Anchovy Bar",
    "coordinates": {
      "latitude": 37.7849,
      "longitude": -122.4144
    },
    "type": "Wine Bar",
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
      "date night",
      "anchovy emphasis"
    ],
    "description": "oyster bar inspired,",
    "ambiance": [
      "Cozy"
    ],
    "cuisine": "Seafood, Western",
    "dressCode": "Casual",
    "waitTime": "25",
    "shortDescription": "oyster bar inspired,",
    "accolades": "James Beard Award Finalist"
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
    "hours": "6 PM - 1 AM",
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
      "date spot"
    ],
    "description": "Cozy natural wine bar with soul and funk vinyl sets",
    "ambiance": [
      "Warm Wood",
      "Vinyl Bar",
      "Cozy",
      "Warm wood",
      "vinyl bar",
      "cozy"
    ],
    "cuisine": "Western",
    "dressCode": "Casual",
    "waitTime": "20"
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
      "vinyl",
      "international djs"
    ],
    "description": "$10 cover charge on weekends",
    "ambiance": [
      "Darklit",
      "Red Lights",
      "Incense"
    ],
    "cuisine": "None",
    "dressCode": "Casual",
    "waitTime": "15",
    "shortDescription": "$10 cover charge on weekends",
    "accolades": "Soundcloud",
    "yelpUrl": "https://www.yelp.com/biz/bar-part-time-san-francisco",
    "resyUrl": "https://resy.com/cities/sf/bar-part-time",
    "instagram": "https://www.instagram.com/barparttime?igsh=NTc4MTIwNjQ2YQ=="
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
    "hours": "",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Korean"
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
    "hours": "",
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
    "hours": "",
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
    "hours": "",
    "heroImage": "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800",
    "musicGenre": [],
    "tags": [
      "natural wine",
      "small plates",
      "date night",
      "casual dining",
      "natural wine focus"
    ],
    "description": "Burritos served saturday and sunday morning, sister bar to key klub and celeste",
    "ambiance": [
      "Lively",
      "Cozy",
      "Dimly lit"
    ],
    "cuisine": "Western",
    "shortDescription": "Burritos served saturday and sunday morning, sister bar to key klub and celeste"
  },
  {
    "id": 14,
    "name": "Buddy",
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
    "neighborhood": "SOMA",
    "rating": 4.5,
    "pricing": "$$$",
    "hours": "5:30 PM - 11 PM",
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
      "romantic"
    ],
    "description": "Intimate Mediterranean bar perfect for date nights",
    "ambiance": [
      "Mediterranean Coastal",
      "Candlelit",
      "Intimate",
      "Mediterranean coastal",
      "candlelit",
      "intimate"
    ],
    "cuisine": "Mediterranean",
    "dressCode": "Smart casual",
    "waitTime": "30"
  },
  {
    "id": 21,
    "name": "Chambers",
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
    "accolades": "Michelin Guide, James Beard Award Nominee"
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
      "Lounge",
      "Chill electronic",
      "lounge"
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
      "Panoramic Views",
      "Rooftop lounge",
      "panoramic views"
    ],
    "cuisine": "Western",
    "dressCode": "Upscale",
    "waitTime": "45"
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
    "hours": "",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Korean"
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
    "type": "Bar",
    "neighborhood": "San Francisco",
    "rating": 4.3,
    "pricing": "$$$",
    "hours": "",
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
      "late-night vibe"
    ],
    "description": "",
    "ambiance": [
      "Intimate",
      "playful",
      "Mural-lit pink walls"
    ],
    "cuisine": "Spanish"
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
    "type": "Bar",
    "neighborhood": "San Francisco",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [
      "Retro-chic",
      "warm lighting"
    ],
    "cuisine": "Vietnamese",
    "dressCode": "Casual, trendy"
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
    "hours": "",
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
    "hours": "",
    "heroImage": "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Mediterranean"
  },
  {
    "id": 4,
    "name": "Harlan Records",
    "coordinates": {
      "latitude": 37.7649,
      "longitude": -122.4248
    },
    "type": "Speakeasy",
    "neighborhood": "Union Square",
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
      "dj sets",
      "listening bar",
      "vinyl",
      "retro",
      "music inspired cocktails",
      "live vinyl dj sets"
    ],
    "description": "Tucked in an alley, this Japanese listening bar spins eclectic music in a cozy and low-key setting.",
    "ambiance": [
      "Darklit",
      "Retro",
      "Dive"
    ],
    "cuisine": "None",
    "dressCode": "Casual",
    "waitTime": "15",
    "shortDescription": "Tucked in an alley, this Japanese listening bar spins eclectic music in a cozy and low-key setting."
  },
  {
    "id": 43,
    "name": "High Treason",
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
    "hours": "",
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
    "hours": "",
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
    "hours": "6 PM - 2 AM",
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
      "beer"
    ],
    "description": "Glowing lights set the mood as guests enjoy New American bites and sip on natural wine pours.",
    "ambiance": [
      "Darklit",
      "Red Lights",
      "Exposed brick",
      "Brooklyn vibe"
    ],
    "cuisine": "American",
    "dressCode": "Casual",
    "waitTime": "20",
    "shortDescription": "Glowing lights set the mood as guests enjoy New American bites and sip on natural wine pours.",
    "accolades": "-",
    "yelpUrl": "https://www.yelp.com/biz/key-klub-san-francisco",
    "resyUrl": "https://resy.com/cities/sf/key-klub",
    "instagram": "https://www.instagram.com/key.klubsf/?hl=en"
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
    "hours": "",
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
    "type": "Sake Bar, Wine Bar",
    "neighborhood": "Mission",
    "rating": 4.3,
    "pricing": "$$",
    "hours": "6 PM - 12 AM",
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
      "natural wine"
    ],
    "description": "Minimalist sake bar with Japanese-inspired snacks and vinyl sets",
    "ambiance": [
      "Minimalist",
      "Modern",
      "Cozy"
    ],
    "cuisine": "Japanese",
    "dressCode": "Casual chic",
    "waitTime": "20"
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
    "hours": "7 PM - 2 AM",
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
      "funky"
    ],
    "description": "Futuristic space-themed bar with immersive cocktail experience",
    "ambiance": [
      "Futuristic",
      "Colorful Lighting",
      "Space-themed",
      "colorful lighting",
      "space-themed"
    ],
    "cuisine": "None",
    "dressCode": "Trendy / fun",
    "waitTime": "15"
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
    "hours": "",
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
    "hours": "",
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
    "hours": "Mon-Thurs Sun 10am-11pm, Fri-Sat until 2:30am",
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
    "id": 15,
    "name": "Peacekeeper",
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
    "hours": "Mon–Wed 7am–11pm; Thurs 7am-12am; Fri–Sat 24h; Sun 12am–11pm",
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
    "hours": "",
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
    "hours": "",
    "heroImage": "https://images.unsplash.com/photo-1595424762791-7ef88838ad01?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Japanese"
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
    "hours": "",
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
    "hours": "Daily ~11:00am–3am",
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
    "hours": "",
    "heroImage": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    "musicGenre": [],
    "tags": [],
    "description": "",
    "ambiance": [],
    "cuisine": "Mexican"
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
    "id": 37,
    "name": "Tommy's Mexican Restaurant",
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
    "hours": "",
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
    "accolades": "World’s Best 50 Bars, World's Best Cocktail Menu, Tales of the Cocktail, James Beard Award Nominee"
  },
  {
    "id": 36,
    "name": "True Laurel",
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
    "hours": "",
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
    "hours": "",
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
    "hours": "5:30 PM - 11 PM",
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
      "delicious food"
    ],
    "description": "Same group as Quince and Cotogna, vinyl à verjus every weekend",
    "ambiance": [
      "Darklit",
      "Dimly lit",
      "Rustic",
      "Conserva",
      "Red ceiling"
    ],
    "cuisine": "French",
    "dressCode": "Casual",
    "waitTime": "30",
    "shortDescription": "Same group as Quince and Cotogna, vinyl à verjus every weekend",
    "accolades": "Michelin Guide, James Beard Award Nominee",
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
    "hours": "",
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
  }
];

export const filterOptions: FilterOptions = {
  "venueType": [
    "Bar",
    "Wine Bar",
    "Lounge",
    "Speakeasy",
    "Sake Bar, Wine Bar",
    "Cocktail Bar"
  ],
  "pricing": [
    "$$",
    "$$$",
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
    "Cozy",
    "Warm Wood",
    "Vinyl Bar",
    "Warm wood",
    "vinyl bar",
    "cozy",
    "Darklit",
    "Red Lights",
    "Incense",
    "Lively",
    "Dimly lit",
    "Mediterranean Coastal",
    "Candlelit",
    "Intimate",
    "Mediterranean coastal",
    "candlelit",
    "intimate",
    "Rooftop Lounge",
    "Panoramic Views",
    "Rooftop lounge",
    "panoramic views",
    "playful",
    "Mural-lit pink walls",
    "Retro",
    "Neighborhood-y",
    "Pink Tones",
    "Retro-chic",
    "warm lighting",
    "Dive",
    "Exposed brick",
    "Brooklyn vibe",
    "Minimalist",
    "Modern",
    "Futuristic",
    "Colorful Lighting",
    "Space-themed",
    "colorful lighting",
    "space-themed",
    "Hip",
    "minimalist",
    "Laid-back",
    "Nostalgic",
    "Rustic",
    "Conserva",
    "Red ceiling"
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
    "San Francisco",
    "Castro",
    "Mission",
    "Oakland",
    "Ocean Ave",
    "Nob Hill",
    "North Beach",
    "SOMA",
    "Financial District",
    "Lower Nob Hill",
    "Union Square",
    "Japantown",
    "Outer Sunset",
    "Civic Center",
    "Inner Richmond",
    "Chinatown"
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
    "Bar Gemini",
    "Celeste",
    "Charmaine's",
    "Harlan Records",
    "Millay"
  ],
  "party": [
    "Bar Part Time",
    "Harlan Records"
  ],
  "date": [
    "Anchovy Bar",
    "Bar Gemini",
    "Bodega North Beach",
    "Celeste",
    "El Chato",
    "Harlan Records",
    "Millay",
    "Verjus"
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
    "El Chato",
    "Harlan Records",
    "Key Klub",
    "Millay",
    "Mothership",
    "Tallboy",
    "Verjus"
  ],
  "drinks": [
    "Bar Gemini",
    "Bodega North Beach",
    "Harlan Records",
    "Key Klub",
    "Millay",
    "Mothership"
  ]
};
