// @vitest-environment happy-dom
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { ContactSection } from './contact-section.component';

describe('ContactSection', () => {
  describe('rendering', () => {
    it('renders "Contact" as the only heading', () => {
      render(<ContactSection />);

      expect(screen.getAllByRole('heading')).toEqual([
        screen.getByRole('heading', { level: 2, name: 'Contact' }),
      ]);
    });

    it('renders the subtitle as body text, not a heading', () => {
      render(<ContactSection />);

      const subtitle = 'Have a question or just want to get in touch?';
      expect(screen.getByText(subtitle)).toBeInTheDocument();
      expect(
        screen.queryByRole('heading', { name: subtitle }),
      ).not.toBeInTheDocument();
    });
  });

  describe('behaviour', () => {
    it('is the contact anchor target', () => {
      const { container } = render(<ContactSection />);

      const target = container.querySelector('#contact');

      expect(target).toContainElement(
        screen.getByRole('heading', { name: 'Contact' }),
      );
    });
  });

  describe('accessibility', () => {
    it('has no violations', async () => {
      const { container } = render(<ContactSection />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
