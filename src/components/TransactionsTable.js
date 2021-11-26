import React, { useMemo, useEffect, useState, useReducer, useRef } from 'react';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { useTable, usePagination, useFilters, useSortBy } from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../redux/transactions/transactionsActions';
import { matchSorter } from 'match-sorter';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { GrDescend, GrAscend } from 'react-icons/gr';
import * as constants from '../utils/constants';

export default function TransactionTable() {
  useEffect(() => {});

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.transactionsReducer.loading);
  const error = useSelector((state) => state.transactionsReducer.error);
  const transactions = useSelector((state) => state.transactionsReducer.userTransactions);
  const pagination = useSelector((state) => state.transactionsReducer.pagination);
  const [back, setBack] = useState(false);
  const initialLoadFinished = useRef(false);

  const [tableState, dispatchTable] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'sort':
          return {
            ...state,
            sortBy: action.value,
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

  const defaultColumn = React.useMemo(
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
        accessor: (d) => d.from_account_id,
        sortType: 'basic',
        Cell: (props) => {
          return <div>{props.value}</div>;
        },
      },
      {
        Header: 'Destino',
        accessor: 'to_account_id',
        sortType: 'basic',
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
    state: { pageIndex, pageSize, sortBy, filters },
  } = useTable(
    {
      columns,
      data: transactions,
      initialState: tableState,
      manualPagination: true,
      pageCount: pagination.totalPages,
      defaultColumn,
      filterTypes,
    },
    useFilters,
    useSortBy,
    usePagination,
  );

  useEffect(() => {
    if (!initialLoadFinished.current) {
      const userToken = localStorage.getItem('userToken');
      dispatch(
        getTransactions(userToken, {
          pageIndex: pageIndex,
          pageSize: pageSize,
          sort_by: constants.DEFAULT_SORT_BY[0].id,
          order_by: constants.DEFAULT_SORT_BY[0].desc ? 'desc' : 'asc',
        }),
      );
    }
  }, []);

  useEffect(() => {
    if (initialLoadFinished.current) {
      console.log('Volver: ', back);
      const userToken = localStorage.getItem('userToken');
      if (sortBy.length > 0 && !back) {
        console.log('cambia orden');
        const sort_by = sortBy[0].id;
        const order_by = sortBy[0].desc ? 'desc' : 'asc';
        console.log(sort_by, order_by);
        dispatchTable({ type: 'sort', value: sortBy });
        console.log(sortBy);
        dispatch(
          getTransactions(userToken, {
            pageIndex: pageIndex,
            pageSize: pageSize,
            sort_by: sort_by,
            order_by: order_by,
          }),
        );
      } else if (!back) {
        console.log('cambia Indice');
        dispatchTable({ type: 'sort', value: sortBy });
        dispatch(
          getTransactions(userToken, {
            pageIndex: pageIndex,
            pageSize: pageSize,
            sort_by: constants.DEFAULT_SORT_BY[0].id,
            order_by: constants.DEFAULT_SORT_BY[0].desc ? 'desc' : 'asc',
          }),
        );
      } else {
        console.log('cambia Tamaño');
        dispatchTable({ type: 'sort', value: sortBy });
        const sort_by = sortBy[0].id;
        const order_by = sortBy[0].desc ? 'desc' : 'asc';
        setBack(false);
        dispatch(
          getTransactions(userToken, {
            pageIndex: '0',
            pageIndex: pageIndex,
            pageSize: pageSize,
            sort_by: sort_by,
            order_by: order_by,
          }),
        );
      }
    }
    initialLoadFinished.current = true;
  }, [pageIndex, pageSize, sortBy]);

  return (
    <>
      {' '}
      <Styles>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? column.isSortedDesc ? <GrDescend /> : <GrAscend /> : ' '}
                    </span>
                    <div onClick={(ev) => ev.stopPropagation()}>
                      {column.canFilter ? column.render('Filter') : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {loading ? (
            <Spinner
              style={{ marginLeft: '230%', marginTop: '30%', marginBottom: '30%' }}
              animation="border"
              variant="primary"
            />
          ) : error ? (
            error.map((e) => <p style={style.error}>{e}</p>)
          ) : (
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
          )}
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
            onClick={() => gotoPage(1)}
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
              setPageSize(Number(event.target.value));
              setBack(true);
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
