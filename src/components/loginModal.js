import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form, Image } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../redux/auth/authActions';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

export default function LoginModal({ ...props }) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const error = useSelector((state) => state.authReducer.error);
  const loading = useSelector((state) => state.authReducer.loading);
  const user = useSelector((state) => state.authReducer.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/home', { replace: true });
    }
  }, [error, user]);

  const handleSubmit = () => {
    const infoUser = {
      email: email,
      password: password,
    };

    dispatch(loginUser(infoUser));
  };

  return (
    <>
      <Modal show={true} backdrop="static" keyboard={false} style={{ marginTop: '5%' }}>
        <Image
          src="../logoDecemberBank.png"
          width="150 rem"
          style={{ alignSelf: 'center', marginTop: '2%' }}
          rounded
        />

        <Form.Label style={{ alignSelf: 'center' }}>Ingrese sus datos para continuar</Form.Label>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                isInvalid={error}
                type="email"
                placeholder="Ingrese email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                isInvalid={error}
                type="password"
                placeholder="Ingrese constraseña"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        {error && error.map((e) => <p style={style.error}>{e}</p>)}
        <div style={{ alignSelf: 'flex-end', marginRight: '5%' }}>
          <Form.Text>No tienes una cuenta? </Form.Text>
          <Link style={{ color: ' #106cfc ', fontSize: '20' }} to="/register">
            Registrate
          </Link>
        </div>
        <Button
          style={{ margin: '5%' }}
          onClick={handleSubmit}
          variant="primary"
          disabled={loading}
        >
          Iniciar Sesión
        </Button>
      </Modal>
    </>
  );
}

const style = {
  error: {
    textAlign: 'center',
    color: 'red',
    margin: 0,
  },
};
