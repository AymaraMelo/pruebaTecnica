import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TransactionForm from './components/transactionForm';

export default function NewTransaction() {
  return (
    <div style={{ padding: '10%' }}>
      <Tabs
        defaultActiveKey="Ingreso de datos"
        transition={false}
        id="noanim-tab-example"
        className="mb-3"
      >
        <Tab eventKey="Ingreso de datos" title="Ingreso de datos">
          <TransactionForm />
        </Tab>
        <Tab eventKey="Comprobante" title="Comprobante"></Tab>
      </Tabs>
    </div>
  );
}
