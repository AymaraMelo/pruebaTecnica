import React, { useMemo, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { useTable, usePagination, useFilters, useAsyncDebounce } from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../redux/transactions/transactionsActions';
import { matchSorter } from 'match-sorter';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

export default function TransactionTable() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.transactionsReducer.loading);
  const error = useSelector((state) => state.transactionsReducer.error);
  const transactions = useSelector((state) => state.transactionsReducer.userTransactions);
  const pagination = useSelector((state) => state.transactionsReducer.pagination);

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

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    [],
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Origen',
        accessor: 'from_account_id',
      },
      {
        Header: 'Destino',
        accessor: 'to_account_id',
      },
      {
        Header: 'Moneda',
        accessor: 'currency_name',
      },
      {
        Header: 'Importe',
        accessor: 'amount',
      },
      {
        Header: 'Fecha',
        accessor: 'createdAt',
      },
    ],
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: transactions,
      initialState: {
        pageIndex: pagination.currentPage,
        pageSize: pagination.pageSize,
      },
      manualPagination: true,
      pageCount: pagination.totalPages,
      defaultColumn,
      filterTypes,
    },
    useFilters,
    usePagination,
  );

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    dispatch(getTransactions(userToken, { pageIndex: pageIndex, pageSize: pageSize }));
  }, [pageIndex]);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    dispatch(getTransactions(userToken, { pageIndex: '0', pageSize: pageSize }));
  }, [pageSize]);

  return (
    <>
      {' '}
      {loading ? (
        <Spinner
          style={{ marginLeft: '50%', marginTop: '20%' }}
          animation="border"
          variant="primary"
        />
      ) : error ? (
        error.map((e) => <p style={style.error}>{e}</p>)
      ) : (
        <Styles>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render('Header')}
                      <div>{column.canFilter ? column.render('Filter') : null}</div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div
            className="pagination"
            style={{
              backgroundColor: '#e6e6e6',
              marginTop: '2%',
            }}
          >
            <FaAngleDoubleLeft
              size="25"
              color="#0073ff"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            />{' '}
            <FaAngleLeft
              size="25"
              color="#0073ff"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            />{' '}
            <span>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </span>{' '}
            <FaAngleRight
              size="25"
              color="#0073ff"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            />{' '}
            <FaAngleDoubleRight
              size="25"
              color="#0073ff"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            />{' '}
            <select
              value={pageSize}
              onChange={(event) => {
                console.log(event.target.value);
                setPageSize(Number(event.target.value));
              }}
            >
              {[5, 10, 15, 20].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </Styles>
      )}
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

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;
