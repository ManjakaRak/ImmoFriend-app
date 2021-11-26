import React from 'react';
import '../css/About.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';

export const Footer = () => {
  return <footer className="m-0">
    <div className="text-secondary text-center"><p><FontAwesomeIcon icon={faCopyright} /> Copyright {(() => { const d = new Date(); return d.getFullYear()})() } ImmoFriend</p></div>
    <div className="row">
      <div className="contact-section col-md text-center">
        <h4 className="text-secondary">CONTACTEZ-NOUS</h4>
        <div className="contact-icon p-4 row">
          <div className="col-sm">
            <a style={{color: 'rgb(29, 29, 255)', fontSize: '30px'}}  href="https://www.facebook.com"><FontAwesomeIcon icon={faFacebook}/></a>
          </div>
          <div className="col-sm">
            <a style={{color: 'rgb(182, 53, 53)', fontSize: '30px'}}  href="https://www.instagram.com"><FontAwesomeIcon  icon={faInstagram}/></a>
          </div>
          <div className="col-sm">
            <a style={{color: 'rgb(66, 195, 212)', fontSize: '30px'}} href="https://www.twitter.com"><FontAwesomeIcon  icon={faTwitter}/></a>
          </div>
        </div>
      </div>
      <div className="col-md list-section">
        <ul>
          <li><a href="">Lorem ipsum dolor sit amet.</a></li>
          <li><a href="">Lorem ipsum dolor sit.</a></li>
          <li><a href="">link</a></li>
          <li><a href="">Lorem, ipsum dolor.</a></li>
        </ul>
      </div>
    </div>
  </footer>
};
