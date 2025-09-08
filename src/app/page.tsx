import type { FC } from 'react';

import { Content } from '@/components/content';
import { Footer } from '@/components/footer';

const IndexPage: FC = () => (
  <>
    <main>
      <Content />
    </main>

    <footer>
      <Footer />
    </footer>
  </>
);

export default IndexPage;
