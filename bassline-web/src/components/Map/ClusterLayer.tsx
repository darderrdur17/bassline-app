'use client';

import React, { useEffect } from 'react';
import { useMap } from 'react-map-gl';
import { Venue } from '@/types/venue';

interface ClusterLayerProps {
  venues: Venue[];
}

const ClusterLayer: React.FC<ClusterLayerProps> = ({ venues }) => {
  // Clustering with Mapbox GL JS is complex and requires SuperCluster or similar
  // For now, we'll just return null and implement this later
  // This is a placeholder for future clustering implementation

  return null;
};

export default ClusterLayer;
