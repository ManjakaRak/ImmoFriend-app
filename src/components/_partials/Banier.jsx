import React from 'react';
import { Carousel } from 'react-bootstrap';
import { NavbarApp } from './NavBarApp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import '../../css/Banier.css';

function Next() {
  return <FontAwesomeIcon style={{fontSize: '30px' ,color: '#ffc107'}} icon={faArrowRight}/>
};

function Prev() {
  return <FontAwesomeIcon style={{fontSize: '30px', color: '#ffc107' }} icon={faArrowLeft} />
};

export const Banier = function ({ currentPage }) {
    return (
      <div className="banier">
        <div className="slide-content">
          <NavbarApp currentPage={currentPage} />
          <Carousel nextLabel='' prevLabel='' interval={3000} prevIcon={<Prev />} nextIcon={<Next />} >
            <Carousel.Item>
              <div className="slide">
                <div className="text-center">
                  <h3 className="text-warning">AJOUTEZ VOS BIEN</h3>
                  <h6 className="text-secondary">Lorem ipspedit vel vero eligendi dolor inventore.</h6>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="slide">
                <div className="text-center">
                  <h3 className="text-warning">ACHETER UNE PROPRIETE</h3>
                  <h6 className="text-secondary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia modi, dolorem soluta eos qrunt quibusdam nostrum, quam non..</h6>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="slide">
                <div className="text-center">
                  <h3 className="text-warning">FIEZ-VOUS A NOTRE SERVICE</h3>
                  <h6 className="text-secondary">Lorem ipsum dolor sm non..</h6>
                </div>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    );
};
