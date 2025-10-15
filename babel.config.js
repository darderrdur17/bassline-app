module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver', {
        root: ['./'],
        alias: {
          '@venue-images': './venue-images',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.jpg', '.jpeg', '.png', '.webp']
      }]
    ]
  };
};
