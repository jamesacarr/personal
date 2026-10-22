// @vitest-environment happy-dom
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';

import { Hero } from './hero.component';

describe('Hero', () => {
  describe('rendering', () => {
    it('renders both hero lines in a single page heading', () => {
      render(<Hero onClick={vi.fn()} />);

      const headings = screen.getAllByRole('heading', { level: 1 });
      expect(headings).toHaveLength(1);
      expect(headings[0]).toHaveTextContent(
        "Hello, I'm James Carr. I'm a full-stack web developer.",
      );
    });
  });

  describe('behaviour', () => {
    it('calls onClick when Contact Me button clicked', async () => {
      const onClick = vi.fn();

      render(<Hero onClick={onClick} />);

      const button = screen.getByText('Contact Me');
      await userEvent.click(button);

      expect(onClick).toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('has no violations', async () => {
      const { container } = render(<Hero onClick={vi.fn()} />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
