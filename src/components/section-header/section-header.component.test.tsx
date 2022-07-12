/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import SectionHeader from './section-header.component';

describe('SectionHeader', () => {
  describe('accessibility', () => {
    it('has no violations', async () => {
      const { container } = render(<SectionHeader />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
