/** @type {import('next').NextConfig} */
const runtimeCaching = [
  {
    urlPattern: /^https:\/\/[^.]+\.tile\.openstreetmap\.org\/.*$/,
    handler: 'CacheFirst',
    options: {
      cacheName: 'osm-tiles',
      expiration: {
        maxEntries: 500,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
      },
    },
  },
];

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching,
});

const nextConfig = {
  reactStrictMode: true,
};

module.exports = withPWA(nextConfig); 