import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { showUpdateBtn, toggleShopUpdateBtn } from "../apollo";
import useUser from "../components/hooks/useUser";
import { shopBtn } from "../components/shared";
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
const ShopInfo = styled.div``;
const ShopName = styled.span`
  font-size: 30px;
  font-weight: 900;
`;
const Btns = styled.div`
  position: absolute;
  bottom: 50px;
`;
const UpdateBtn = styled(shopBtn)`
  background-color: #1ae600;
  color: black;
  margin-top: 0px;
`;

function Shop() {
  const showUpdate = useReactiveVar(showUpdateBtn);
  const { id } = useParams();
  const history = useHistory();
  const { data: loggedInUser } = useUser();
  const { data } = useQuery(SEE_COFFEESHOP_QUERY, {
    variables: { id: parseInt(id) },
  });
  console.log(data);
  return (
    <ShopContainer>
      <ShopImg url={data?.seeCoffeeShop?.avatar} />
      <ShopInfo>
        <ShopName>{data?.seeCoffeeShop?.name}</ShopName>
      </ShopInfo>
      {showUpdate ? <UpdateCoffeeShop id={parseInt(id)} /> : null}
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
