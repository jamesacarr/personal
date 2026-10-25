// @vitest-environment happy-dom
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { SvgIcon } from './svg-icon.component';

const PATH = 'M0 0H15V15H0Z';

describe('SvgIcon', () => {
  describe('appearance', () => {
    it('renders the path', () => {
      const { container } = render(<SvgIcon path={PATH} />);

      expect(container.querySelector('path')).toHaveAttribute('d', PATH);
    });

    it('applies the passed className', () => {
      const { container } = render(<SvgIcon className="custom" path={PATH} />);

      expect(container.querySelector('svg')).toHaveClass('custom');
    });
  });

  describe('accessibility', () => {
    it('is hidden from assistive technology', () => {
      const { container } = render(<SvgIcon path={PATH} />);
      const svg = container.querySelector('svg');

      expect(svg).toHaveAttribute('aria-hidden', 'true');
      expect(svg).toHaveAttribute('focusable', 'false');
    });

    it('has no violations', async () => {
      const { container } = render(<SvgIcon path={PATH} />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
