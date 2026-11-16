import type { Metadata } from 'next';
import type { FC } from 'react';

import { Footer } from '@/components/footer';
import { PrivacyNotice } from '@/components/privacy-notice';

import { OPEN_GRAPH } from '../site';

export const metadata: Metadata = {
  alternates: { canonical: '/privacy' },
  description:
    'What happens to the name, email address and message you send through the contact form.',
  openGraph: { ...OPEN_GRAPH, url: '/privacy' },
  title: 'Privacy',
};

const PrivacyPage: FC = () => (
  <>
    <main>
      <PrivacyNotice />
    </main>

    <footer>
      <Footer />
    </footer>
  </>
);

export default PrivacyPage;
