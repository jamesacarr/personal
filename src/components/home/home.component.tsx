import React, { createRef, FC } from 'react';

import Container from '../container';
import Header from '../header';
import Contact from '../contact';

const Index: FC = () => {
  const contactRef = createRef<HTMLElement>();

  return (
    <Container>
      <Header contactRef={contactRef} />
      <Contact scrollRef={contactRef} />
    </Container>
  );
};

export default Index;
