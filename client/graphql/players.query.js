import gql from "graphql-tag";

const PLAYERS_QUERY = gql`
  query {
    players {
      _id
      team
      name
      position
      attempts
      attemptsPerGame
      yards
      averagePerCarry
      yardsPerGame
      td
      longRush
      firstDowns
      firstDownPercentage
      twentyPlus
      fortyPlus
      fumbles
    }
  }
`;

export default PLAYERS_QUERY;
