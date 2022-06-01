import PageTitle from "../components/PageTitle";
import { useHistory } from "react-router";
import { logUserOut } from "../apollo";
import { gql, useQuery } from "@apollo/client";

const SEECOFFEESHOPS_QUERY = gql`
  query seeCoffeeShops($page: Int!) {
    seeCoffeeShops(page: $page) {
      totalPages
    }
  }
`;

function Home() {
  const history = useHistory();
  const { data } = useQuery(SEECOFFEESHOPS_QUERY, {
    variables: {
      page: 1,
    },
  });
  console.log(data);
  return (
    <div>
      <PageTitle title="Home" />
      <button onClick={() => logUserOut(history)}>로그아웃</button>
    </div>
  );
}

export default Home;
