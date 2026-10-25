// @vitest-environment happy-dom
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { Hero } from './hero.component';

describe('Hero', () => {
  describe('rendering', () => {
    it('renders both hero lines in a single page heading', () => {
      render(<Hero />);

      const headings = screen.getAllByRole('heading', { level: 1 });
      expect(headings).toHaveLength(1);
      expect(headings[0]).toHaveTextContent(
        "Hello, I'm James Carr. I'm a full-stack web developer.",
      );
    });
  });

  describe('behaviour', () => {
    it('links Contact Me to the contact section', () => {
      render(<Hero />);

      const link = screen.getByRole('link', { name: 'Contact Me' });

      expect(link).toHaveAttribute('href', '#contact');
    });
  });

  describe('accessibility', () => {
    it('hides the decorative icon from assistive technology', () => {
      const { container } = render(<Hero />);

      const icons = Array.from(container.querySelectorAll('svg'));
      expect(icons).toHaveLength(1);
      for (const icon of icons) {
        expect(icon).toHaveAttribute('aria-hidden', 'true');
      }
    });

    it('has no violations', async () => {
      const { container } = render(<Hero />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
