import React, { useEffect } from 'react';
import '../css/Home.css';
import { Banier } from './Banier';
import { Footer } from './Footer';
import { PropertyCardList } from './PropertyCardList';

export function Home({ handleSetTitle }) {
  useEffect(() => {
    handleSetTitle('Accueil');
  }, []);
  return <>
    <Banier currentPage="home" />
      <PropertyCardList />
    <Footer />
  </>
};
