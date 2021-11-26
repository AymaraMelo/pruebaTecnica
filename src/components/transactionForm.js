import React, { useEffect, useState, useReducer } from 'react';
import { Button, Form, InputGroup, FormControl, Spinner, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAccounts } from '../redux/user/userActions';
import { useSelector, useDispatch } from 'react-redux';

export default function TransactionForm({ handleSubmit }) {
  useEffect(() => {}, []);
  const [show, setShow] = useState(false);

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

  const handleClose = () => setShow(false);
  const handleConfirm = () => {
    handleSubmit({
      description: references,
      account_from: parseInt(selectedAccount),
      account_to: parseInt(transactionState.destinationAccount),
      amount: parseInt(transactionState.amount),
      currency_name: transactionState.transactionCurrency,
    });
    setShow(false);
  };
  const handleShow = () => setShow(true);

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
    <>
      <Form
        style={{ padding: '3%', marginBottom: '5%' }}
        className="border border-2"
        onSubmit={(event) => {
          event.preventDefault();
          handleShow();
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Cuenta de origen</Form.Label>
          <Form.Select required onChange={(event) => setSelectedAccount(event.target.value)}>
            <option key={'default'} value={null}>
              Seleccione una cuenta ...
            </option>
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
            {' '}
            <option key={'default'} value={null}>
              Seleccione un tipo de moneda ...
            </option>
            <option value="URU" defaultValue>
              $URU (Pesos Uruguayos)
            </option>
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
          style={{
            textAlign: 'center',
            width: '15%',
            marginTop: '3%',
            marginBottom: '0%',
          }}
          variant="primary"
        >
          Confirmar
        </Button>
      </Form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>Desea realizar la transferencia?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={() => handleConfirm()}>
            Si
          </Button>
        </Modal.Footer>
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
