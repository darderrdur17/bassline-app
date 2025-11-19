'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, WifiOff, Clock, Users, TrendingUp, TrendingDown } from 'lucide-react';
import { useRealtimeStore } from '@/stores/useRealtimeStore';

interface LiveStatusIndicatorProps {
  showDetails?: boolean;
  className?: string;
}

const LiveStatusIndicator: React.FC<LiveStatusIndicatorProps> = ({
  showDetails = false,
  className = '',
}) => {
  const { isRealtimeEnabled, lastUpdate } = useRealtimeStore();

  const getTimeSinceUpdate = () => {
    if (!lastUpdate) return 'Never';

    const now = new Date();
    const diffMs = now.getTime() - lastUpdate.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);

    if (diffSeconds < 60) return `${diffSeconds}s ago`;
    if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}m ago`;
    return `${Math.floor(diffSeconds / 3600)}h ago`;
  };

  if (!showDetails) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
          isRealtimeEnabled
            ? 'bg-green-50 text-green-700 border border-green-200'
            : 'bg-gray-50 text-gray-600 border border-gray-200'
        } ${className}`}
      >
        <motion.div
          animate={isRealtimeEnabled ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {isRealtimeEnabled ? (
            <Wifi size={12} className="text-green-600" />
          ) : (
            <WifiOff size={12} className="text-gray-500" />
          )}
        </motion.div>
        <span>{isRealtimeEnabled ? 'Live' : 'Offline'}</span>
        {isRealtimeEnabled && (
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-green-500 rounded-full"
          />
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-4 ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <motion.div
            animate={isRealtimeEnabled ? { rotate: 360 } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            {isRealtimeEnabled ? (
              <Wifi size={16} className="text-green-600" />
            ) : (
              <WifiOff size={16} className="text-gray-500" />
            )}
          </motion.div>
          <span className="font-semibold text-gray-900">
            {isRealtimeEnabled ? 'Live Data Active' : 'Offline Mode'}
          </span>
        </div>

        {isRealtimeEnabled && (
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"
          >
            Connected
          </motion.div>
        )}
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Clock size={14} />
            Last Update
          </span>
          <span className="font-medium">
            {lastUpdate ? getTimeSinceUpdate() : 'Never'}
          </span>
        </div>

        {isRealtimeEnabled && (
          <>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Users size={14} />
                Active Venues
              </span>
              <span className="font-medium">15</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <TrendingUp size={14} />
                Update Frequency
              </span>
              <span className="font-medium">30s</span>
            </div>
          </>
        )}
      </div>

      {isRealtimeEnabled && (
        <motion.div
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
          className="mt-3 h-1 bg-gradient-to-r from-green-500 to-green-300 rounded-full"
        />
      )}
    </motion.div>
  );
};

export default LiveStatusIndicator;
