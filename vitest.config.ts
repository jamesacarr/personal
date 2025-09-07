import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    coverage: {
      all: true,
      exclude: ['**/types.ts', '**/index.ts'],
      include: ['src/**'],
    },
    environment: 'jsdom',
    mockReset: true,
    setupFiles: ['vitest/setup.ts'],
  },
});
