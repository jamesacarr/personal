import type { NextConfig } from 'next';

const config: NextConfig = {
  // Remove the x-powered-by: next headers
  poweredByHeader: false,
  swcMinify: true,
};

export default config;
