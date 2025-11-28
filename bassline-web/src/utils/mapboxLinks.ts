import { MAPBOX_STYLE_URL } from '@/lib/config';

const DEFAULT_STYLE_PATH = MAPBOX_STYLE_URL.replace('mapbox://styles/', '');

export const getMapboxShareUrl = (
  latitude: number,
  longitude: number,
  zoom: number = 16,
  stylePath: string = DEFAULT_STYLE_PATH
) => {
  const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoiZGFyZGVycmR1ciIsImEiOiJjbWk4dTA0Mm0wZnZ4MnNwbzYwNWp2Mjg5In0.bG_gG2vKSCKUHd2kXEtBLQ';

  const clampedZoom = Math.max(1, Math.min(zoom, 20));
  // Mapbox share URL format: https://api.mapbox.com/styles/v1/{username}/{style_id}.html?access_token={token}#{zoom}/{lon}/{lat}
  // Note: longitude comes first, then latitude
  return `https://api.mapbox.com/styles/v1/${stylePath}.html?access_token=${token}#${clampedZoom}/${longitude}/${latitude}`;
};

