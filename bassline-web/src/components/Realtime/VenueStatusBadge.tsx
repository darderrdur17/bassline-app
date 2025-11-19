'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, TrendingUp, TrendingDown, Minus, Wifi } from 'lucide-react';
import { VenueRealtimeData } from '@/lib/realtimeData';

interface VenueStatusBadgeProps {
  realtimeData: VenueRealtimeData | undefined;
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const VenueStatusBadge: React.FC<VenueStatusBadgeProps> = ({
  realtimeData,
  showDetails = false,
  size = 'md',
  className = '',
}) => {
  if (!realtimeData) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`inline-flex items-center gap-1.5 px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium ${className}`}
      >
        <Wifi size={10} />
        <span>No live data</span>
      </motion.div>
    );
  }

  const getCrowdLevelInfo = (level: string) => {
    switch (level) {
      case 'empty':
        return {
          label: 'Very Quiet',
          color: 'text-green-700',
          bg: 'bg-green-50',
          border: 'border-green-200',
          icon: '😌',
        };
      case 'moderate':
        return {
          label: 'Moderate',
          color: 'text-yellow-700',
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          icon: '🙂',
        };
      case 'busy':
        return {
          label: 'Busy',
          color: 'text-orange-700',
          bg: 'bg-orange-50',
          border: 'border-orange-200',
          icon: '😅',
        };
      case 'packed':
        return {
          label: 'Very Busy',
          color: 'text-red-700',
          bg: 'bg-red-50',
          border: 'border-red-200',
          icon: '🔥',
        };
      default:
        return {
          label: 'Unknown',
          color: 'text-gray-700',
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          icon: '🤔',
        };
    }
  };

  const crowdInfo = getCrowdLevelInfo(realtimeData.crowdLevel);
  const isOpen = realtimeData.isOpen;

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  if (!showDetails) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`inline-flex items-center gap-2 ${sizeClasses[size]} ${crowdInfo.bg} ${crowdInfo.border} border rounded-full font-medium ${className}`}
      >
        <motion.span
          animate={realtimeData.trend === 'increasing' ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-lg"
        >
          {crowdInfo.icon}
        </motion.span>
        <span className={crowdInfo.color}>{crowdInfo.label}</span>

        {realtimeData.trend !== 'stable' && (
          <motion.div
            animate={realtimeData.trend === 'increasing' ? { y: [0, -2, 0] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {realtimeData.trend === 'increasing' ? (
              <TrendingUp size={14} className="text-green-600" />
            ) : (
              <TrendingDown size={14} className="text-red-600" />
            )}
          </motion.div>
        )}

        {!isOpen && (
          <span className="text-red-600 font-semibold ml-1">CLOSED</span>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-4 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <motion.span
            animate={realtimeData.trend === 'increasing' ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-2xl"
          >
            {crowdInfo.icon}
          </motion.span>
          <div>
            <div className={`font-semibold ${crowdInfo.color}`}>
              {crowdInfo.label}
            </div>
            <div className="text-xs text-gray-500">
              {isOpen ? 'Open' : 'Closed'}
            </div>
          </div>
        </div>

        {realtimeData.trend !== 'stable' && (
          <motion.div
            animate={realtimeData.trend === 'increasing' ? { y: [0, -2, 0] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
              realtimeData.trend === 'increasing'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {realtimeData.trend === 'increasing' ? (
              <TrendingUp size={12} />
            ) : (
              <TrendingDown size={12} />
            )}
            {realtimeData.trend === 'increasing' ? 'Rising' : 'Falling'}
          </motion.div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2 text-sm">
          <Users size={14} className="text-gray-500" />
          <div>
            <div className="font-medium">{realtimeData.currentOccupancy}/{realtimeData.capacity}</div>
            <div className="text-xs text-gray-500">Occupancy</div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Clock size={14} className="text-gray-500" />
          <div>
            <div className="font-medium">{realtimeData.waitTime} min</div>
            <div className="text-xs text-gray-500">Wait Time</div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-3">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Capacity</span>
          <span>{Math.round((realtimeData.currentOccupancy / realtimeData.capacity) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${(realtimeData.currentOccupancy / realtimeData.capacity) * 100}%`,
              backgroundColor: realtimeData.crowdLevel === 'packed' ? '#ef4444' :
                             realtimeData.crowdLevel === 'busy' ? '#f97316' :
                             realtimeData.crowdLevel === 'moderate' ? '#eab308' : '#22c55e'
            }}
            transition={{ duration: 0.5 }}
            className="h-2 rounded-full"
          />
        </div>
      </div>

      {/* Last Updated */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-green-500 rounded-full"
          />
          <span>Live data</span>
        </div>
        <div className="text-xs text-gray-500">
          {realtimeData.lastUpdated.toLocaleTimeString()}
        </div>
      </div>
    </motion.div>
  );
};

export default VenueStatusBadge;
