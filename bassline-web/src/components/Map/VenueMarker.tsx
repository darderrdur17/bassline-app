'use client';

import React, { useMemo } from 'react';
import { Marker } from 'react-map-gl';
import { Venue } from '@/types/venue';
import { motion } from 'framer-motion';
import { useRealtimeStore } from '@/stores/useRealtimeStore';

interface VenueMarkerProps {
  venue: Venue;
  isSelected: boolean;
  isHovered: boolean;
  onClick: (venue: Venue) => void;
  onHover: (venue: Venue | null) => void;
}

// Color mapping for different venue types
const typeColors = {
  Bar: '#E53935',        // Red
  Restaurant: '#4CAF50', // Green
  Club: '#9C27B0',       // Purple
  Lounge: '#FF9800',     // Orange
  Cafe: '#795548',       // Brown
  Brewery: '#2196F3',    // Blue
} as const;

// Faded colors for non-selected markers
const fadedColors = {
  Bar: '#E5393580',
  Restaurant: '#4CAF5080',
  Club: '#9C27B080',
  Lounge: '#FF980080',
  Cafe: '#79554880',
  Brewery: '#2196F380',
} as const;

// Get crowd level color
const getCrowdColor = (crowdLevel?: string) => {
  switch (crowdLevel) {
    case 'empty': return '#4CAF50';
    case 'moderate': return '#FF9800';
    case 'busy': return '#FF5722';
    case 'packed': return '#F44336';
    default: return null;
  }
};

// Custom marker component
const VenueMarkerComponent: React.FC<{
  venue: Venue;
  realtimeData?: any;
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
}> = ({ venue, realtimeData, isSelected, isHovered, onClick }) => {
  const baseColor = typeColors[venue.type as keyof typeof typeColors] || typeColors.Bar;
  const crowdColor = getCrowdColor(realtimeData?.crowdLevel || venue.currentCrowdLevel);
  const isFaded = !isSelected && !isHovered;

  // Determine marker color - prioritize real-time data
  const markerColor = crowdColor || (isFaded ? fadedColors[venue.type as keyof typeof fadedColors] || fadedColors.Bar : baseColor);

  // Marker size based on state and crowd level
  let markerSize = isSelected ? 48 : isHovered ? 40 : 32;

  // Make markers bigger for busy venues
  if (realtimeData?.crowdLevel === 'packed' || realtimeData?.crowdLevel === 'busy') {
    markerSize += 4;
  }

  // Pulse animation for busy venues or selected venues
  const shouldPulse = (realtimeData?.trend === 'increasing' || realtimeData?.crowdLevel === 'packed') && !isSelected;
  const pulseClass = (isSelected || shouldPulse) ? 'animate-pulse-glow' : '';

  return (
    <motion.div
      className={`relative cursor-pointer transform-gpu ${pulseClass}`}
      style={{
        width: markerSize,
        height: markerSize,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onMouseEnter={() => {}}
      onMouseLeave={() => {}}
    >
      {/* Main marker */}
      <div
        className="absolute rounded-full border-2 border-white shadow-lg transition-all duration-300"
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: markerColor,
          boxShadow: isSelected
            ? `0 0 20px ${markerColor}80, 0 4px 12px rgba(0,0,0,0.3)`
            : '0 2px 8px rgba(0,0,0,0.2)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Inner dot for crowd indicator */}
      {crowdColor && (
        <div
          className="absolute rounded-full border border-white"
          style={{
            width: markerSize * 0.3,
            height: markerSize * 0.3,
            backgroundColor: crowdColor,
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
          }}
        />
      )}

      {/* Rating indicator */}
      {venue.rating >= 4.5 && (
        <div
          className="absolute -top-1 -right-1 bg-yellow-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold border border-white"
          style={{
            fontSize: '10px',
            lineHeight: '1',
          }}
        >
          ★
        </div>
      )}

      {/* Selection ring */}
      {isSelected && (
        <div
          className="absolute inset-0 rounded-full border-2 border-white animate-ping"
          style={{
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}

      {/* Hover tooltip */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-ui-surface text-ui-text px-3 py-2 rounded-lg shadow-lg border border-ui-border whitespace-nowrap z-10"
          style={{ minWidth: '120px' }}
        >
          <div className="text-sm font-semibold font-body">{venue.name}</div>
          <div className="text-xs text-ui-text-secondary">{venue.neighborhood}</div>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-yellow-500 text-xs">⭐</span>
            <span className="text-xs font-medium">{venue.rating}</span>
            <span className="text-xs text-ui-text-secondary">•</span>
            <span className="text-xs font-medium">{venue.pricing}</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const VenueMarker: React.FC<VenueMarkerProps> = React.memo(({
  venue,
  isSelected,
  isHovered,
  onClick,
  onHover,
}) => {
  const { realtimeData: allRealtimeData } = useRealtimeStore();
  const { latitude, longitude } = venue.coordinates;
  const realtimeData = allRealtimeData.get(venue.id);

  return (
    <Marker
      latitude={latitude}
      longitude={longitude}
      anchor="center"
      onClick={(e) => {
        e.originalEvent.stopPropagation();
        onClick(venue);
      }}
    >
      <VenueMarkerComponent
        venue={venue}
        realtimeData={realtimeData}
        isSelected={isSelected}
        isHovered={isHovered}
        onClick={() => onClick(venue)}
      />
    </Marker>
  );
});

VenueMarker.displayName = 'VenueMarker';

export default VenueMarker;
