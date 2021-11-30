import React, { useEffect, useState } from 'react';
import { Container, Tab, Tabs, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TransactionForm from '../components/TransactionForm';
import ConfirmForm from '../components/ConfirmForm';
import { createTransaction } from '../redux/transactions/transactionsActions';
import { useDispatch, useSelector } from 'react-redux';

export default function NewTransaction() {
  const [showComprobante, setShowComprobante] = useState(true);
  const [defaultActive, setDefaultActive] = useState('Ingreso de datos');
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.transactionsReducer.loading);
  const error = useSelector((state) => state.transactionsReducer.error);
  const createdTransaction = useSelector((state) => state.transactionsReducer.createdTransaction);

  const handleSubmit = (newTransaction) => {
    setShowComprobante(false);
    setDefaultActive('Comprobante');
    const userToken = localStorage.getItem('userToken');
    dispatch(createTransaction(userToken, newTransaction));
  };

  useEffect(() => {});

  return (
    <>
      {' '}
      {loading ? (
        <Spinner
          style={{ marginLeft: '50%', marginTop: '20%' }}
          animation="border"
          variant="primary"
        />
      ) : (
        <Container style={{ paddingRight: '5%', paddingLeft: '5%', marginTop: '2%' }}>
          <Tabs
            defaultActiveKey={defaultActive}
            transition={false}
            id="noanim-tab-example"
            className="mb-3 "
          >
            <Tab eventKey="Ingreso de datos" title="Ingreso de datos" disabled={!showComprobante}>
              <TransactionForm handleSubmit={handleSubmit} />
            </Tab>
            <Tab eventKey="Comprobante" title="Comprobante" disabled={showComprobante}>
              <ConfirmForm error={error} infoTransaction={createdTransaction} />
            </Tab>
          </Tabs>
        </Container>
      )}
    </>
  );
}
