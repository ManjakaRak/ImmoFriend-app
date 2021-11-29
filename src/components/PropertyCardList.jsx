import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import '../css/PropertyCard.css';
import { PropertyCard } from './PropertyCard';
import axios from 'axios';

const options = {
    root: null,
    rootMargin: '0px',
    threshold: .1
  }

  // OPERATION FOR ANIMATION ON HOME PAGE
  /**
   *
   * @param {array IntersectionObserverEntry} entries
   * @param {object IntersectionObserver} observer
   */
  const handleIntersect = (entries) => {
    /**
     * @param {IntersectionObserverEntry} entry
     */
    entries.forEach(entry => {
      // make condition to active fading class
      if (entry.intersectionRatio > .1) {
        entry.target.classList.add('show-section');
      }
      if (entry.intersectionRatio <= .08) {
        entry.target.classList.remove('show-section');
      }
    });
  }

export const PropertyCardList = function () {
  const [properties, setProperties] = useState([]);

  const loadProperties = async () => {
    try {
      const properties = await axios({
        url: 'http://localhost:5000',
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setProperties(properties.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(async () => {
    await loadProperties();
    const observer = await new IntersectionObserver(handleIntersect, options);
    // select element to pass on observer
    const elts = await document.querySelectorAll('.property-card');
    elts.forEach(elt => observer.observe(elt));
    return () => {
      // observe element
      elts.forEach(elt => observer.unobserve(elt));
    };
  }, [])
  return <Container className="mb-5 pt-5">
    {
      properties.length === 0 ? <h1 className={"text-center text-black-50 m-5 p-5"}>Aucun bien disponible</h1> :
      properties.map((property, index) => {
        return <PropertyCard property={property.property} key={property.property._id}/>
      })
    }
  </Container>
};
