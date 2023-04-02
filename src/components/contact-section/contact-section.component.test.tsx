/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { createRef } from 'react';

import { ContactSection } from './contact-section.component';

describe('ContactSection', () => {
  describe('accessibility', () => {
    it('has no violations', async () => {
      const scrollRef = createRef<HTMLDivElement>();
      const { container } = render(<ContactSection scrollRef={scrollRef} />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
