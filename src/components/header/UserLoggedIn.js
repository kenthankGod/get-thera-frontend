import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaSignOutAlt } from "react-icons/fa";
import useAuthContext from "../../context/auth_context/AuthContext";

const UserLoggedIn = () => {
  const { logOut } = useAuthContext();

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className="navbar_container">
        <Container>
          <Navbar.Brand href="/">
            <span className="navbar_brand">geThera. </span>
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
              <Nav.Link href="/bookings" id="norm_links">
                Bookings
              </Nav.Link>
              <Nav.Link>
                <button className="logout_btn" onClick={logOut}>
                  Logout <FaSignOutAlt />
                </button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default UserLoggedIn;