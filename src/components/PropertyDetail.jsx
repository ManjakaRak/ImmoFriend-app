import {useState, useEffect} from 'react';
import { Carousel, Image } from 'react-bootstrap';
import { NavbarApp } from './_partials/NavBarApp';
import '../css/PropertyDetail.css';
import { Footer } from './_partials/Footer';
import { PropertyContactForm } from './Form/PropertyContactForm';
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";

export function PropertyDetail({handleTitle}) {
  const navigate = useNavigate();
  const id = useParams();
  const [property, setProperty] = useState({});

  useEffect( async() => {
    handleTitle("bien");
    await loadProperty(id.id);
  }, []);

  const loadProperty = async (id) => {
    try {
      const resProperty = await axios ({
        url: `http://localhost:5000/property/${id}`,
        method: 'GET'
      });
      setProperty(resProperty.data.property);
    } catch (e) {
      navigate("*");
    }
  }

  return <>
    <NavbarApp isPropertyDetail={true} />
    <div className="text-center prop-detail-container">
      <div className="carousel-container">
        <Carousel nextLabel="" prevLabel="">
          <Carousel.Item>
            <Image src={`${process.env.PUBLIC_URL}/uploads/${property.image}`} />
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="container-fluid row m-0 mt-5">
        <div className="col details  pr-5 pl-5">
          <div className="row">
            <div className="col-md">
              <h1 style={{ color: 'rgb(63, 0, 0)' }}>{property.name}</h1>
            </div>
            <div className="col-md">
              <h1 style={{color: 'rgb(116, 0, 0)'}} >{property.price} $</h1>
            </div>
          </div>
          <div className="row mt-5">
            <h5 className="col text-info">Surface</h5>
            <h5 className="col text-secondary">{property.surface} m<sup>2</sup></h5>
          </div>
          <hr className="m-0 mb-3" />
          <div className="row">
            <h5 className="col text-info">Chambre</h5>
            <h5 className="col text-secondary">{property.room}</h5>
          </div>
          <hr className="m-0 mb-3" />
          <div className="row">
            <h5 className="col text-info">Etage</h5>
            <h5 className="col text-secondary">{property.floor}</h5>
          </div>
          <hr className="m-0 mb-3" />
          <div className="row">
            <h5 className="col text-info">Localisation</h5>
            <h5 className="col text-secondary">{property.localisation}</h5>
          </div>
          <hr className="m-0 mb-3" />
        </div>
        <div className="text-center col description pr-5 pl-5">
          <h2>Description</h2>
          <p className="text-center text-secondary">{property.description}</p>
        </div>
      </div>
      {/* FORM */}
      <div className="mt-5 mb-5 form">
        <h3 style={{ color: 'grey' }} className="mb-4">Faites-nous signe si ce bien vous interèsse</h3>
        <PropertyContactForm context='contact' property={property}/>
      </div>
    </div>
    <Footer />
  </>
}
