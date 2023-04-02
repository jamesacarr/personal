/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Content } from './content.component';

describe('Content', () => {
  describe('accessibility', () => {
    it('has no violations', async () => {
      const { container } = render(<Content />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
