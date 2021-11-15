import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUserAccounts } from '../API/lib/users';

export default function TransactionForm() {
  const [userAccounts, setUserAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    getUserAccounts(userToken).then((response) => setUserAccounts(response.data));
  }, []);

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Cuenta de origen</Form.Label>
        <Form.Select
          required
          value={selectedAccount}
          onChange={(event) => setSelectedAccount(event.target.value)}
        >
          {userAccounts &&
            userAccounts.map((account) => (
              <option key={account.id} value={account.currency.name}>
                Cuenta {account.id} (Saldo {account.currency.name} {account.balance})
              </option>
            ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Moneda de la transacción</Form.Label>
        <Form.Select
          required
          value={selectedType}
          onChange={(event) => setSelectedType(event.target.value)}
        >
          <option value="URU">$URU (Pesos Uruguayos)</option>
          <option value="USD">U$S (Dólares Américanos)</option>
          <option value="EU">EUR (Euros)</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Importe a transferir</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text>{selectedType}</InputGroup.Text>
          <FormControl type="number" required />
        </InputGroup>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Cuenta destino</Form.Label>
        <FormControl type="number" required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Referencia</Form.Label>
        <InputGroup className="mb-3">
          <FormControl type="text" maxLength="128" />
        </InputGroup>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
