import React from "react";
import { Table } from "reactstrap";
import { TABLE_COLUMNS } from "../../constants";

const PlayersTable = ({ players }) => {
  return (
    <Table dark bordered striped>
      <thead>
        <tr>
          {TABLE_COLUMNS.map((column, i) => {
            return <th key={i}>{column}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {players.map((player, i) => {
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
  );
};

export default PlayersTable;
