import React from "react";
import { ButtonGroup, Button } from "reactstrap";

const PlayersButtons = ({ sortingPlayers, resetPlayers }) => {
  return (
    <ButtonGroup className="mb-3">
      <h3 className="mr-3">Order by: </h3>
      <Button outline color="primary" onClick={resetPlayers}>
        All Players
      </Button>
      <Button outline color="primary" onClick={sortingPlayers("yards")}>
        Total Rushing Yards
      </Button>
      <Button outline color="primary" onClick={sortingPlayers("longRush")}>
        Longest Rush
      </Button>
      <Button outline color="primary" onClick={sortingPlayers("td")}>
        Total Rushing Touchdowns
      </Button>
    </ButtonGroup>
  );
};

export default PlayersButtons;
