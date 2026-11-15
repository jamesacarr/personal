// @vitest-environment happy-dom
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import PrivacyPage, { metadata } from './page';

describe('PrivacyPage', () => {
  describe('rendering', () => {
    it('renders a single page heading', () => {
      render(<PrivacyPage />);

      expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    });
  });

  describe('behaviour', () => {
    it('links back to the home page', () => {
      render(<PrivacyPage />);

      expect(
        screen.getByRole('link', { name: 'Back to home' }),
      ).toHaveAttribute('href', '/');
    });

    it('renders the footer privacy link', () => {
      render(<PrivacyPage />);

      expect(screen.getByRole('link', { name: 'Privacy' })).toHaveAttribute(
        'href',
        '/privacy',
      );
    });
  });

  describe('metadata', () => {
    it('sets the page title', () => {
      expect(metadata.title).toEqual('Privacy');
    });

    it('sets the canonical URL to the privacy page', () => {
      expect(metadata.alternates?.canonical).toEqual('/privacy');
    });

    it('sets og:url to the privacy page alongside the shared Open Graph fields', () => {
      expect(metadata.openGraph).toEqual({
        locale: 'en_AU',
        siteName: 'James Carr',
        type: 'website',
        url: '/privacy',
      });
    });
  });

  describe('accessibility', () => {
    it('has no violations', async () => {
      const { container } = render(<PrivacyPage />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
