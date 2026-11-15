// @vitest-environment happy-dom
import { render, screen } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import IndexPage, { metadata } from './page';

describe('IndexPage', () => {
  describe('behaviour', () => {
    it('links Contact Me to an element on the page', () => {
      render(<IndexPage />);

      const href =
        screen.getByRole('link', { name: 'Contact Me' }).getAttribute('href') ??
        '';

      expect(href.startsWith('#')).toBe(true);
      expect(document.getElementById(href.slice(1))).not.toBeNull();
    });
  });

  describe('metadata', () => {
    it('sets the canonical URL to the site root', () => {
      expect(metadata.alternates?.canonical).toEqual('/');
    });

    it('sets og:url to the site root alongside the shared Open Graph fields', () => {
      expect(metadata.openGraph).toEqual({
        locale: 'en_AU',
        siteName: 'James Carr',
        type: 'website',
        url: '/',
      });
    });
  });

  describe('structured data', () => {
    const renderHtml = () =>
      new DOMParser().parseFromString(
        renderToStaticMarkup(<IndexPage />),
        'text/html',
      );

    it('renders exactly one JSON-LD script', () => {
      const scripts = renderHtml().querySelectorAll(
        'script[type="application/ld+json"]',
      );

      expect(scripts).toHaveLength(1);
    });

    it('describes the site owner as a schema.org Person', () => {
      const script = renderHtml().querySelector(
        'script[type="application/ld+json"]',
      );

      expect(JSON.parse(script?.textContent ?? '')).toEqual({
        '@context': 'https://schema.org',
        '@type': 'Person',
        description: "Hello, I'm James Carr. I'm a full-stack web developer.",
        jobTitle: 'Senior Full-Stack Engineer',
        knowsAbout: [
          'TypeScript',
          'JavaScript',
          'React',
          'Next.js',
          'Node.js',
          'Full-stack web development',
          'Python',
          'Go',
          'SQL',
        ],
        name: 'James Carr',
        sameAs: [
          'https://www.linkedin.com/in/james-a-carr/',
          'https://github.com/jamesacarr',
        ],
        url: 'https://jamescarr.dev',
        worksFor: {
          '@type': 'Organization',
          name: 'Zapier',
          url: 'https://zapier.com',
        },
      });
    });

    it('lists the same profile URLs the footer links to', () => {
      const doc = renderHtml();
      const script = doc.querySelector('script[type="application/ld+json"]');
      const footerHrefs = ['LinkedIn', 'GitHub'].map(label =>
        doc
          .querySelector(`a[aria-label="Visit my ${label} account"]`)
          ?.getAttribute('href'),
      );

      expect(JSON.parse(script?.textContent ?? '').sameAs).toEqual(footerHrefs);
    });
  });

  describe('accessibility', () => {
    it('has no violations', async () => {
      const { container } = render(<IndexPage />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
