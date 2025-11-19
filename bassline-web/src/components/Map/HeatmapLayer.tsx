'use client';

import React, { useEffect } from 'react';
import { useMap } from 'react-map-gl';
import { Venue } from '@/types/venue';

interface HeatmapLayerProps {
  venues: Venue[];
}

const HeatmapLayer: React.FC<HeatmapLayerProps> = ({ venues }) => {
  // Heatmap with Mapbox GL JS is complex and requires specific setup
  // For now, we'll just return null and implement this later
  // This is a placeholder for future heatmap implementation

  return null;
};

export default HeatmapLayer;
