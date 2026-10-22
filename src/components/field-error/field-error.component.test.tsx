// @vitest-environment happy-dom
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { FieldError } from './field-error.component';

describe('FieldError', () => {
  describe('appearance', () => {
    it('renders an empty element with the given id when there is no message', () => {
      const { container } = render(<FieldError id="name-error" />);

      const element = container.querySelector('#name-error');
      expect(element).toBeInTheDocument();
      expect(element).toBeEmptyDOMElement();
    });

    it('renders the message inside the element with the given id', () => {
      const { container } = render(
        <FieldError id="name-error" message="Required" />,
      );

      expect(container.querySelector('#name-error')).toHaveTextContent(
        'Required',
      );
    });
  });

  describe('accessibility', () => {
    it('has no violations without a message', async () => {
      const { container } = render(<FieldError id="name-error" />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations with a message', async () => {
      const { container } = render(
        <FieldError id="name-error" message="Required" />,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
