import React from 'react';
import { Carousel, Image } from 'react-bootstrap';
import { NavbarApp } from './NavBarApp';
import '../css/PropertyDetail.css';
import { Footer } from './Footer';
import { PropertyContactForm } from './PropertyContactForm';;

export function PropertyDetail() {
  return <>
    <NavbarApp isPropertyDetail={true} />
    <div className="text-center prop-detail-container">
      <div className="carousel-container">
        <Carousel nextLabel="" prevLabel="">
          <Carousel.Item>
            <Image src={`${process.env.PUBLIC_URL}/img/image1.jpg`} />
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="container-fluid row m-0 mt-5">
        <div className="col details  pr-5 pl-5">
          <div className="row">
            <div className="col.lg">
              <h1 style={{ color: 'rgb(63, 0, 0)' }}>Maison de la haute</h1>
            </div>
            <div className="col-lg">
              <h1 style={{color: 'rgb(116, 0, 0)'}} >400000$</h1>
            </div>
          </div>
          <div className="row mt-5">
            <h5 className="col text-info">Surface</h5>
            <h5 className="col text-secondary">50m<sup>2</sup></h5>
          </div>
          <hr className="m-0 mb-3" />
          <div className="row">
            <h5 className="col text-info">Chambre</h5>
            <h5 className="col text-secondary">5</h5>
          </div>
          <hr className="m-0 mb-3" />
          <div className="row">
            <h5 className="col text-info">Etage</h5>
            <h5 className="col text-secondary">2</h5>
          </div>
          <hr className="m-0 mb-3" />
          <div className="row">
            <h5 className="col text-info">Salle de bain</h5>
            <h5 className="col text-secondary">2</h5>
          </div>
          <hr className="m-0 mb-3" />
          <div className="row">
            <h5 className="col text-info">Localisation</h5>
            <h5 className="col text-secondary">Marseille</h5>
          </div>
          <hr className="m-0 mb-3" />
        </div>
        <div className="col description pr-5 pl-5">
          <h2 className="text-right">Description</h2>
          <p className="text-justify text-secondary">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta optio perferendis atque, enim eos expedita nisi, magni obcaecati ab quidem veritatis doloremque amet corporis. Nulla incidunt assumenda saepe dolorum maiores?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam corporis similique soluta. Architecto cumque quae aliquid dignissimos blanditiis repellendus iusto fugit ducimus, officia ipsa nesciunt veniam nisi adipisci tempora reprehenderit?Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat quas consequuntur ipsam, quis ipsum, soluta similique at, dicta quia quos quisquam adipisci! Possimus assumenda voluptate doloribus aliquam ipsa impedit sed!
          </p>
        </div>
      </div>
      {/* FORM */}
      <div className="mt-5 mb-5 form">
        <h3 style={{ color: 'grey' }} className="mb-4">Faites-nous signe si ce bien vous interèsse</h3>
        <PropertyContactForm context='contact'/>
      </div>
    </div>
    <Footer />
  </>
}