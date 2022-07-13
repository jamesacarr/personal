import nextJest from 'next/jest';

import type { Config } from '@jest/types';

const createJestConfig = nextJest({ dir: './' });

const config: Config.InitialOptions = {
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageReporters: ['html', 'text', 'cobertura'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  rootDir: '.',
  roots: ['<rootDir>/src/'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect', 'jest-axe/extend-expect'],
};

export default createJestConfig(config);
