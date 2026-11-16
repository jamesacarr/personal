// @vitest-environment happy-dom
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { PrivacyNotice } from './privacy-notice.component';

describe('PrivacyNotice', () => {
  describe('rendering', () => {
    it('renders "Privacy" as the only page heading', () => {
      render(<PrivacyNotice />);

      expect(screen.getAllByRole('heading', { level: 1 })).toEqual([
        screen.getByRole('heading', { level: 1, name: 'Privacy' }),
      ]);
    });

    it('states what the contact form collects and what it is used for', () => {
      const { container } = render(<PrivacyNotice />);

      expect(container).toHaveTextContent(
        'Your name, email address and message.',
      );
      expect(container).toHaveTextContent(/replying to your message/i);
    });

    it('names Zapier and Gmail and links to their policies', () => {
      const { container } = render(<PrivacyNotice />);

      expect(container).toHaveTextContent(/Zapier/);
      expect(container).toHaveTextContent(/Gmail/);
      expect(
        screen
          .getAllByRole('link')
          .map(link => link.getAttribute('href'))
          .filter(href => href?.startsWith('https://')),
      ).toEqual([
        'https://zapier.com/legal/data-retention-deletion',
        'https://policies.google.com/privacy',
      ]);
    });

    it('states the forwarded email is kept until deleted or deletion is requested', () => {
      const { container } = render(<PrivacyNotice />);

      expect(container).toHaveTextContent(
        /stays in my inbox indefinitely unless I delete it/i,
      );
      expect(container).toHaveTextContent(/I delete it on request/i);
    });

    it('states the site sets no cookies and runs no analytics', () => {
      const { container } = render(<PrivacyNotice />);

      expect(container).toHaveTextContent(/sets no cookies/i);
      expect(container).toHaveTextContent(/no analytics/i);
    });

    it('contains no retention figures', () => {
      const { container } = render(<PrivacyNotice />);

      expect(container.textContent).not.toMatch(
        /\d+\s*(day|week|month|year)s?/i,
      );
    });

    it('shows the last updated date as a machine-readable time', () => {
      const { container } = render(<PrivacyNotice />);

      const time = container.querySelector('time');

      expect(time).toHaveAttribute('dateTime', '2026-11-16');
      expect(time).toHaveTextContent('16 November 2026');
    });
  });

  describe('behaviour', () => {
    it('links back to the home page', () => {
      render(<PrivacyNotice />);

      expect(
        screen.getByRole('link', { name: 'Back to home' }),
      ).toHaveAttribute('href', '/');
    });

    it('keeps the home link in a navigation bar outside the notice', () => {
      render(<PrivacyNotice />);

      const link = screen.getByRole('link', { name: 'Back to home' });

      expect(screen.getByRole('navigation')).toContainElement(link);
      expect(screen.getByRole('article')).not.toContainElement(link);
    });

    it('sends deletion requests to the contact form', () => {
      const { container } = render(<PrivacyNotice />);

      expect(container).toHaveTextContent(
        /to have your message deleted.*send a message through the contact form/i,
      );
      expect(
        screen.getByRole('link', { name: 'the contact form' }),
      ).toHaveAttribute('href', '/#contact');
    });
  });

  describe('accessibility', () => {
    it('has no violations', async () => {
      const { container } = render(<PrivacyNotice />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
