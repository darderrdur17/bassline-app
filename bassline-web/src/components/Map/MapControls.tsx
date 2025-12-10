'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Maximize2, MapPin, Activity, Target, ChevronLeft, ChevronRight } from 'lucide-react';

interface MapControlsProps {
  onFitBounds?: () => void;
  onToggleHeatmap?: () => void;
  onToggleClusters?: () => void;
  showHeatmap?: boolean;
  showClusters?: boolean;
  venueCount?: number;
  onNext?: () => void;
  onPrevious?: () => void;
  currentIndex?: number;
  totalVenues?: number;
}

const MapControls: React.FC<MapControlsProps> = ({
  onFitBounds,
  onToggleHeatmap,
  onToggleClusters,
  showHeatmap = false,
  showClusters = false,
  venueCount,
  onNext,
  onPrevious,
  currentIndex,
  totalVenues,
}) => {
  const showFitBounds = typeof onFitBounds === 'function';
  const showClusterToggle = typeof onToggleClusters === 'function';
  const showHeatmapToggle = typeof onToggleHeatmap === 'function';
  const showVenueCount = typeof venueCount === 'number';
  const showNavigation =
    typeof onNext === 'function' &&
    typeof onPrevious === 'function' &&
    typeof currentIndex === 'number' &&
    typeof totalVenues === 'number' &&
    totalVenues > 0;

  return (
    <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
      {/* Fit Bounds Button */}
      {showFitBounds && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onFitBounds}
          className="bg-ui-surface hover:bg-ui-surface-hover text-ui-text p-3 rounded-xl shadow-lg border border-ui-border transition-all duration-200 group"
          title="Fit all venues"
        >
          <Maximize2 size={20} />
        </motion.button>
      )}

      {/* Cluster Toggle */}
      {showClusterToggle && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleClusters}
          className={`p-3 rounded-xl shadow-lg border transition-all duration-200 group ${
            showClusters
              ? 'bg-brand-red text-white border-brand-red shadow-glow-red'
              : 'bg-ui-surface hover:bg-ui-surface-hover text-ui-text border-ui-border'
          }`}
          title={showClusters ? 'Show individual markers' : 'Show clusters'}
        >
          <Target size={20} />
        </motion.button>
      )}

      {/* Heatmap Toggle */}
      {showHeatmapToggle && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleHeatmap}
          className={`p-3 rounded-xl shadow-lg border transition-all duration-200 group ${
            showHeatmap
              ? 'bg-brand-red text-white border-brand-red shadow-glow-red'
              : 'bg-ui-surface hover:bg-ui-surface-hover text-ui-text border-ui-border'
          }`}
          title="Toggle heatmap"
        >
          <Activity size={20} />
        </motion.button>
      )}

      {/* Venue Count Badge */}
      {showVenueCount && venueCount! > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-brand-red text-white px-3 py-2 rounded-xl shadow-lg border border-white/20 flex items-center gap-2"
        >
          <MapPin size={16} />
          <span className="text-sm font-semibold">{venueCount}</span>
        </motion.div>
      )}

      {/* Navigation Controls */}
      {showNavigation && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-lg border border-ui-border flex items-center gap-2 text-sm text-ui-text"
        >
          <button
            onClick={onPrevious}
            disabled={currentIndex === 0}
            className="p-2 rounded-lg border border-ui-border bg-ui-surface hover:bg-ui-surface-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:outline-none"
            aria-label="Previous venue"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="whitespace-nowrap text-xs font-semibold text-ui-text-secondary">
            {currentIndex !== undefined && totalVenues !== undefined
              ? `${currentIndex + 1} of ${totalVenues}`
              : '—'}
          </span>
          <button
            onClick={onNext}
            disabled={currentIndex !== undefined && totalVenues !== undefined ? currentIndex >= totalVenues - 1 : true}
            className="p-2 rounded-lg border border-ui-border bg-ui-surface hover:bg-ui-surface-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:outline-none"
            aria-label="Next venue"
          >
            <ChevronRight size={16} />
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default MapControls;
