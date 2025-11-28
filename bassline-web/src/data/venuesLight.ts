import { VenueLight } from '@/types/venue';

// Lightweight venue data for fast initial map loading
// Only essential data needed for map markers - reduces bundle size by ~90%
export const venuesLight: VenueLight[] = [
  {
    "id": 1,
    "name": "Bar Part Time",
    "type": "Wine Bar",
    "neighborhood": "Mission",
    "rating": 4.3,
    "pricing": "$$",
    "coordinates": {
      "latitude": 37.7749,
      "longitude": -122.4194
    }
  },
  {
    "id": 2,
    "name": "The Snug",
    "type": "Cocktail Bar",
    "neighborhood": "Mission",
    "rating": 4.5,
    "pricing": "$$$",
    "coordinates": {
      "latitude": 37.7608,
      "longitude": -122.4147
    }
  },
  {
    "id": 3,
    "name": "Foreign Cinema",
    "type": "Restaurant",
    "neighborhood": "Mission",
    "rating": 4.4,
    "pricing": "$$$$",
    "coordinates": {
      "latitude": 37.7565,
      "longitude": -122.4194
    }
  },
  {
    "id": 4,
    "name": "Loló",
    "type": "Mexican Restaurant",
    "neighborhood": "Mission",
    "rating": 4.5,
    "pricing": "$$$",
    "coordinates": {
      "latitude": 37.7612,
      "longitude": -122.4194
    }
  },
  {
    "id": 5,
    "name": "Che Fico Alimentari",
    "type": "Italian Restaurant",
    "neighborhood": "Mission",
    "rating": 4.6,
    "pricing": "$$$",
    "coordinates": {
      "latitude": 37.7615,
      "longitude": -122.4194
    }
  },
  {
    "id": 6,
    "name": "Noe Valley Bakery",
    "type": "Bakery",
    "neighborhood": "Noe Valley",
    "rating": 4.7,
    "pricing": "$",
    "coordinates": {
      "latitude": 37.7508,
      "longitude": -122.4324
    }
  },
  {
    "id": 7,
    "name": "Haystack Pizza",
    "type": "Pizza Restaurant",
    "neighborhood": "Mission",
    "rating": 4.4,
    "pricing": "$$",
    "coordinates": {
      "latitude": 37.7638,
      "longitude": -122.4155
    }
  },
  {
    "id": 8,
    "name": "Bacco",
    "type": "Italian Restaurant",
    "neighborhood": "Noe Valley",
    "rating": 4.3,
    "pricing": "$$$",
    "coordinates": {
      "latitude": 37.7456,
      "longitude": -122.4247
    }
  },
  {
    "id": 9,
    "name": "L'Ardoise Bistro",
    "type": "French Restaurant",
    "neighborhood": "Noe Valley",
    "rating": 4.4,
    "pricing": "$$$",
    "coordinates": {
      "latitude": 37.7453,
      "longitude": -122.4241
    }
  },
  {
    "id": 10,
    "name": "Toast Eatery",
    "type": "Breakfast Restaurant",
    "neighborhood": "Noe Valley",
    "rating": 4.2,
    "pricing": "$$",
    "coordinates": {
      "latitude": 37.7458,
      "longitude": -122.4244
    }
  }
  // Add more venues as needed - keeping initial load small for performance
];


