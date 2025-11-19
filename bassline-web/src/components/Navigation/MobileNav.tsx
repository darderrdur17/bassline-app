'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, Filter, Map, List, Heart, Settings } from 'lucide-react';

interface MobileNavProps {
  onSearchToggle: () => void;
  onFilterToggle: () => void;
  onViewToggle: () => void;
  currentView: 'map' | 'list';
  searchOpen: boolean;
  filtersOpen: boolean;
  className?: string;
}

const MobileNav: React.FC<MobileNavProps> = ({
  onSearchToggle,
  onFilterToggle,
  onViewToggle,
  currentView,
  searchOpen,
  filtersOpen,
  className = '',
}) => {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => setNavOpen(!navOpen);

  const navItems = [
    {
      icon: Search,
      label: 'Search',
      active: searchOpen,
      onClick: onSearchToggle,
    },
    {
      icon: Filter,
      label: 'Filters',
      active: filtersOpen,
      onClick: onFilterToggle,
    },
    {
      icon: currentView === 'map' ? List : Map,
      label: currentView === 'map' ? 'List View' : 'Map View',
      active: false,
      onClick: onViewToggle,
    },
    {
      icon: Heart,
      label: 'Favorites',
      active: false,
      onClick: () => console.log('Favorites clicked'),
    },
  ];

  return (
    <>
      {/* Mobile Navigation Bar */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 ${className}`}>
        <div className="flex items-center justify-around px-4 py-2">
          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onSearchToggle}
              className={`p-3 rounded-xl transition-colors ${
                searchOpen
                  ? 'bg-brand-red text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Search size={20} />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onFilterToggle}
              className={`p-3 rounded-xl transition-colors ${
                filtersOpen
                  ? 'bg-brand-red text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Filter size={20} />
            </motion.button>
          </div>

          {/* View Toggle */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onViewToggle}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
          >
            {currentView === 'map' ? (
              <>
                <List size={18} />
                <span className="text-sm font-medium">List</span>
              </>
            ) : (
              <>
                <Map size={18} />
                <span className="text-sm font-medium">Map</span>
              </>
            )}
          </motion.button>

          {/* Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleNav}
            className={`p-3 rounded-xl transition-colors ${
              navOpen
                ? 'bg-brand-red text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {navOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </div>

      {/* Expanded Navigation Menu */}
      <AnimatePresence>
        {navOpen && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed bottom-16 left-4 right-4 bg-white rounded-2xl shadow-2xl border border-gray-200 z-40 overflow-hidden"
          >
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Navigation</h3>

              <div className="grid grid-cols-2 gap-3">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      item.onClick();
                      setNavOpen(false);
                    }}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
                      item.active
                        ? 'bg-brand-red text-white shadow-lg'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon size={24} />
                    <span className="text-sm font-medium text-center">{item.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Additional Actions */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors">
                    <Heart size={20} />
                    <span className="text-sm font-medium">Favorites</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors">
                    <Settings size={20} />
                    <span className="text-sm font-medium">Settings</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Safe area for mobile devices */}
      <div className="h-16" /> {/* Spacer for the fixed nav */}
    </>
  );
};

export default MobileNav;
