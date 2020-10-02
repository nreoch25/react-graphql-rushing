import { Fragment } from "react";
import { Row, Col } from "reactstrap";
import { useQuery } from "@apollo/react-hooks";
import PLAYERS_QUERY from "../graphql/players.query";

const Players = ({ me }) => {
  const { data, loading, error } = useQuery(PLAYERS_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {JSON.stringify(error.message)}</p>;
  }

  console.log("PLAYERS", data.players);

  return (
    <Fragment>
      <Row style={{ paddingTop: "30px" }}>
        <Col>
          <h1>filter form</h1>
        </Col>
      </Row>
      <Row style={{ paddingTop: "30px" }}>
        <Col>
          <h1>Players table</h1>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Players;
