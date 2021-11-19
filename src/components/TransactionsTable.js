import React from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';

export default function TransactionTable({ transactions, pagination }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Origen</th>
          <th>Destino</th>
          <th>Moneda</th>
          <th>Importe</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        {transactions &&
          transactions.map((item) => {
            return (
              <tr>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
}

TransactionTable.propTypes = {
  transactions: PropTypes.array.isRequired,
};
