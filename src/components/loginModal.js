import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap';
import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../redux/auth/authActions';
import { useNavigate } from 'react-router';

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
        <Modal.Header>
          <Modal.Title>Ingrese sus datos para continuar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
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
