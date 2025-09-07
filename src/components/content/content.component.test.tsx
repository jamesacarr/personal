// @vitest-environment happy-dom
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
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
});
