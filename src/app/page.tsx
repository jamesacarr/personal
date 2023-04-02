import { Content } from '../components/content';
import { Footer } from '../components/footer';

import type { FC } from 'react';

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
