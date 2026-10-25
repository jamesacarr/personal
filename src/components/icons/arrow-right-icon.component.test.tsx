// @vitest-environment happy-dom
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { ArrowRightIcon } from './arrow-right-icon.component';

describe('ArrowRightIcon', () => {
  describe('appearance', () => {
    it('applies the passed className', () => {
      const { container } = render(<ArrowRightIcon className="custom" />);

      expect(container.querySelector('svg')).toHaveClass('custom');
    });
  });

  describe('accessibility', () => {
    it('is hidden from assistive technology', () => {
      const { container } = render(<ArrowRightIcon />);

      expect(container.querySelector('svg')).toHaveAttribute(
        'aria-hidden',
        'true',
      );
    });

    it('has no violations', async () => {
      const { container } = render(<ArrowRightIcon />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
