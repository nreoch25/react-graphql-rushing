import { Fragment, useState } from "react";
import { Row, Col } from "reactstrap";
import { useQuery } from "@apollo/react-hooks";
import PLAYERS_QUERY from "../../graphql/players.query";
import PlayersTable from "./PlayersTable";
import FilterForm from "./FilterForm";
import FilterButtons from "./FilterButtons";
import { compareNumber, getLocalStorage, setLocalStorage, downloadCSV } from "../../utils";

const Players = ({ me }) => {
  const { data, loading, error } = useQuery(PLAYERS_QUERY);
  const [filtered, setFiltered] = useState({
    players: null,
    filterMode: false,
    searchMode: false,
    descending: true,
  });

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {JSON.stringify(error.message)}</p>;
  }
  const reverseOrder = () => {
    const playersArray = [...filtered.players];
    const reversedArray = playersArray.reverse();
    setFiltered({ ...filtered, players: reversedArray, descending: !filtered.descending });
  };

  const sortFiltered = (type) => {
    const playersArray = [...filtered.players];
    const sortedPlayers = playersArray.sort(compareNumber(type));
    setFiltered({ ...filtered, players: sortedPlayers });
  };

  const sortingPlayers = (type) => () => {
    if (filtered.searchMode && filtered.players) {
      return sortFiltered(type);
    }

    if (getLocalStorage(type) !== null) {
      console.log(`Getting ${type} from Local Storage`);
      return setFiltered({ players: JSON.parse(getLocalStorage(type)), filterMode: true });
    }

    console.log(`Sorting by ${type} and storing in Local Storage`);
    const playersArray = [...data.players];
    const sortedPlayers = playersArray.sort(compareNumber(type));
    setFiltered({ players: sortedPlayers, filterMode: true });
    setLocalStorage(type, JSON.stringify(sortedPlayers));
  };

  const resetPlayers = () => {
    setFiltered({ players: null, searchMode: false });
  };

  const filterByName = (name) => {
    const nameLowerCase = name.toLowerCase();

    if (getLocalStorage(nameLowerCase) !== null) {
      console.log(`Getting ${nameLowerCase} from Local Storage`);
      return setFiltered({ players: JSON.parse(getLocalStorage(nameLowerCase)), searchMode: true });
    }

    console.log(`Filtering for ${name} and storing in Local Storage`);
    const playersArray = [...data.players];

    const filteredPlayers = playersArray.filter((player) => {
      const playerLowerCase = player.name.toLowerCase();
      return playerLowerCase.includes(nameLowerCase);
    });

    setFiltered({ players: filteredPlayers, searchMode: true });
    setLocalStorage(nameLowerCase, JSON.stringify(filteredPlayers));
  };

  const handleDownloadCSV = () => {
    const csvPlayers = filtered.players || data.players;
    downloadCSV(csvPlayers);
  };

  const players = filtered.players || data.players;

  return (
    <Fragment>
      <Row style={{ paddingTop: "30px" }}>
        <Col>
          <FilterForm filterByName={filterByName} />
          <FilterButtons
            sortingPlayers={sortingPlayers}
            resetPlayers={resetPlayers}
            handleDownloadCSV={handleDownloadCSV}
            reverseOrder={reverseOrder}
            filterMode={filtered.searchMode || filtered.filterMode}
            descending={filtered.descending}
          />
          <PlayersTable players={players} />
        </Col>
      </Row>
    </Fragment>
  );
};

export default Players;
