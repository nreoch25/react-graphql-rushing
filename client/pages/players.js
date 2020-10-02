import Layout from "../components/Layout/Layout";
import Players from "../components/Players";
import User from "../components/Auth/User";

const PlayersPage = () => (
  <Layout>
    <User>{(me) => <Players me={me} />}</User>
  </Layout>
);

export default PlayersPage;
