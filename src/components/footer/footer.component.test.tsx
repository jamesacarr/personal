// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { Footer } from './footer.component';

describe('Footer', () => {
  describe('accessibility', () => {
    it('has no violations', async () => {
      const { container } = render(<Footer />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
