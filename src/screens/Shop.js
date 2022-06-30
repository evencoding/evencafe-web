import { gql, useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { faFileImage, faStar } from "@fortawesome/free-regular-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import { isLoggedInVar, showUpdateBtn, toggleShopUpdateBtn } from "../apollo";
import Category from "../components/Home/Category";
import useUser from "../components/hooks/useUser";
import KakaoMap from "../components/KakaoMap";
import { FatLink, LikedIcon, MainFont, shopBtn } from "../components/shared";
import DeleteShop from "../components/shop/DeleteShop";
import routes from "../routes";
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
export const SEE_COMMENT_QUERY = gql`
  query seeComments($id: Int!) {
    seeComments(id: $id) {
      id
      user {
        username
        avatarURL
      }
      payload
      isMine
      createdAt
    }
  }
`;
const TOGGLE_FOLLOW_COFFEESHOP_MUTATION = gql`
  mutation toggleFollowCoffeeShop($name: String!) {
    toggleFollowCoffeeShop(name: $name) {
      ok
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
  background-repeat: repeat-y;
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
  align-items: center;
`;
const Like = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 32px;
  cursor: pointer;
  span {
    margin-top: 10px;
    font-size: 14px;
    font-weight: 800;
  }
`;
const Actions = styled.div`
  display: flex;
`;
const CreateComment = styled(Like)`
  margin-right: 20px;
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
  margin-top: 45px;
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
const CommentContiner = styled.div`
  width: 100%;
`;
const ReviewText = styled.div`
  color: ${(props) => props.theme.shopFontColor};
  font-size: 22px;
  font-weight: 900;
  margin-bottom: 25px;
`;
const CommentsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 5%;
`;
const EnrollUser = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Avatar = styled.div`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background-color: yellow;
  margin-bottom: 5px;
  background-color: ${(props) => props.theme.fontColor};
  background-image: url(${(props) => props.url});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 0px 0px 12px 0px ${(props) => props.theme.categoryColor};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.categoryBg};
  font-size: 30px;
`;
const EnrollUsername = styled.div`
  font-size: 15px;
  font-weight: 600;
`;
const Comments = styled.div`
  display: flex;
  padding: 0 5%;
  width: 100%;
  flex-direction: column;
`;
const Date = styled.div`
  color: ${(props) => props.theme.shopFontColor};
  margin-bottom: 12px;
  opacity: 0.6;
`;
const Comment = styled.div`
  color: ${(props) => props.theme.shopFontColor};
  font-size: 18px;
  line-height: 23px;
`;
const Emoji = styled.div`
  font-size: 30px;
`;

function Shop() {
  const history = useHistory();
  const loggedIn = useReactiveVar(isLoggedInVar);
  const showUpdate = useReactiveVar(showUpdateBtn);
  const { data: loggedInUser } = useUser();
  const { id } = useParams();
  const { data } = useQuery(SEE_COFFEESHOP_QUERY, {
    variables: { id: parseInt(id) },
  });
  const { data: commentsData } = useQuery(SEE_COMMENT_QUERY, {
    variables: { id: parseInt(id) },
  });
  const updateFollowCoffeeShop = (cache, result) => {
    const {
      data: {
        toggleFollowCoffeeShop: { ok },
      },
    } = result;
    if (!ok) {
      return;
    }
    cache.modify({
      id: `CoffeeShop:${data?.seeCoffeeShop?.id}`,
      fields: {
        isFollowing(prev) {
          return !prev;
        },
        followers(prev) {
          if (data?.seeCoffeeShop?.isFollowing) {
            return prev - 1;
          }
          return prev + 1;
        },
      },
    });
    cache.modify({
      id: `User:${data?.seeCoffeeShop?.user?.username}`,
      fields: {
        followingShops(prev) {
          if (data?.seeCoffeeShop?.isFollowing) {
            return prev.filter(
              (p) => p.__ref !== `CoffeeShop:${data?.seeCoffeeShop?.id}`
            );
          }
        },
      },
    });
  };
  const [toggleFollowCoffeeShop, { loading }] = useMutation(
    TOGGLE_FOLLOW_COFFEESHOP_MUTATION,
    {
      update: updateFollowCoffeeShop,
    }
  );
  const onClick = () => {
    history.push({
      pathname: routes.createComment,
      state: {
        shopName: data?.seeCoffeeShop?.name,
        shopId: data?.seeCoffeeShop?.id,
      },
    });
  };
  const toggleLike = () => {
    if (loggedIn) {
      return toggleFollowCoffeeShop({
        variables: {
          name: data?.seeCoffeeShop?.name,
        },
      });
    }
    history.push("/login");
  };
  useEffect(() => {
    KakaoMap(data?.seeCoffeeShop?.latitude, data?.seeCoffeeShop?.longitude);
  }, [data?.seeCoffeeShop?.latitude, data?.seeCoffeeShop?.longitude]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
              <Actions>
                <CreateComment onClick={onClick}>
                  <FontAwesomeIcon icon={faPencil} />
                  <span>리뷰쓰기</span>
                </CreateComment>
                <Like onClick={toggleLike}>
                  {data?.seeCoffeeShop?.isFollowing ? (
                    <LikedIcon />
                  ) : (
                    <FontAwesomeIcon icon={faStar} />
                  )}
                  <span>즐겨찾기</span>
                </Like>
              </Actions>
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
                  {data?.seeCoffeeShop?.categories?.length > 0 ? (
                    <Category shopCategory={data} />
                  ) : null}
                </Categories>
              </ShopCategories>
            </ShopBottomInfo>
            <Line></Line>
            <CommentContiner>
              <ReviewText>
                리뷰 (
                {commentsData?.seeComments
                  ? commentsData?.seeComments?.length
                  : 0}
                )
              </ReviewText>
              {commentsData?.seeComments?.length > 0 ? (
                commentsData?.seeComments?.map((comment) => (
                  <React.Fragment key={comment.id}>
                    <CommentsWrapper>
                      <EnrollUser>
                        <Avatar url={comment?.user?.avatarURL}>
                          {comment?.user?.avatarURL ? null : (
                            <FontAwesomeIcon icon={faFileImage} />
                          )}
                        </Avatar>
                        <EnrollUsername>
                          {comment?.user?.username}
                        </EnrollUsername>
                      </EnrollUser>
                      <Comments>
                        <Date>2022-06-30</Date>
                        <Comment>
                          {comment?.payload?.split("\n").map((c) => (
                            <div key={c.id} style={{ height: "23px" }}>
                              {c}
                            </div>
                          ))}
                        </Comment>
                      </Comments>
                      <Emoji>🎖</Emoji>
                    </CommentsWrapper>
                    <Line></Line>
                  </React.Fragment>
                ))
              ) : (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <span>첫 리뷰를 작성 해 주세요!!</span>
                </div>
              )}
            </CommentContiner>
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
