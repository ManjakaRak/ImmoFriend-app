import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import '../css/NavbarApp.css';

export function NavbarApp({ currentPage, isPropertyDetail }) {

  let defaultBgColor = '';
  let defaultPosition = '';
  isPropertyDetail ? defaultBgColor = 'rgb(0, 0, 0)' : defaultBgColor = 'rgba(0, 0, 0, .3)'
  isPropertyDetail ? defaultPosition = 'relative' : defaultPosition = 'absolute'
  return (
    <Navbar expand="md" style={{
      position: defaultPosition,
      top: 0,
      left: 0,
      zIndex: 1000,
      width: '100%',
      backgroundColor: defaultBgColor,
    }}>
      <Navbar.Brand>
        <Navbar.Text ><Link className="text-warning" to="/">ImmoFriend</Link></Navbar.Text>
      </Navbar.Brand>
      <Navbar.Toggle data-target="p-nav"></Navbar.Toggle>
      <Navbar.Collapse>
        <Nav id="p-nav">
          <Nav.Item className="p-3">
            <Link to="/"><span className={currentPage === 'home' ? 'active' : null}>Nos propriétées</span></Link>
          </Nav.Item>
           <Nav.Item className="p-3">
            <Link to="/add-client"><span className={currentPage === 'add-property' ? 'active' : null}>Ajoutez</span></Link>
          </Nav.Item>
          <Nav.Item className="p-3">
            <Link to="/about"><span className={currentPage === 'about' ? 'active' : null}>A propos</span></Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
