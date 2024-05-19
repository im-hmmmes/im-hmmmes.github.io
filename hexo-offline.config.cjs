module.exports = {
    mode: 'generateSW',
    globPatterns: ['**/*.{html,js,css,png,jpg,jpeg,svg,gif}'],
    swDest: 'public/sw.js',
    runtimeCaching: [
      {
        urlPattern: /\.(?:html|js|css|png|jpg|jpeg|svg|gif)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'hexo-cache',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
          },
        },
      },
    ],
  };
  