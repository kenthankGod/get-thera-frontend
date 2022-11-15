import React from "react";
import "./Header.css";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  // const navigate = useNavigate();

  return (
    <>


    
    <Navbar collapseOnSelect expand="lg" className="navbar_container">
      <Container>
        <Navbar.Brand href="/" ><span className="navbar_brand">geThera.</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav  className="ms-auto links">
            <Nav.Link href="/" id="norm_links">Home</Nav.Link>
            <Nav.Link href="/therapistBooking" id="norm_links">Therapists</Nav.Link>
            <Nav.Link href="/login" id="norm_links">Login</Nav.Link>
            <Nav.Link href="signup"><button>Signup</button></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};

export default Header;
