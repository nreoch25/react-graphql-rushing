import React from "react";
import { ButtonGroup, Button } from "reactstrap";

const PlayersButtons = ({ sortingPlayers, resetPlayers, handleDownloadCSV }) => {
  return (
    <ButtonGroup className="mb-3">
      <Button outline color="primary" onClick={resetPlayers}>
        All Players
      </Button>
      <Button outline color="primary" onClick={sortingPlayers("yards")}>
        Rushing Yards Leaders
      </Button>
      <Button outline color="primary" onClick={sortingPlayers("longRush")}>
        Longest Rush Leaders
      </Button>
      <Button outline color="primary" onClick={sortingPlayers("td")}>
        Rushing Touchdown Leaders
      </Button>
      <Button outline color="primary" onClick={handleDownloadCSV}>
        Download CSV File
      </Button>
    </ButtonGroup>
  );
};

export default PlayersButtons;
