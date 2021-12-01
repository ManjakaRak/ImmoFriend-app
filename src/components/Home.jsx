import React, { useEffect } from 'react';
import '../css/Home.css';
import { Banier } from './_partials/Banier';
import { Footer } from './_partials/Footer';
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
