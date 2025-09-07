/**
 * @type {import('next').NextConfig}
 */
const config = {
  i18n: {
    locales: ['en-AU'],
    defaultLocale: 'en-AU',
  },

  // Remove the x-powered-by: next headers
  poweredByHeader: false,

  // Output and serve production source maps
  productionBrowserSourceMaps: true,

  swcMinify: true,
};

export default config;
