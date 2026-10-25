import type { Metadata } from 'next';
import type { FC } from 'react';
import { Toaster } from 'react-hot-toast';

import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';

import { OPEN_GRAPH } from './site';

// Page-level so future routes don't inherit URLs pointing at the home page.
export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: { ...OPEN_GRAPH, url: '/' },
};

const IndexPage: FC = () => (
  <>
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
