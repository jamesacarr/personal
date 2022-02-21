import { createRef, VFC } from 'react';

import Contact from '../contact';
import Container from '../container';
import Header from '../header';

const Index: VFC = () => {
  const contactRef = createRef<HTMLElement>();

  return (
    <Container>
      <Header contactRef={contactRef} />
      <Contact scrollRef={contactRef} />
    </Container>
  );
};

export default Index;
