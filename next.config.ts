import type { NextConfig } from 'next';

import { SECURITY_HEADERS } from './src/security/headers';

const config: NextConfig = {
  headers: async () => [{ headers: SECURITY_HEADERS, source: '/(.*)' }],
  // Remove the x-powered-by: next headers
  poweredByHeader: false,
  typedRoutes: true,
};

export default config;
