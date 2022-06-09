import { gql, useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { showUpdateBtn, toggleShopUpdateBtn } from "../apollo";
import useUser from "../components/hooks/useUser";
import UpdateCoffeeShop from "./UpdateCoffeeShop";

const SEE_COFFEESHOP_QUERY = gql`
  query seeCoffeeShop($id: Int!) {
    seeCoffeeShop(id: $id) {
      id
      name
      bio
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
const DELETE_SHOP_MUTATION = gql`
  mutation deleteCoffeeShop($id: Int!) {
    deleteCoffeeShop(id: $id) {
      ok
      error
    }
  }
`;

const ShopContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const Btns = styled.div`
  position: absolute;
  bottom: 50px;
`;
const DeleteBtn = styled.div`
  cursor: pointer;
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  font-weight: 800;
  background-color: #e34614;
  border-radius: 8px;
  width: 150px;
  height: 35px;
  color: white;
  transition: 0.2s;
  &:hover {
    opacity: 0.6;
  }
`;
const UpdateBtn = styled(DeleteBtn)`
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
  const updataDeleteCoffeeShop = (cache, data) => {
    const {
      data: {
        deleteCoffeeShop: { ok },
      },
    } = data;
    console.log(data?.seeCoffeeShop);
    if (ok) {
      cache.evict({ id: `CoffeeShop:${id}` });
      cache.modify({
        id: `User:${loggedInUser?.me?.username}`,
        fields: {
          shops(prev) {
            console.log(prev);
            return prev.filter(
              (p) => p.__ref !== `CoffeeShop:${data?.seeCoffeeShop?.id}`
            );
          },
        },
      });
      history.goBack();
    }
  };
  const [deleteShop] = useMutation(DELETE_SHOP_MUTATION, {
    variables: { id: parseInt(id) },
    update: updataDeleteCoffeeShop,
  });
  const DeleteClick = () => {
    deleteShop();
  };
  return (
    <ShopContainer>
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
              <DeleteBtn onClick={DeleteClick}>삭제하기</DeleteBtn>
            ) : null}
          </div>
        ) : null}
      </Btns>
    </ShopContainer>
  );
}

export default Shop;
