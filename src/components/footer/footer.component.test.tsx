// @vitest-environment happy-dom
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';

import { Footer } from './footer.component';

describe('Footer', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows the current year in the copyright', () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date('2031-06-15T00:00:00Z'));

    render(<Footer />);

    expect(screen.getByText('© 2031')).toBeInTheDocument();
  });

  describe('accessibility', () => {
    it('has no violations', async () => {
      const { container } = render(<Footer />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
