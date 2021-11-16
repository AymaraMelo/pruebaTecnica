import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { connect } from 'react-redux';
import * as userActions from '../redux/actions/userActions';
import PropTypes from 'prop-types';

import { loginUser } from '../API/lib/users';

function LoginModal({ ...props }) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    const infoUser = {
      email: email,
      password: password,
    };
    loginUser(infoUser).then((response) => {
      localStorage.setItem('userToken', response.data.token);
      props.setUserLogin(infoUser);
      navigate('/home', { replace: true });
    });
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
        <Button style={{ margin: '5%' }} onClick={handleSubmit} variant="primary">
          Iniciar Sesión
        </Button>
      </Modal>
    </>
  );
}

//Preguntar
function mapStateToProps(state) {
  return {
    user: state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUserLogin: (user) => {
      dispatch(loginUser(user));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
