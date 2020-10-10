import React, { Fragment, useState } from "react";
import { Table } from "reactstrap";
import { TABLE_COLUMNS } from "../../constants";
import TablePagination from "./TablePagination";

const PlayersTable = ({ players }) => {
  const [paginationState, updatePaginationState] = useState({
    currentPage: 0,
    pageSize: 25,
  });

  const getPagesCount = () => {
    const { pageSize } = paginationState;
    // pull this out into a CONSTANT later
    return Math.ceil(players.length / pageSize);
  };

  const handlePageClick = (evt, index) => {
    evt.preventDefault();
    updatePaginationState({ ...paginationState, currentPage: index });
  };
  const handlePreviousClick = (evt) => {
    const { currentPage } = paginationState;
    evt.preventDefault();
    if (currentPage > 0) {
      updatePaginationState({ ...paginationState, currentPage: currentPage - 1 });
    }
  };
  const handleNextClick = (evt) => {
    const { currentPage } = paginationState;
    const pagesCount = getPagesCount();
    evt.preventDefault();
    if (currentPage < pagesCount - 1) {
      updatePaginationState({ ...paginationState, currentPage: currentPage + 1 });
    }
  };

  const pagesCount = getPagesCount();
  const { currentPage, pageSize } = paginationState;

  return (
    <Fragment>
      <TablePagination
        pagesCount={pagesCount}
        currentPage={paginationState.currentPage}
        handlePageClick={handlePageClick}
        handlePreviousClick={handlePreviousClick}
        handleNextClick={handleNextClick}
      />
      <Table dark bordered striped>
        <thead>
          <tr>
            {TABLE_COLUMNS.map((column, i) => {
              return <th key={i}>{column}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {players.slice(currentPage * pageSize, (currentPage + 1) * pageSize).map((player, i) => {
            return (
              <tr key={i}>
                <th>{player.name}</th>
                <td>{player.team}</td>
                <td>{player.position}</td>
                <td>{player.attempts}</td>
                <td>{player.attemptsPerGame}</td>
                <td>{player.yards}</td>
                <td>{player.averagePerCarry}</td>
                <td>{player.yardsPerGame}</td>
                <td>{player.td}</td>
                <td>{player.longRush}</td>
                <td>{player.firstDowns}</td>
                <td>{player.firstDownPercentage}</td>
                <td>{player.twentyPlus}</td>
                <td>{player.fortyPlus}</td>
                <td>{player.fumbles}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default PlayersTable;
