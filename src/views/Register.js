import React, { useState, useEffect } from 'react';
import { Form, Button, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { createUser } from '../redux/user/userActions';
import { getUser } from '../redux/auth/authActions';
import { useNavigate } from 'react-router';

export default function Register() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [errorPasswordMatch, setErrorPasswordMatch] = useState(null);
  const error = useSelector((state) => state.userReducer.error);
  const loading = useSelector((state) => state.userReducer.loading);
  const user = useSelector((state) => state.authReducer.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    if (user) {
      navigate('/home', { replace: true });
    }
  }, [user]);

  const handleSubmit = () => {
    if (password === confirmPassword) {
      const newUser = {
        name: name,
        email: email,
        password: password,
      };
      dispatch(createUser(newUser));
      const userToken = localStorage.getItem('userToken');
      if (userToken) {
        console.log('entro aca');
        dispatch(getUser(userToken));
      }
    } else {
      setErrorPasswordMatch('Las contraseñas no coinciden');
    }
  };

  return (
    <div
      style={{
        flexDirection: 'row',
        alignContent: 'flex-end',
        width: '100%',
        paddingTop: '1%',
        paddingLeft: '30%',
      }}
    >
      <Form
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '2%',
          width: '50%',
          border: '1px solid rgba(0,0,0,.2)',
          borderRadius: '0.3rem',
          outline: 0,
        }}
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <Image
          src="../logoDecemberBank.png"
          width="150 rem"
          style={{ alignSelf: 'center', marginBottom: '5%' }}
          rounded
        />
        <Form.Label style={{ alignSelf: 'center' }}>Ingresa tus datos para registrarte</Form.Label>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Ingresar nombre de usuario"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            required
            isInvalid={error}
            type="email"
            placeholder="Ingresar e-mail"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            required
            isInvalid={errorPasswordMatch}
            type="password"
            placeholder="Ingresar una contraseña"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={{ marginBottom: '2%' }}
          />
          <Form.Control
            required
            isInvalid={errorPasswordMatch}
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </Form.Group>
        {error && error.map((e) => <p style={style.error}>{e}</p>)}
        {errorPasswordMatch && <p style={style.error}>{errorPasswordMatch}</p>}
        <Button variant="primary" type="submit" disabled={loading}>
          Registrarme
        </Button>
      </Form>
    </div>
  );
}

const style = {
  error: {
    textAlign: 'center',
    color: 'red',
    margin: 0,
    marginBottom: '2%',
  },
};
