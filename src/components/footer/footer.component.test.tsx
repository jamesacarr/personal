/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

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
