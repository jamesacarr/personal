import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageReporters: ['html', 'text', 'cobertura'],
  globals: {
    'ts-jest': {
      useEsm: true,
      isolatedModules: true,
    },
  },
  rootDir: '.',
  roots: ['<rootDir>/src/'],
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
};

export default config;
