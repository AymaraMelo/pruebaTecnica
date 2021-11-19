import React, { useState } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TransactionForm from '../components/TransactionForm';
import ConfirmForm from '../components/ConfirmForm';
import { createTransaction } from '../redux/transactions/transactionsActions';
import { useDispatch, useSelector } from 'react-redux';

export default function NewTransaction() {
  const [showComprobante, setShowComprobante] = useState(true);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.transactionsReducer.loading);
  const error = useSelector((state) => state.transactionsReducer.error);

  console.log(loading);

  const handleSubmit = (event, newTransaction) => {
    event.preventDefault();
    setShowComprobante(false);
    const userToken = localStorage.getItem('userToken');
    //console.log(newTransaction);
    dispatch(createTransaction(userToken, newTransaction));
  };

  return (
    <Container style={{ paddingRight: '5%', paddingLeft: '5%', marginTop: '5%' }}>
      <Tabs
        defaultActiveKey="Ingreso de datos"
        transition={false}
        id="noanim-tab-example"
        className="mb-3"
      >
        <Tab eventKey="Ingreso de datos" title="Ingreso de datos">
          <TransactionForm handleSubmit={handleSubmit} />
        </Tab>
        <Tab eventKey="Comprobante" title="Comprobante" disabled={showComprobante}>
          <ConfirmForm error={error} />
        </Tab>
      </Tabs>
    </Container>
  );
}
