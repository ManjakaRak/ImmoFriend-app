import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import '../css/NavbarApp.css';

export function NavbarApp({ currentPage }) {
  return (
    <Navbar expand="md" style={{
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1000,
      width: '100%',
      backgroundColor: 'rgba(0, 0, 0, .3)',
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
            <Link to="/add-property">Ajoutez</Link>
          </Nav.Item>
          <Nav.Item className="p-3">
            <Link to="/about"><span className={currentPage === 'about' ? 'active' : null}>A propos</span></Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
