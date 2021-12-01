import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useTable, usePagination, useFilters, useSortBy, useResizeColumns } from 'react-table';
import { GrDescend, GrAscend } from 'react-icons/gr';
import Table from 'react-bootstrap/Table';

export default function PaginationTable({
  loading,
  error,
  columns,
  data,
  tableState,
  pagination,
  dispatchTable,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, sortBy },
  } = useTable(
    {
      columns,
      data: data,
      initialState: tableState,
      manualPagination: true,
      pageCount: pagination.totalPages,
    },
    useFilters,
    useSortBy,
    usePagination,
    useResizeColumns,
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
      <Table bordered variant="light" {...getTableProps()}>
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
                <>
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                    })}
                  </tr>
                </>
              );
            })}
          </tbody>
        )}
      </Table>
      <div
        style={{
          marginTop: '2%',
          flexDirection: 'row',
          marginBottom: '5%',
          float: 'right',
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
      <br />
      <div style={{ flexDirection: 'row', width: '50%', marginBottom: '5%' }}>
        <h6>Columnas visibles</h6>
        {allColumns.map((column) => (
          <div key={column.id}>
            <label>
              <input type="checkbox" {...column.getToggleHiddenProps()} /> {column.Header}
            </label>
          </div>
        ))}
      </div>
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
