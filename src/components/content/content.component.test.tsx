// @vitest-environment happy-dom
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';

import { Content } from './content.component';

describe('Content', () => {
  describe('accessibility', () => {
    it('has no violations', async () => {
      const { container } = render(<Content />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('behaviour', () => {
    it('scrolls when Contact Me button is clicked', async () => {
      const scrollIntoView = vi.spyOn(Element.prototype, 'scrollIntoView');
      render(<Content />);

      const button = screen.getByText('Contact Me');
      await userEvent.click(button);

      expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
      scrollIntoView.mockRestore();
    });
  });
});
