import React from 'react';
import { Container } from 'react-bootstrap';
import { Banier } from './Banier';

export function About() {
  return <React.Fragment>
    <Banier currentPage={'about'} />
    <Container className="m-5">
      <h3>About</h3>
    </Container>
  </React.Fragment>
};