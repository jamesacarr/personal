/**
 * @jest-environment jsdom
 */
import { jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Hero } from './hero.component';

describe('Hero', () => {
  describe('behaviour', () => {
    it('calls onClick when Contact Me button clicked', async () => {
      const onClick = jest.fn();

      render(<Hero onClick={onClick} />);

      const button = screen.getByText('Contact Me');
      await userEvent.click(button);

      expect(onClick).toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('has no violations', async () => {
      const { container } = render(<Hero onClick={jest.fn()} />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
