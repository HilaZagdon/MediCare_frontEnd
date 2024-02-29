import React, { useContext, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { UserContext } from "../../context/UserContext";
import { ThemeContext } from "../../context/Theme";
import { Link } from "react-router-dom";
import "./NavBar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavBar = () => {
  const { toggleTheme, selectedTheme } = useContext(ThemeContext);
  const { user, setUser } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const controlNavbar = () => {
    if (window.scrollY > 250) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, []);

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <Navbar
          expand="lg"
          className={` NavBarDiv activeNav ${show && "hidden"}`}
        >
          <Container className={isNavOpen ? "navOpenBackground" : ""}>
            <Navbar.Brand href="/home">
              <img src="images\MediCare__1_-removebg-preview.png" />
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              onClick={handleNavToggle}
            />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto navbar-light">
                <Nav.Link href="/appointments">Appointments</Nav.Link>
                <Nav.Link href="/labResults">Lab Results</Nav.Link>
                {user.role === 'doctor' && (
                  <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                )}
              </Nav>
              <Nav className="ml-auto">
                <div className="AuthDivNav">
                  <div className="DivForSignOutBtn">
                    <Link to={"/profile"}>
                      <i className="fa-regular fa-circle-user"></i>
                    </Link>
                    <button
                      className={`SignOutBtn `}
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : (
        <Navbar
          expand="lg"
          className={` NavBarDiv activeNav ${show && "hidden"}`}
        >
          <Container className={isNavOpen ? "navOpenBackground" : ""}>
            <Navbar.Brand href="/home">
              <img src="images\MediCare__1_-removebg-preview.png" />
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              onClick={handleNavToggle}
            />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto navbar-light">
                <Nav.Link href="/auth">Auth</Nav.Link>
              </Nav>
              <Nav className="ml-auto">
                <div className="AuthDivNav"></div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </div>
  );
};

export default NavBar;
