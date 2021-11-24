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
  const createdTransaction = useSelector((state) => state.transactionsReducer.createdTransaction);

  const handleSubmit = (newTransaction) => {
    setShowComprobante(false);
    const userToken = localStorage.getItem('userToken');
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
        <Tab eventKey="Ingreso de datos" title="Ingreso de datos" disabled={!showComprobante}>
          <TransactionForm handleSubmit={handleSubmit} />
        </Tab>
        <Tab eventKey="Comprobante" title="Comprobante" disabled={showComprobante}>
          <ConfirmForm error={error} infoTransaction={createdTransaction} />
        </Tab>
      </Tabs>
    </Container>
  );
}
