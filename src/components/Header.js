import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';
import { useNavigate } from 'react-router';
import { logoutUser } from '../redux/auth/authActions';

export default function Header() {
  const user = useSelector((state) => state.authReducer.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logoutUser());
    // navigate('/', { replace: true });
  };

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>December Bank</Navbar.Brand>
        <Link style={{ color: 'white' }} to="/home">
          Home
        </Link>
        <Navbar.Collapse className="justify-content-end">
          {user ? (
            <>
              <Navbar.Text>User: {user.name}</Navbar.Text>{' '}
              <BiLogOut
                size="30"
                color="white"
                style={{ marginLeft: '2%' }}
                onClick={handleClick}
              />{' '}
            </>
          ) : null}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
