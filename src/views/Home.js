import React, { useEffect, useState } from 'react';
import { getTransactions } from '../redux/transactions/transactionsActions';
import { Button, Row, Col, Container, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router';
import TransactionTable from '../components/TransactionsTable';
import { useSelector, useDispatch } from 'react-redux';

export default function Home() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.authReducer.user);
  const transactions = useSelector((state) => state.transactionsReducer.userTransactions);
  const loading = useSelector((state) => state.transactionsReducer.loading);
  const error = useSelector((state) => state.transactionsReducer.error);
  const dispatch = useDispatch();

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    dispatch(getTransactions(userToken));
  }, []);

  const handleNewTransaction = () => {
    navigate('/newTransaction', { replace: true });
  };
  return (
    <>
      <Row
        style={{
          paddingRight: '10%',
          paddingLeft: '10%',
          marginTop: '5%',
          alignContent: 'flex-end',
        }}
      >
        {/*Link */}
        <Button
          onClick={handleNewTransaction}
          style={{ width: '20%', alignContent: 'flex-end' }}
          variant="primary"
        >
          Nueva Transferencia
        </Button>
        <p style={{ width: '20%', alignSelf: 'center' }}>User: {user.name}</p>
      </Row>
      <Container style={{ paddingRight: '3%', paddingLeft: '3%', marginTop: '5%' }}>
        {loading ? (
          <Spinner
            style={{ marginLeft: '50%', marginTop: '20%' }}
            animation="border"
            variant="primary"
          />
        ) : error ? (
          error.map((e) => <p style={style.error}>{e}</p>)
        ) : (
          <TransactionTable transactions={transactions} />
        )}
      </Container>
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
