// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

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
