import React, { useEffect, useState } from 'react';
import '../css/Home.css';
import { Banier } from './Banier';
import { PropertyCard } from './PropertyCard';



export function Home() {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: .1
  }
  const handleIntersect = entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > .1) {
        entry.target.classList.add('show-section');
      } else {
        entry.target.classList.remove('show-section');
      }
    });
  }
  let observer = {};
  useEffect(() => {
    observer = new IntersectionObserver(handleIntersect, options);
    const elts = document.querySelectorAll('.property-card');
    elts.forEach(elt => observer.observe(elt));
    return () => {
      elts.forEach(elt => observer.unobserve(elt));
      obsever = null;
    };
      // console.log(observer)
      
  }, [observer]);
  return <React.Fragment>
    <Banier currentPage="home" />
    {/* <div className="fade"> */}
    <PropertyCard />
    {/* </div> */}
  </React.Fragment>
};