import type { NextConfig } from 'next';

const config: NextConfig = {
  // Remove the x-powered-by: next headers
  poweredByHeader: false,
  typedRoutes: true,
};

export default config;
