import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Banier } from './Banier';
import { Footer } from './Footer';


export function About({ handleSetTitle }) {
  useEffect(() => {
    handleSetTitle('A propos');
  }, [])
  return <React.Fragment>
    <Banier currentPage={'about'} />
    <Container className="about m-5">
      <h3>About</h3>
    </Container>
    <Footer />
  </React.Fragment>
};
