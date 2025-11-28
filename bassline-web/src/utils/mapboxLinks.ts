import { MAPBOX_STYLE_URL } from '@/lib/config';

const DEFAULT_STYLE_PATH = MAPBOX_STYLE_URL.replace('mapbox://styles/', '');

export const getMapboxShareUrl = (
  latitude: number,
  longitude: number,
  zoom: number = 16,
  stylePath: string = DEFAULT_STYLE_PATH
) => {
  const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

  const clampedZoom = Math.max(1, Math.min(zoom, 20));
  return `https://api.mapbox.com/styles/v1/${stylePath}.html?title=false&access_token=${token}#${clampedZoom}/${latitude}/${longitude}`;
};

