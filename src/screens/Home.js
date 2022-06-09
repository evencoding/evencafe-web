import React from "react";
import PageTitle from "../components/PageTitle";
import { useHistory } from "react-router";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import HomeImg from "../components/HomeImg";
import Category from "../components/Home/Category";
import { MenuContainer, MenuTitle } from "../components/Home/MenuShared";
import CoffeeShops from "../components/Home/CoffeeShops";

const SEECATEGORIES_QUERY = gql`
  query seeCategories($page: Int!) {
    seeCategories(page: $page) {
      categories {
        id
        name
      }
      totalCategories
    }
  }
`;
const SEECOFFEESHOPS_QUERY = gql`
  query seeCoffeeShops($page: Int!) {
    seeCoffeeShops(page: $page) {
      totalPages
      shops {
        id
        name
        bio
        adress
        avatar
        followers
        categories {
          id
          name
        }
        user {
          username
          avatarURL
        }
      }
    }
  }
`;

const Container = styled.div`
  height: 200vh;
`;
const Main = styled.div`
  margin-top: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Home() {
  const history = useHistory();
  const { data: categoryData, loading: categoryLoading } = useQuery(
    SEECATEGORIES_QUERY,
    {
      variables: {
        page: 1,
      },
    }
  );
  const { data: coffeeShopsData, loading: coffeeShopsLoading } = useQuery(
    SEECOFFEESHOPS_QUERY,
    {
      variables: {
        page: 1,
      },
    }
  );
  return (
    <Container>
      <PageTitle title="Home" />
      <HomeImg />
      <Main>
        <Category
          title="Category"
          categoryData={categoryData}
          totalCategories={categoryData?.seeCategories?.totalCategories}
        />
        <MenuContainer>
          <MenuTitle>즐겨찾기 한 카페</MenuTitle>
          <span>즐겨찾기 한 카페를 볼 수 있어요</span>
          <span>로그인 후, 가고싶은 카페를 즐겨찾기 해 보세요 !!</span>
        </MenuContainer>
        <CoffeeShops
          title="추천 카페"
          shops={coffeeShopsData?.seeCoffeeShops?.shops}
        />
      </Main>
    </Container>
  );
}

export default Home;
