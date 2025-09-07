import '@testing-library/jest-dom/vitest'; // eslint-disable-line import/no-unassigned-import
import 'vitest-axe/extend-expect'; // eslint-disable-line import/no-unassigned-import
import { cleanup } from '@testing-library/react/pure';
import { afterEach } from 'vitest';

if (typeof window !== 'undefined') {
  //   // Fixes errors about "Not implemented: window.computedStyle(elt, pseudoElt)"
  //   // See https://github.com/nickcolley/jest-axe/issues/147
  const { getComputedStyle } = window;
  window.getComputedStyle = elt => getComputedStyle(elt);
}

afterEach(() => {
  cleanup();
});
