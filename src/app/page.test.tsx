// @vitest-environment happy-dom
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import IndexPage from './page';

describe('IndexPage', () => {
  describe('behaviour', () => {
    it('links Contact Me to an element on the page', () => {
      render(<IndexPage />);

      const href =
        screen.getByRole('link', { name: 'Contact Me' }).getAttribute('href') ??
        '';

      expect(href.startsWith('#')).toBe(true);
      expect(document.getElementById(href.slice(1))).not.toBeNull();
    });
  });

  describe('accessibility', () => {
    it('has no violations', async () => {
      const { container } = render(<IndexPage />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
