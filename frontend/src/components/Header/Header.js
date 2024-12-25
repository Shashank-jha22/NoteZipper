import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {
    
    Form,
    FormControl,
} from "react-bootstrap";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar bg="primary" expand="lg" className="bg-body-tertiary" variant = "dark" sticky='top'>
      <Container >
        <Navbar.Brand>
          <Link to={"/"}>
            Note Zipper
          </Link>
          
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

            <Nav className='m-auto'>
                <Form inline>
                <FormControl type="text" placeholder = "search" className="mr-sm-2"/>
            </Form>
            </Nav>
          <Nav >
            <Nav.Link>
              <Link to={"/mynotes"}>
                My Notes
              </Link>
              
            </Nav.Link>
            
            <NavDropdown title="shashank" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">My profile</NavDropdown.Item>
              
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header
