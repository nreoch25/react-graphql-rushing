import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const TablePagination = ({
  pagesCount,
  currentPage,
  handlePageClick,
  handlePreviousClick,
  handleNextClick,
}) => {
  return (
    <Pagination>
      <PaginationItem disabled={currentPage <= 0}>
        <PaginationLink onClick={(evt) => handlePreviousClick(evt)} previous={true} href="#" />
      </PaginationItem>
      {[...Array(pagesCount)].map((_, i) => (
        <PaginationItem active={i === currentPage} key={i}>
          <PaginationLink onClick={(evt) => handlePageClick(evt, i)} href="#">
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      ))}

      <PaginationItem disabled={currentPage >= pagesCount - 1}>
        <PaginationLink onClick={(evt) => handleNextClick(evt)} next={true} href="#" />
      </PaginationItem>
    </Pagination>
  );
};

export default TablePagination;
