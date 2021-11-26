import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router';

export default function ConfirmForm({ error, infoTransaction }) {
  useEffect(() => {}, []);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/home', { replace: true });
  };

  return error
    ? error.map((e) => <p style={style.error}>{e}</p>)
    : infoTransaction && (
        <>
          <Form style={{ padding: '3%', marginBottom: '2%' }} className="border border-2">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Cuenta de origen: {infoTransaction.from_account_id}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Cuenta destino: {infoTransaction.to_account_id}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Moneda de la transacción: {infoTransaction.currency_name}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Referencia: {infoTransaction.description}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Importe debitado: {infoTransaction.amount_from}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Importe acreditado: {infoTransaction.amount_to}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Número de transacción: {infoTransaction.id}</Form.Label>
            </Form.Group>
          </Form>
          <Button
            style={{ textAlign: 'center', float: 'right', width: '25%', marginBottom: '5%' }}
            variant="primary"
            onClick={handleClick}
          >
            Listado de transacciones
          </Button>
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
