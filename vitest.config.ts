import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    coverage: {
      exclude: ['**/types.ts', '**/index.ts'],
      include: ['src/**'],
    },
    environment: 'happy-dom',
    mockReset: true,
    setupFiles: ['vitest/setup.ts'],
  },
});
