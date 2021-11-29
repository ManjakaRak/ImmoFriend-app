import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';

export function PropertyCard({ property }) {
  return <div className="row property-card to-show">
    <div className="img-content col-lg">
      <Image fluid={true} width="500" src={`${process.env.PUBLIC_URL}/uploads/${property.image}`} />
    </div>
    <div className="detail-content col-lg">
      <div>
        <h1 style={{ color: 'rgb(63, 0, 0)' }} className="display-4">{property.name}</h1>
        <h1 style={{color: 'rgb(116, 0, 0)'}} >{property.price}$</h1>
        <p className="text-secondary">{property.description}</p>
        <div className="detail-button text-center">
          <Link to={`property/${property._id}`}><button>Voir les details</button></Link>
        </div>
      </div>
    </div>
  </div>
};
