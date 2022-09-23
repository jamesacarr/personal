/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import Container from './container.component';

describe('Container', () => {
  describe('accessibility', () => {
    it('has no violations', async () => {
      const { container } = render(<Container />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
