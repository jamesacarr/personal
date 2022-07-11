import nextJest from 'next/jest';

import type { Config } from '@jest/types';

const createJestConfig = nextJest({ dir: './' });

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
};

export default createJestConfig(config);
