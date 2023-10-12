import { useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

const NavbarMain = () => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <Navbar
      sticky="top"
      collapseOnSelect
      expand="md"
      className=""
      style={{
        background: "#EBD4CB",
        color: "#2C0703",
        boxShadow: "5px 10px 10px -10px rgba(0,0,0,0.5)",
      }}
    >
      <Container>
        <Navbar.Brand>
          <Link className="react-link" style={{ color: "black" }} to="/">
            Dee Dee's Doggie Jerseys
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{}} />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link className="react-link" to="/">
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="react-link" to="/about">
                About
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="react-link" to="/contact">
                Contact
              </Link>
            </Nav.Link>
            <NavDropdown title="Shop" id="collasible-nav-dropdown">
              <NavDropdown.Item>
                <Link className="react-link" to="/store">
                  Shop All
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link className="react-link" to="/store/stock">
                  Ready Made
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link className="react-link" to="/store/custom">
                  Custom Orders
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link className="react-link" to="/store/price">
                  Price Sheet
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <Nav.Link href="">
              <FacebookIcon />
            </Nav.Link>
            <Nav.Link href="">
              <InstagramIcon />
            </Nav.Link>
            <Nav.Link href="">
              <TwitterIcon />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarMain;
