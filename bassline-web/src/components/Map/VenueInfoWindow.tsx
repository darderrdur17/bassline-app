'use client';

import React from 'react';
import { Venue } from '@/types/venue';
import './VenueInfoWindow.css';

interface VenueInfoWindowProps {
  venue: Venue;
  onClose: () => void;
  lat: number;
  lng: number;
}

const VenueInfoWindow: React.FC<VenueInfoWindowProps> = ({ venue, onClose }) => {
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
      <a href={`/venues/${venue.id}`} className="details-link">
        View Details
      </a>
    </div>
  );
};

export default VenueInfoWindow;

