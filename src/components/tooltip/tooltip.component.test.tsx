/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import Tooltip from './tooltip.component';

describe('Tooltip', () => {
  describe('appearance', () => {
    it('wraps child component', () => {
      render(
        <Tooltip message="Testing">
          <span>Hello World</span>
        </Tooltip>
      );
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('does not render message when visible is false', () => {
      render(
        <Tooltip message="Testing">
          <span>Hello World</span>
        </Tooltip>
      );
      expect(screen.queryByText('Testing')).not.toBeInTheDocument();
    });

    it('renders message when visible is true', () => {
      render(
        <Tooltip visible message="Testing">
          <span>Hello World</span>
        </Tooltip>
      );
      expect(screen.getByText('Testing')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has no violations', async () => {
      const { container } = render(
        <Tooltip visible message="Testing">
          <span>Hello World</span>
        </Tooltip>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
