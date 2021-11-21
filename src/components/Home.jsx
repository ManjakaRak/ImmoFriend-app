import React, { useEffect } from 'react';
import '../css/Home.css';
import { Banier } from './Banier';
import { PropertyCard } from './PropertyCard';



export function Home() {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: .1
  }
  
  /**
   * 
   * @param {array IntersectionObserverEntry} entries
   * @param {object IntersectionObserver} observer
   */
  const handleIntersect = (entries, observer) => {
    /**
     * @param {IntersectionObserverEntry} entry
     */
    entries.forEach(entry => {
      // make condition to active fading class
      if (entry.intersectionRatio > .1) {
        entry.target.classList.add('show-section');
      } else {
        entry.target.classList.remove('show-section');
      }
    });
  }
  // on start
  useEffect(() => {
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
    <PropertyCard />
  </React.Fragment>
};