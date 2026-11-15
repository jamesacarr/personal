import type { Metadata } from 'next';
import type { FC } from 'react';
import { Toaster } from 'react-hot-toast';

import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';

import { serialiseJsonLd } from './json-ld';
import {
  GITHUB_URL,
  LINKEDIN_URL,
  OPEN_GRAPH,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from './site';

// Page-level so future routes don't inherit URLs pointing at the home page.
export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: { ...OPEN_GRAPH, url: '/' },
};

const PERSON_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  description: SITE_DESCRIPTION,
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
  name: SITE_NAME,
  sameAs: [LINKEDIN_URL, GITHUB_URL],
  url: SITE_URL,
  worksFor: {
    '@type': 'Organization',
    name: 'Zapier',
    url: 'https://zapier.com',
  },
};

const IndexPage: FC = () => (
  <>
    <script type="application/ld+json">
      {serialiseJsonLd(PERSON_JSON_LD)}
    </script>

    <main>
      <section>
        <Hero />
      </section>

      <section>
        <ContactSection />
      </section>

      <Toaster position="bottom-center" />
    </main>

    <footer>
      <Footer />
    </footer>
  </>
);

export default IndexPage;
