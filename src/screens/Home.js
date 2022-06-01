import PageTitle from "../components/PageTitle";
import { useHistory } from "react-router";
import { logUserOut } from "../apollo";

function Home() {
  const history = useHistory();
  return (
    <div>
      <PageTitle title="Home" />
      <button onClick={() => logUserOut(history)}>로그아웃</button>
    </div>
  );
}

export default Home;
