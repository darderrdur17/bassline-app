'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Maximize2, Layers, MapPin, Activity, Target } from 'lucide-react';

interface MapControlsProps {
  onFitBounds: () => void;
  onToggleHeatmap: () => void;
  onToggleClusters: () => void;
  showHeatmap: boolean;
  showClusters: boolean;
  venueCount: number;
}

const MapControls: React.FC<MapControlsProps> = ({
  onFitBounds,
  onToggleHeatmap,
  onToggleClusters,
  showHeatmap,
  showClusters,
  venueCount,
}) => {
  return (
    <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
      {/* Fit Bounds Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onFitBounds}
        className="bg-ui-surface hover:bg-ui-surface-hover text-ui-text p-3 rounded-xl shadow-lg border border-ui-border transition-all duration-200 group"
        title="Fit all venues"
      >
        <Maximize2 size={20} />
      </motion.button>

      {/* Cluster Toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggleClusters}
        className={`p-3 rounded-xl shadow-lg border transition-all duration-200 group ${
          showClusters
            ? 'bg-brand-red text-white border-brand-red shadow-glow-red'
            : 'bg-ui-surface hover:bg-ui-surface-hover text-ui-text border-ui-border'
        }`}
        title={showClusters ? "Show individual markers" : "Show clusters"}
      >
        <Target size={20} />
      </motion.button>

      {/* Heatmap Toggle */}
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

      {/* Venue Count Badge */}
      {venueCount > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-brand-red text-white px-3 py-2 rounded-xl shadow-lg border border-white/20 flex items-center gap-2"
        >
          <MapPin size={16} />
          <span className="text-sm font-semibold">{venueCount}</span>
        </motion.div>
      )}
    </div>
  );
};

export default MapControls;
