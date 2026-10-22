// @vitest-environment happy-dom
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { ContactSection } from './contact-section.component';

describe('ContactSection', () => {
  describe('rendering', () => {
    it('renders "Contact" as the only heading', () => {
      const scrollRef = createRef<HTMLDivElement>();
      render(<ContactSection scrollRef={scrollRef} />);

      expect(screen.getAllByRole('heading')).toEqual([
        screen.getByRole('heading', { level: 2, name: 'Contact' }),
      ]);
    });

    it('renders the subtitle as body text, not a heading', () => {
      const scrollRef = createRef<HTMLDivElement>();
      render(<ContactSection scrollRef={scrollRef} />);

      const subtitle = 'Have a question or just want to get in touch?';
      expect(screen.getByText(subtitle)).toBeInTheDocument();
      expect(
        screen.queryByRole('heading', { name: subtitle }),
      ).not.toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has no violations', async () => {
      const scrollRef = createRef<HTMLDivElement>();
      const { container } = render(<ContactSection scrollRef={scrollRef} />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
