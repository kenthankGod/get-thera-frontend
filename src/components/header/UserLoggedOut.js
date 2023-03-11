import React from 'react'
import "./Header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaUserPlus } from "react-icons/fa";


const UserLoggedOut = () => {
  return (
    <div>
       <Navbar collapseOnSelect expand="lg" className="navbar_container">
        <Container>
          <Navbar.Brand href="/">
            <span className="navbar_brand">geThera.</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto links">
              <Nav.Link href="/" id="norm_links">
                Home
              </Nav.Link>
              <Nav.Link href="/therapistBooking" id="norm_links">
                Therapists
              </Nav.Link>
              <Nav.Link href="/login" id="norm_links">
                Login
              </Nav.Link>
              <Nav.Link href="/signup">
                <button>Signup <FaUserPlus /></button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default UserLoggedOut
