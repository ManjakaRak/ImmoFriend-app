import React from 'react';
import { Container } from 'react-bootstrap';
import { NavbarApp } from './NavBarApp';

export function PropertyList() {
  return <React.Fragment>
    <NavbarApp />
    <Container className="mb-5">
      <h3>List des propriete</h3>
    </Container>
  </React.Fragment>
};
