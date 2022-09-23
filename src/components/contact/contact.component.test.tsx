/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { createRef } from 'react';

import Contact from './contact.component';

describe('Contact', () => {
  describe('accessibility', () => {
    it('has no violations', async () => {
      const scrollRef = createRef<HTMLElement>();
      const { container } = render(<Contact scrollRef={scrollRef} />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
