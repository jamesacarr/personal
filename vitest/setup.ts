import '@testing-library/jest-dom/vitest';
import 'vitest-axe/extend-expect';

import { cleanup } from '@testing-library/react/pure';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});
