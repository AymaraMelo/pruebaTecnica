import React, { useMemo, useEffect, useReducer } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../redux/transactions/transactionsActions';
import { matchSorter } from 'match-sorter';
import * as constants from '../utils/constants';
import Table from './Table';

import DateTimePicker from 'react-datetime-picker';

export default function TransactionTable() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.transactionsReducer.loading);
  const error = useSelector((state) => state.transactionsReducer.error);
  const transactions = useSelector((state) => state.transactionsReducer.userTransactions);
  const pagination = useSelector((state) => state.transactionsReducer.pagination);

  const [tableState, dispatchTable] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'sort':
          return {
            ...state,
            sortBy: action.value,
          };
        case 'index':
          return {
            ...state,
            pageIndex: action.value,
          };
        case 'size':
          return {
            ...state,
            pageSize: action.value,
          };
        case 'date':
          return {
            ...state,
            from: action.value,
          };
        case 'from_account_id':
          return {
            ...state,
            from_account_id: action.value,
          };
        case 'to_account_id':
          return {
            ...state,
            to_account_id: action.value,
          };
        case 'from':
          return {
            ...state,
            from: action.value,
          };
        default:
          return state;
      }
    },
    {
      filters: [],
      pagination: {},
      pageIndex: parseInt(pagination.currentPage),
      pageSize: pagination.pageSize,
      sortBy: constants.DEFAULT_SORT_BY,
      from: new Date(),
      from_account_id: constants.DEFAULT_FROM_ACCOUNT_ID,
      to_account_id: constants.DEFAULT_TO_ACCOUNT_ID,
    },
  );

  function DefaultColumnFilter({ column: { filterValue, setFilter } }) {
    return (
      <input
        value={filterValue || ''}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      />
    );
  }

  function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
  }

  fuzzyTextFilterFn.autoRemove = (val) => !val;

  const filterTypes = useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    [],
  );

  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    [],
  );

  const columns = useMemo(
    () => [
      {
        id: 'from_account_id',
        Header: 'Origen',
        accessor: (d) => {
          return d.from_account_id;
        },
        sortType: 'basic',
        Filter: () => {
          return (
            <>
              <input
                onChange={(event) =>
                  dispatchTable({ type: 'from_account_id', value: event.target.value })
                }
                defaultValue={tableState.from_account_id}
                type="number"
                min="1"
              ></input>
            </>
          );
        },
        Cell: (props) => {
          return <>{props.value}</>;
        },
      },
      {
        Header: 'Destino',
        accessor: 'to_account_id',
        sortType: 'basic',
        Filter: () => {
          return (
            <>
              <input
                onChange={(event) =>
                  dispatchTable({ type: 'to_account_id', value: event.target.value })
                }
                defaultValue={tableState.to_account_id}
                type="number"
                min="1"
              ></input>
            </>
          );
        },
      },
      {
        Header: 'Moneda',
        accessor: 'currency_name',
        sortType: 'basic',
      },
      {
        Header: 'Importe',
        accessor: 'amount',
        sortType: 'basic',
      },
      {
        Header: 'Fecha',
        accessor: 'createdAt',
        sortType: 'basic',
        Cell: (props) => {
          return <div>{props.value.split('T')[0] || ''}</div>;
        },
        Filter: () => {
          return (
            <DateTimePicker onChange={(value) => dispatchTable({ type: 'from', value: value })} />
          );
        },
      },
    ],
    [],
  );

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    dispatch(
      getTransactions(userToken, {
        pageIndex: tableState.pageIndex,
        pageSize: tableState.pageSize,
        sort_by: tableState.sortBy[0].id,
        order_by: tableState.sortBy[0].desc ? 'desc' : 'asc',
        from: tableState.from.toISOString(),
        from_account_id: tableState.from_account_id,
        to_account_id: tableState.to_account_id,
      }),
    );
  }, [tableState]);

  return (
    <>
      <Table
        loading={loading}
        error={error}
        columns={columns}
        data={transactions}
        tableState={tableState}
        totalPages={pagination.totalPages}
        defaultColumn={defaultColumn}
        filterTypes={filterTypes}
        dispatchTable={dispatchTable}
      ></Table>
    </>
  );
}
