import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useTable, usePagination, useFilters, useSortBy } from 'react-table';
import { GrDescend, GrAscend } from 'react-icons/gr';

export default function Table({
  loading,
  error,
  columns,
  data,
  tableState,
  totalPages,
  defaultColumn,
  filterTypes,
  dispatchTable,
}) {
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
      data: data,
      initialState: tableState,
      manualPagination: true,
      pageCount: totalPages,
      defaultColumn,
      filterTypes,
    },
    useFilters,
    useSortBy,
    usePagination,
  );

  useEffect(() => {
    if (sortBy.length > 0) {
      dispatchTable({ type: 'sort', value: sortBy });
    }
  }, [sortBy]);

  useEffect(() => {
    dispatchTable({ type: 'size', value: pageSize });
  }, [pageSize]);

  useEffect(() => {
    dispatchTable({ type: 'index', value: pageIndex });
  }, [pageIndex]);

  return (
    <>
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
            flexDirection: 'row',
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
