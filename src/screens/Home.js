import PageTitle from "../components/PageTitle";
import { useHistory } from "react-router";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import HomeImg from "../components/HomeImg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
const Container = styled.div`
  height: 200vh;
`;

const Search = styled.div`
  form {
    position: relative;
  }
  input {
    padding: 1px 20px 1px 36px;
    font-size: 15px;
    font-weight: 800;
    background-color: ${(props) => props.theme.searchBg};
    border: 1px soild ${(props) => props.theme.borderColor};
    width: 300px;
    height: 30px;
    border-radius: 15px;
  }
  span {
    position: absolute;
    font-size: 18px;
    top: 6px;
    left: 8px;
  }
`;

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
  return (
    <Container>
      <PageTitle title="Home" />
      <HomeImg />
      <div>
        <Search>
          <form>
            <span>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
            <input type="text" placeholder="카페 이름, #카테고리" />
          </form>
        </Search>
      </div>
    </Container>
  );
}

export default Home;
