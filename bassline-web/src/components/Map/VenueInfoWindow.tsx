'use client';

import React from 'react';
import { Venue } from '@/types/venue';
import './VenueInfoWindow.css';

interface VenueInfoWindowProps {
  venue: Venue;
  onClose: () => void;
  onViewDetails?: (venue: Venue) => void;
  lat: number;
  lng: number;
}

const VenueInfoWindow: React.FC<VenueInfoWindowProps> = ({ venue, onClose, onViewDetails }) => {
  return (
    <div className="info-window">
      <button className="close-button" onClick={onClose} aria-label="Close info window">
        ×
      </button>
      <h3>{venue.name}</h3>
      {venue.address && <p>{venue.address}</p>}
      <p>
        {venue.neighborhood} · {venue.type}
      </p>
      <button
        className="details-link"
        onClick={() => onViewDetails?.(venue)}
        type="button"
      >
        View Details
      </button>
    </div>
  );
};

export default VenueInfoWindow;

