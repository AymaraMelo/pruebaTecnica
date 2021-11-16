import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TransactionForm from './components/transactionForm';
import ConfirmForm from './components/confirmForm';

export default function NewTransaction() {
  const [showComprobante, setShowComprobante] = useState(true);

  const handleSubmit = () => {
    setShowComprobante(false);
  };

  return (
    <div style={{ padding: '10%' }}>
      <Tabs
        defaultActiveKey="Ingreso de datos"
        transition={false}
        id="noanim-tab-example"
        className="mb-3"
      >
        <Tab eventKey="Ingreso de datos" title="Ingreso de datos">
          <TransactionForm handleSubmit={handleSubmit} />
        </Tab>
        <Tab eventKey="Comprobante" title="Comprobante" disabled={false}>
          <ConfirmForm />
        </Tab>
      </Tabs>
    </div>
  );
}
