'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, TrendingUp, Clock, Users } from 'lucide-react';
import { useRealtimeStore } from '@/stores/useRealtimeStore';

interface FilterSummaryProps {
  totalVenues: number;
  filteredVenues: number;
  className?: string;
}

const FilterSummary: React.FC<FilterSummaryProps> = ({
  totalVenues,
  filteredVenues,
  className = '',
}) => {
  const { realtimeData: allRealtimeData } = useRealtimeStore();

  // Calculate real-time insights
  const filteredRealtimeData = Array.from(allRealtimeData.values()).filter(data =>
    // This would be more complex in reality - we'd need to know which venues passed filters
    // For now, we'll show general stats
    data.isOpen
  );

  const averageWaitTime = filteredRealtimeData.length > 0
    ? Math.round(filteredRealtimeData.reduce((sum, data) => sum + data.waitTime, 0) / filteredRealtimeData.length)
    : 0;

  const crowdDistribution = {
    empty: filteredRealtimeData.filter(d => d.crowdLevel === 'empty').length,
    moderate: filteredRealtimeData.filter(d => d.crowdLevel === 'moderate').length,
    busy: filteredRealtimeData.filter(d => d.crowdLevel === 'busy').length,
    packed: filteredRealtimeData.filter(d => d.crowdLevel === 'packed').length,
  };

  const mostCommonCrowdLevel = Object.entries(crowdDistribution)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || 'moderate';

  const insights = [
    {
      icon: <MapPin size={16} className="text-blue-500" />,
      label: 'Venues Found',
      value: `${filteredVenues}/${totalVenues}`,
      color: 'text-blue-600',
    },
    {
      icon: <Clock size={16} className="text-green-500" />,
      label: 'Avg Wait Time',
      value: `${averageWaitTime} min`,
      color: 'text-green-600',
    },
    {
      icon: <Users size={16} className="text-orange-500" />,
      label: 'Most Common',
      value: mostCommonCrowdLevel === 'empty' ? 'Quiet' :
             mostCommonCrowdLevel === 'moderate' ? 'Moderate' :
             mostCommonCrowdLevel === 'busy' ? 'Busy' : 'Packed',
      color: mostCommonCrowdLevel === 'empty' ? 'text-green-600' :
             mostCommonCrowdLevel === 'moderate' ? 'text-yellow-600' :
             mostCommonCrowdLevel === 'busy' ? 'text-orange-600' : 'text-red-600',
    },
    {
      icon: <TrendingUp size={16} className="text-purple-500" />,
      label: 'Live Updates',
      value: 'Active',
      color: 'text-purple-600',
    },
  ];

  if (filteredVenues === totalVenues) {
    return null; // Don't show if no filters are active
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4 ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-800">Filter Results</h3>
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live data</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-2"
          >
            {insight.icon}
            <div>
              <div className={`text-sm font-semibold ${insight.color}`}>
                {insight.value}
              </div>
              <div className="text-xs text-gray-600">
                {insight.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Crowd level visualization */}
      <div className="mt-3 pt-3 border-t border-blue-200">
        <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
          <span>Crowd Levels in Results</span>
          <span>Open venues only</span>
        </div>
        <div className="flex gap-1">
          {Object.entries(crowdDistribution).map(([level, count]) => {
            const percentage = filteredRealtimeData.length > 0
              ? (count / filteredRealtimeData.length) * 100
              : 0;

            const colors = {
              empty: 'bg-green-500',
              moderate: 'bg-yellow-500',
              busy: 'bg-orange-500',
              packed: 'bg-red-500',
            };

            return (
              <div key={level} className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs capitalize">{level}</span>
                  <span className="text-xs font-medium">{count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={`h-2 rounded-full ${colors[level as keyof typeof colors]}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default FilterSummary;
