import React, { useEffect } from 'react';
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
      </Row>
      <Container style={{ paddingRight: '3%', paddingLeft: '3%', marginTop: '5%' }}>
        <TransactionTable />
      </Container>
    </>
  );
}
