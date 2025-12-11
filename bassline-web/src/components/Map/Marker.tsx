'use client';

import React from 'react';
import './Marker.css';

interface MarkerProps {
  lat: number;
  lng: number;
  onClick: () => void;
  isSelected: boolean;
  isHighlighted?: boolean;
  color?: string;
}

const Marker: React.FC<MarkerProps> = ({ onClick, isSelected, isHighlighted, color = '#E53935' }) => {
  const markerClass = [
    'custom-marker',
    isHighlighted ? 'highlighted' : '',
    isSelected ? 'selected' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const shadowColor = `${color}66`; // add alpha for shadow

  return (
    <div
      className={markerClass}
      onClick={onClick}
      style={
        {
          cursor: 'pointer',
          '--marker-color': color,
          '--marker-shadow': shadowColor,
        } as React.CSSProperties
      }
    >
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="15" r="15" fill="var(--marker-color, #E53935)" />
        <circle cx="15" cy="15" r="8" fill="white" />
      </svg>
    </div>
  );
};

export default Marker;

