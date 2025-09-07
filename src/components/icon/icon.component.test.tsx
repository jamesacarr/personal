// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { Icon } from './icon.component';

describe('Icon', () => {
  describe('appearance', () => {
    it('wraps child component', () => {
      render(
        <Icon href="https://www.google.com" label="Google">
          <span>Hello World</span>
        </Icon>,
      );
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('sets the label', () => {
      render(
        <Icon href="https://www.google.com" label="Google">
          <span>Hello World</span>
        </Icon>,
      );
      expect(
        screen.getByLabelText('Visit my Google account'),
      ).toBeInTheDocument();
    });

    it('sets the title', () => {
      render(
        <Icon href="https://www.google.com" label="Google">
          <span>Hello World</span>
        </Icon>,
      );
      expect(screen.getByTitle('Visit my Google account')).toBeInTheDocument();
    });

    it('sets the href', () => {
      render(
        <Icon href="https://www.google.com" label="Google">
          <span>Hello World</span>
        </Icon>,
      );
      const link = screen.getByLabelText('Visit my Google account');

      expect(link).toHaveAttribute('href', 'https://www.google.com');
    });
  });

  describe('accessibility', () => {
    it('has no violations', async () => {
      const { container } = render(
        <Icon href="https://www.google.com" label="Google">
          <span>Hello World</span>
        </Icon>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
