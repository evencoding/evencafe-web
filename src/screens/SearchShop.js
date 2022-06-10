import { gql, useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import CoffeeShops from "../components/Home/CoffeeShops";
import HomeImg from "../components/HomeImg";
import PageTitle from "../components/PageTitle";

const Container = styled.div`
  height: 200vh;
`;

const Main = styled.div`
  margin-top: 70vh;
`;

const Keyword = styled.div`
  padding-top: 55px;
  display: flex;
  justify-content: center;
  font-size: 18px;
  span {
    span {
      font-weight: 900;
    }
  }
`;
const Notfound = styled.div`
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;

const SEARCHCOFFEESHOP_QUERY = gql`
  query searchCoffeeShop($keyword: String!) {
    searchCoffeeShop(keyword: $keyword) {
      id
      name
      adress
      followers
      categories {
        name
      }
      bio
      avatar
      user {
        avatarURL
        username
      }
      photos {
        url
      }
    }
  }
`;

function SearchShop() {
  const location = useLocation();
  const keyword = decodeURIComponent(
    new URLSearchParams(location.search)
      .toString()
      .split("=")[1]
      .split("+")
      .join(" ")
  );
  const { data, loading } = useQuery(SEARCHCOFFEESHOP_QUERY, {
    variables: {
      keyword,
    },
  });
  console.log(data);
  return (
    <Container>
      <PageTitle title="Search" />
      <HomeImg />
      <Main>
        <Keyword>
          <span>
            커피샵 <span>{keyword}</span> 에 대한 검색결과 일지도!?
          </span>
        </Keyword>
        {data?.searchCoffeeShop?.length > 0 ? (
          <CoffeeShops shops={data?.searchCoffeeShop} />
        ) : (
          <Notfound>
            <span>{keyword}에 대한 검색 결과가 존재하지 않습니다ㅠㅠ</span>
          </Notfound>
        )}
      </Main>
    </Container>
  );
}

export default SearchShop;
