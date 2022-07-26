import React from 'react';
import { Pagination } from 'react-bootstrap';
import Aux from "../hoc/_Aux";

export const TablePagination = ({ totalPages, activePageNo, updateCurrentPage }) => {
  let items = [];
  const startPageNo = activePageNo > 2 ? activePageNo - 2 : 1;
  const endPageNo = activePageNo + 2 > totalPages ? totalPages : activePageNo + 2;

  for (let pageNumber = startPageNo; pageNumber <= endPageNo; pageNumber++) {
    items.push(
      <Pagination.Item key={pageNumber} active={pageNumber === activePageNo} onClick={ () => updateCurrentPage(pageNumber)}>
        {pageNumber}
      </Pagination.Item>,
    );
  }

  return (
    <Aux>
      <div className="mb-2 mt-2 float-left">
        <h5>Showing {activePageNo} of {totalPages}</h5>
      </div>
      <div className="mb-2 mt-2 float-right">
        <Pagination>
          <Pagination.First disabled={activePageNo === 1} onClick={ () => updateCurrentPage(1)} />
          <Pagination.Prev disabled={activePageNo === 1} onClick={ () => updateCurrentPage(activePageNo - 1)}/>
          {items}
          <Pagination.Next disabled={activePageNo === totalPages} onClick={ () => updateCurrentPage(activePageNo + 1)}/>
          <Pagination.Last disabled={activePageNo === totalPages} onClick={ () => updateCurrentPage(totalPages)}/>
        </Pagination>
      </div>
    </Aux>
        
  );
}
