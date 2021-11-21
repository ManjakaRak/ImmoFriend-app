import React from 'react';
import { Container, Image } from 'react-bootstrap';
import '../css/PropertyCard.css';

export const PropertyCard = function() {
  return <Container className="mb-5">
    <h2>Home page</h2>
    <div className="row property-card to-show">
      <div className="img-content col-lg">
        <Image fluid={true} width="500" src="img/img1.jpg" />
      </div>
      <div className="detail-content col-lg">
        <div>
          <h1 style={{ color: 'rgb(63, 0, 0)' }} className="display-4">Maison de la Haute</h1>
          <h1 style={{color: 'rgb(116, 0, 0)'}} >400000$</h1>
          <p className="text-secondary">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis cum omnis porro magni repudiandae sit, alias explicabo necessitatibus quisquam eos id, qui vero minus iure laudantium ipsa officia? Quasi, officiis?</p>
          <div className="detail-button text-center">
            <button>Voir les details</button>
          </div>
        </div>
      </div>
    </div>
    <div className="row property-card to-show">
      <div className="img-content col-lg">
        <Image fluid={true} width="500" src="img/img1.jpg" />
      </div>
      <div className="detail-content col-lg">
        <div>
          <h1 style={{ color: 'rgb(63, 0, 0)' }} className="display-4">Maison de la Haute</h1>
          <h1 style={{color: 'rgb(116, 0, 0)'}} >400000$</h1>
          <p className="text-secondary">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis cum omnis porro magni repudiandae sit, alias explicabo necessitatibus quisquam eos id, qui vero minus iure laudantium ipsa officia? Quasi, officiis?</p>
          <div className="detail-button text-center">
            <button>Voir les details</button>
          </div>
        </div>
      </div>
    </div>
  </Container>
};