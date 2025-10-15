const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure TTF fonts are treated as assets while preserving all defaults
if (!config.resolver.assetExts.includes('ttf')) {
  config.resolver.assetExts.push('ttf');
}

// Keep custom watch folder and alias
config.watchFolders = [path.resolve(__dirname, 'venue-images')];
config.resolver.alias = {
  ...(config.resolver.alias || {}),
  '@venue-images': path.resolve(__dirname, 'venue-images'),
};

module.exports = config;
