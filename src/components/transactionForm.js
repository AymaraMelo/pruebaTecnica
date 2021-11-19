import React, { useEffect, useState, useReducer } from 'react';
import { Button, Form, InputGroup, FormControl, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAccounts } from '../redux/user/userActions';
import { useSelector, useDispatch } from 'react-redux';

export default function TransactionForm({ handleSubmit }) {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [references, setReferences] = useState('');
  const dispatchRedux = useDispatch();

  const userAccounts = useSelector((state) => state.userReducer.userAccounts);
  const loading = useSelector((state) => state.userReducer.loading);
  const error = useSelector((state) => state.userReducer.error);

  const initialState = {
    destinationAccount: 0,
    transactionCurrency: '',
    amount: 0,
  };

  const [transactionState, dispatch] = useReducer(reducer, initialState);

  function reducer(transactionState, action) {
    switch (action.type) {
      case 'set_destinationAccount':
        return { ...transactionState, destinationAccount: action.value };
      case 'set_transactionCurrency':
        return { ...transactionState, transactionCurrency: action.value };
      case 'set_amount':
        return { ...transactionState, amount: action.value };
      default:
        throw new Error();
    }
  }

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    dispatchRedux(getAccounts(userToken));
  }, []);

  return loading ? (
    <Spinner style={{ marginLeft: '50%', marginTop: '20%' }} animation="border" variant="primary" />
  ) : error ? (
    error.map((e) => <p style={style.error}>{e}</p>)
  ) : (
    <Form
      onSubmit={(event) =>
        handleSubmit(event, {
          // description: 'lorem ipsum',
          // account_from: 1,
          // account_to: 2,
          // amount: 1,
          // currency_name: 'EU',
          description: references,
          account_from: selectedAccount,
          account_to: transactionState.destinationAccount,
          amount: transactionState.amount,
          currency_name: transactionState.transactionCurrency,
        })
      }
    >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Cuenta de origen</Form.Label>
        <Form.Select required onChange={(event) => setSelectedAccount(event.target.value)}>
          {userAccounts &&
            userAccounts.map((account) => (
              <option key={account.id} value={account.id}>
                Cuenta {account.id} (Saldo {account.currency.name} {account.balance})
              </option>
            ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Moneda de la transacción</Form.Label>
        <Form.Select
          required
          value={transactionState.transactionCurrency}
          onChange={(event) =>
            dispatch({ type: 'set_transactionCurrency', value: event.target.value })
          }
        >
          <option value="URU">$URU (Pesos Uruguayos)</option>
          <option value="USD">U$S (Dólares Américanos)</option>
          <option value="EU">EUR (Euros)</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Importe a transferir</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text>{transactionState.transactionCurrency}</InputGroup.Text>
          <FormControl
            type="number"
            required
            value={transactionState.amount}
            onChange={(event) => dispatch({ type: 'set_amount', value: event.target.value })}
          />
        </InputGroup>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Cuenta destino</Form.Label>
        <FormControl
          type="number"
          required
          value={transactionState.destinationAccount}
          onChange={(event) =>
            dispatch({ type: 'set_destinationAccount', value: event.target.value })
          }
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Referencia</Form.Label>
        <InputGroup className="mb-3">
          <FormControl
            type="text"
            maxLength="128"
            value={references}
            onChange={(event) => setReferences(event.target.value)}
          />
        </InputGroup>
      </Form.Group>
      <Button
        type="submit"
        style={{ textAlign: 'center', float: 'right', width: '15%' }}
        variant="primary"
      >
        Confirmar
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
