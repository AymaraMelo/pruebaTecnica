import React, { useEffect, useState } from 'react';
import { Button, Row, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router';
import TransactionTable from '../components/TransactionsTable';
import { useSelector } from 'react-redux';

export default function Home() {
  const navigate = useNavigate();

  const userLoggedIn = useSelector((state) => state.authReducer.userLoggedIn);

  useEffect(() => {
    if (!userLoggedIn) {
      navigate('/', { replace: true });
    }
  }, [userLoggedIn]);

  const handleNewTransaction = () => {
    navigate('/newTransaction', { replace: true });
  };
  return (
    <>
      <Button
        onClick={handleNewTransaction}
        style={{
          marginLeft: '7rem',
          marginTop: '2%',
        }}
        variant="primary"
      >
        Nueva Transferencia
      </Button>
      <Container style={{ paddingRight: '3%', paddingLeft: '3%', marginTop: '3%' }}>
        <TransactionTable />
      </Container>
    </>
  );
}
