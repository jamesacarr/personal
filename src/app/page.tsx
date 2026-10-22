import type { FC } from 'react';
import { Toaster } from 'react-hot-toast';

import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';

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
