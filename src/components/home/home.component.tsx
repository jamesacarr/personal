import { createRef } from 'react';

import Contact from '../contact';
import Container from '../container';
import Header from '../header';

import type { FC } from 'react';

const Home: FC = () => {
  const contactRef = createRef<HTMLElement>();

  return (
    <Container>
      <Header contactRef={contactRef} />
      <Contact scrollRef={contactRef} />
    </Container>
  );
};

export default Home;
