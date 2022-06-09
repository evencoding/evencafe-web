import { gql, useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
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

const SEECATEGORY_QUERY = gql`
  query seeCategory($name: String!, $page: Int!) {
    seeCategory(name: $name, page: $page) {
      totalShops
      totalPages
      shops {
        id
        name
        latitude
        longitude
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
  }
`;

function SearchCategory() {
  const location = useLocation();
  const keyword = decodeURIComponent(
    new URLSearchParams(location.search)
      .toString()
      .split("=")[1]
      .split("+")
      .join(" ")
  );
  const { data, loading } = useQuery(SEECATEGORY_QUERY, {
    variables: {
      name: "#" + keyword,
      page: 1,
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
            카테고리 <span>#{keyword}</span> 에 대한 검색결과 일지도!?
          </span>
        </Keyword>
      </Main>
    </Container>
  );
}

export default SearchCategory;
