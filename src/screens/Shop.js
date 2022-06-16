import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { showUpdateBtn, toggleShopUpdateBtn } from "../apollo";
import Category from "../components/Home/Category";
import useUser from "../components/hooks/useUser";
import KakaoMap from "../components/KakaoMap";
import { FatLink, LikedIcon, MainFont, shopBtn } from "../components/shared";
import DeleteShop from "../components/shop/DeleteShop";
import UpdateCoffeeShop from "./UpdateCoffeeShop";

const SEE_COFFEESHOP_QUERY = gql`
  query seeCoffeeShop($id: Int!) {
    seeCoffeeShop(id: $id) {
      id
      name
      bio
      avatar
      adress
      latitude
      longitude
      followers
      isFollowing
      user {
        username
        avatarURL
      }
      photos {
        id
        url
      }
      categories {
        id
        name
      }
      createdAt
    }
  }
`;

const ShopContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -30px;
`;
const ShopImg = styled.div`
  position: absolute;
  z-index: -100;
  width: 100%;
  height: 100%;
  top: 0;
  background-image: url(${(props) => props.url});
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.5;
`;
const ShopInfo = styled.div`
  margin-top: 50px;
  min-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ShopInfos = styled.div`
  margin-top: 60px;
  width: 100%;
  padding-right: 300px;
`;
const ShopTopInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Like = styled.div`
  display: flex;
  font-size: 30px;
  cursor: pointer;
`;
const ShopBottomInfo = styled.div`
  div {
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
`;
const ShopCategories = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  position: relative;
`;
const Categories = styled.div`
  position: absolute;
  top: -14px;
  left: 93px;
`;
const ShopName = styled.span`
  font-size: 30px;
  font-weight: 900;
  color: ${(props) => props.theme.shopFontColor};
`;
const ShopPhotos = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;
const ShopPhoto = styled.div`
  border-radius: 20px;
  width: 200px;
  height: 200px;
  background-image: url(${(props) => props.url});
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: cover;
  &:not(:last-child) {
    margin-right: 15px;
  }
`;
const Btns = styled.div`
  position: absolute;
  bottom: 20px;
`;
const UpdateBtn = styled(shopBtn)`
  background-color: #1ae600;
  color: black;
  margin-top: 0px;
`;
const Line = styled.div`
  margin: 30px 0;
  border: 0.3px solid ${(props) => props.theme.shopFontColor};
  opacity: 0.7;
`;

const Map = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

function Shop() {
  const showUpdate = useReactiveVar(showUpdateBtn);
  const { data: loggedInUser } = useUser();
  const { id } = useParams();
  const { data } = useQuery(SEE_COFFEESHOP_QUERY, {
    variables: { id: parseInt(id) },
  });
  useEffect(() => {
    KakaoMap(data?.seeCoffeeShop?.latitude, data?.seeCoffeeShop?.longitude);
  }, [data?.seeCoffeeShop?.latitude, data?.seeCoffeeShop?.longitude]);
  return (
    <ShopContainer>
      <ShopImg url={data?.seeCoffeeShop?.avatar} />
      {showUpdate ? (
        <UpdateCoffeeShop id={parseInt(id)} />
      ) : (
        <ShopInfo>
          <ShopPhotos>
            {data?.seeCoffeeShop?.photos?.map((photo) => (
              <ShopPhoto key={photo.id} url={photo?.url}></ShopPhoto>
            ))}
          </ShopPhotos>
          <ShopInfos>
            <ShopTopInfo>
              <ShopName>{data?.seeCoffeeShop?.name}</ShopName>
              <Like>
                {data?.seeCoffeeShop?.isFollowing ? (
                  <LikedIcon />
                ) : (
                  <FontAwesomeIcon icon={faStar} />
                )}
              </Like>
            </ShopTopInfo>
            <Line></Line>
            <ShopBottomInfo>
              <div>
                <FatLink>카페 주소</FatLink>{" "}
                <MainFont>{data?.seeCoffeeShop?.adress}</MainFont>
              </div>
              <div>
                <FatLink>한줄 소개</FatLink>{" "}
                <MainFont>{data?.seeCoffeeShop?.bio}</MainFont>
              </div>
              <ShopCategories>
                <FatLink>카테고리</FatLink>
                <Categories>
                  {data?.seeCoffeeShop?.categories ? (
                    <Category shopCategory={data} />
                  ) : null}
                </Categories>
              </ShopCategories>
            </ShopBottomInfo>
            <Line></Line>
          </ShopInfos>
        </ShopInfo>
      )}
      <Map>
        <div
          id="myMap"
          style={{
            width: "330px",
            height: "330px",
            borderRadius: "15px",
          }}
        />
      </Map>
      <Btns>
        {data?.seeCoffeeShop?.user?.username === loggedInUser?.me?.username ? (
          <div>
            {!showUpdate ? (
              <UpdateBtn onClick={toggleShopUpdateBtn}>수정하기</UpdateBtn>
            ) : (
              <UpdateBtn onClick={toggleShopUpdateBtn}>돌아가기</UpdateBtn>
            )}
            {loggedInUser?.me?.username ===
            data?.seeCoffeeShop?.user?.username ? (
              <DeleteShop id={id} loggedInUser={loggedInUser}>
                삭제하기
              </DeleteShop>
            ) : null}
          </div>
        ) : null}
      </Btns>
    </ShopContainer>
  );
}

export default Shop;
