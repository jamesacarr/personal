// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { Tooltip } from './tooltip.component';

describe('Tooltip', () => {
  describe('appearance', () => {
    it('wraps child component', () => {
      render(
        <Tooltip message="Testing">
          <span>Hello World</span>
        </Tooltip>,
      );
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('does not render message when isVisible is false', () => {
      render(
        <Tooltip message="Testing">
          <span>Hello World</span>
        </Tooltip>,
      );
      expect(screen.queryByText('Testing')).not.toBeInTheDocument();
    });

    it('renders message when isVisible is true', () => {
      render(
        <Tooltip isVisible message="Testing">
          <span>Hello World</span>
        </Tooltip>,
      );
      expect(screen.getByText('Testing')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has no violations', async () => {
      const { container } = render(
        <Tooltip isVisible message="Testing">
          <span>Hello World</span>
        </Tooltip>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
