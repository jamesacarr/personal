// @vitest-environment happy-dom
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import {
  ArrowRightIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from './icons.component';

describe.each([
  { Icon: ArrowRightIcon, name: 'ArrowRightIcon' },
  { Icon: GitHubLogoIcon, name: 'GitHubLogoIcon' },
  { Icon: LinkedInLogoIcon, name: 'LinkedInLogoIcon' },
])('$name', ({ Icon }) => {
  describe('appearance', () => {
    it('applies the passed className', () => {
      const { container } = render(<Icon className="custom" />);

      expect(container.querySelector('svg')).toHaveClass('custom');
    });
  });

  describe('accessibility', () => {
    it('is hidden from assistive technology', () => {
      const { container } = render(<Icon />);
      const svg = container.querySelector('svg');

      expect(svg).toHaveAttribute('aria-hidden', 'true');
      expect(svg).toHaveAttribute('focusable', 'false');
    });

    it('has no violations', async () => {
      const { container } = render(<Icon />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
