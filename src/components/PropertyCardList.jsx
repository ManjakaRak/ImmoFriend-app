import React from 'react';
import { Container } from 'react-bootstrap';
import '../css/PropertyCard.css';
import { PropertyCard } from './PropertyCard';

export const PropertyCardList = function() {
  return <Container className="mb-5 pt-5">
    <PropertyCard/>
    <PropertyCard/>
  </Container>
};
