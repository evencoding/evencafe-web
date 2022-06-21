import React from "react";
import PageTitle from "../components/PageTitle";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import styled from "styled-components";
import HomeImg from "../components/HomeImg";
import Category from "../components/Home/Category";
import { MenuContainer, MenuTitle } from "../components/Home/MenuShared";
import CoffeeShops from "../components/Home/CoffeeShops";
import { isLoggedInVar } from "../apollo";
import useUser from "../components/hooks/useUser";

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
const SEE_PROFILE_QUERY = gql`
  query seeProfile($id: Int, $username: String) {
    seeProfile(id: $id, username: $username) {
      user {
        username
        followingShops {
          id
          name
          bio
          adress
          avatar
          followers
          isFollowing
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
  }
`;
const SEECOFFEESHOPS_QUERY = gql`
  query seeCoffeeShops($offset: Int!) {
    seeCoffeeShops(offset: $offset) {
      id
      name
      bio
      adress
      avatar
      followers
      isFollowing
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

const LikedGreeting = styled.div`
  font-size: 14px;
  opacity: 0.7;
  font-weight: 600;
`;

function Home() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const loggedInUser = useUser();
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
        offset: 0,
      },
    }
  );
  const { data: seeProfileData, loading: seeProfileLoading } = useQuery(
    SEE_PROFILE_QUERY,
    {
      variables: { username: loggedInUser?.data?.me?.username },
    }
  );
  const likedCoffeeShop = () => {
    if (!isLoggedIn) {
      return (
        <MenuContainer>
          <MenuTitle>즐겨찾기 한 카페</MenuTitle>
          <LikedGreeting>
            <span>로그인 후, 가고싶은 카페를 즐겨찾기 해 보세요 !!</span>
          </LikedGreeting>
        </MenuContainer>
      );
    }
    if (seeProfileData?.seeProfile?.user?.followingShops?.length > 0) {
      return (
        <CoffeeShops
          title="즐겨찾기 한 카페"
          shops={seeProfileData?.seeProfile?.user?.followingShops}
        />
      );
    }
    return (
      <MenuContainer>
        <MenuTitle>즐겨찾기 한 카페</MenuTitle>
        <LikedGreeting>
          <span>즐겨찾기 한 카페를 볼 수 있어요</span>
        </LikedGreeting>
      </MenuContainer>
    );
  };
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
        {likedCoffeeShop()}
        <CoffeeShops
          title="추천 카페"
          shops={coffeeShopsData?.seeCoffeeShops}
        />
      </Main>
    </Container>
  );
}

export default Home;
