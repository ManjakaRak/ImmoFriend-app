import React, { useEffect } from 'react';
import '../css/Home.css';
import { Banier } from './Banier';
import { Footer } from './Footer';
import { PropertyCardList } from './PropertyCardList';

export function Home({ handleSetTitle }) {
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
  // on start
  useEffect(() => {
    handleSetTitle('Accueil');
    // instance obsever to observer elt to fade on
    const observer = new IntersectionObserver(handleIntersect, options);
    // select element to pass on observer
    const elts = document.querySelectorAll('.property-card');
    elts.forEach(elt => observer.observe(elt));
    return () => {
      // observe element
      elts.forEach(elt => observer.unobserve(elt));
    };
  }, []);
  return <React.Fragment>
    <Banier currentPage="home" />
      <PropertyCardList />
    <Footer />
  </React.Fragment>
};
