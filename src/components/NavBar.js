import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const user = useSelector((state) => state.authReducer.user);
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>December Bank</Navbar.Brand>
        <Link style={{ color: 'white' }} to="/home">
          Home
        </Link>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>User: {user?.name}</Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
