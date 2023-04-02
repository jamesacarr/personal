import createBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = createBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });

/**
 * @type {import('next').NextConfig}
 */
const config = {
  // Disable linting on build because we handle all of these rules as part
  // of the CI/CD pipeline in the editor:lint job
  eslint: {
    ignoreDuringBuilds: true,
  },

  experimental: {
    appDir: true,
  },

  i18n: {
    locales: ['en-AU'],
    defaultLocale: 'en-AU',
  },

  // Remove the x-powered-by: next headers
  poweredByHeader: false,

  // Output and serve production source maps
  productionBrowserSourceMaps: true,

  swcMinify: true,

  webpack(config) {
    return {
      ...config,
      experiments: {
        ...config.experiments,
        topLevelAwait: true,
      },
    };
  },
};

export default withBundleAnalyzer(config);
