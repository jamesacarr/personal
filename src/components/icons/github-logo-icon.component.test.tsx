// @vitest-environment happy-dom
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { GitHubLogoIcon } from './github-logo-icon.component';

describe('GitHubLogoIcon', () => {
  describe('appearance', () => {
    it('applies the passed className', () => {
      const { container } = render(<GitHubLogoIcon className="custom" />);

      expect(container.querySelector('svg')).toHaveClass('custom');
    });
  });

  describe('accessibility', () => {
    it('is hidden from assistive technology', () => {
      const { container } = render(<GitHubLogoIcon />);

      expect(container.querySelector('svg')).toHaveAttribute(
        'aria-hidden',
        'true',
      );
    });

    it('has no violations', async () => {
      const { container } = render(<GitHubLogoIcon />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
