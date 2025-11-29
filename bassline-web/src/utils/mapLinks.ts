const clampZoom = (zoom: number) => {
  if (Number.isNaN(zoom)) {
    return 16;
  }
  return Math.max(1, Math.min(19, Math.round(zoom)));
};

export const getOpenStreetMapShareUrl = (
  latitude: number,
  longitude: number,
  zoom: number = 16
) => {
  const safeZoom = clampZoom(zoom);
  // https://www.openstreetmap.org/?mlat={lat}&mlon={lon}#map={zoom}/{lat}/{lon}
  return `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=${safeZoom}/${latitude}/${longitude}`;
};

export const getGoogleMapsShareUrl = (
  latitude: number,
  longitude: number,
  query?: string
) => {
  const fallbackQuery = `${latitude},${longitude}`;
  const encodedQuery = encodeURIComponent(query?.trim() || fallbackQuery);
  return `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;
};

export const getMapShareUrl = (
  latitude: number,
  longitude: number,
  zoom?: number,
  provider: 'osm' | 'google' = 'google',
  query?: string
) => {
  if (provider === 'google') {
    return getGoogleMapsShareUrl(latitude, longitude, query);
  }
  return getOpenStreetMapShareUrl(latitude, longitude, zoom);
};

