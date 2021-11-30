import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';
import { logoutUser } from '../redux/auth/authActions';

export default function Header() {
  const user = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logoutUser());
  };

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>December Bank</Navbar.Brand>
        {user ? (
          <>
            <Link style={{ color: 'white' }} to="/home">
              Home
            </Link>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>User: {user.name}</Navbar.Text>{' '}
              <BiLogOut
                size="30"
                color="white"
                style={{ marginLeft: '2%' }}
                onClick={handleClick}
              />{' '}
            </Navbar.Collapse>
          </>
        ) : null}
      </Container>
    </Navbar>
  );
}
