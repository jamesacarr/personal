/**
 * @type {import('next').NextConfig}
 */
const config = {
  // Disable linting on build because we handle all of these rules as part
  // of the CI/CD pipeline in the editor:lint job
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Remove the x-powered-by: next headers
  poweredByHeader: false,

  // Output and serve production source maps
  productionBrowserSourceMaps: true,
};

export default config;
