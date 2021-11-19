import React, { useEffect, useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router';

export default function ConfirmForm({ error }) {
  useEffect(() => {}, []);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/home', { replace: true });
  };

  return error ? (
    error.map((e) => <p style={style.error}>{e}</p>)
  ) : (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Cuenta de origen:</Form.Label>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Cuenta destino:</Form.Label>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Moneda de la transacción:</Form.Label>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Referencia:</Form.Label>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Importe debitado:</Form.Label>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Importe acreditado:</Form.Label>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Número de transacción:</Form.Label>
      </Form.Group>
      <Button
        style={{ textAlign: 'center', float: 'right', width: '25%' }}
        variant="primary"
        onClick={handleClick}
      >
        Listado de transacciones
      </Button>
    </Form>
  );
}

const style = {
  error: {
    textAlign: 'center',
    color: 'red',
    margin: 0,
  },
};
