/**
 * @jest-environment jsdom
 */
import { jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import Header from './header.component';

describe('Header', () => {
  describe('behaviour', () => {
    it('calls onClick when Contact Me button clicked', async () => {
      const onClick = jest.fn();

      render(<Header onClick={onClick} />);

      const button = screen.getByText('Contact Me');
      await userEvent.click(button);

      expect(onClick).toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('has no violations', async () => {
      const { container } = render(<Header onClick={jest.fn()} />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
