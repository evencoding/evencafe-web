import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { shopBtn } from "../shared";

const DELETE_SHOP_MUTATION = gql`
  mutation deleteCoffeeShop($id: Int!) {
    deleteCoffeeShop(id: $id) {
      ok
      error
    }
  }
`;

export const DeleteBtn = styled(shopBtn)`
  background-color: #e34614;
`;

function DeleteShop({ id, loggedInUser }) {
  const history = useHistory();
  const updataDeleteCoffeeShop = (cache, data) => {
    const {
      data: {
        deleteCoffeeShop: { ok },
      },
    } = data;
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
  return <DeleteBtn onClick={DeleteClick}>삭제하기</DeleteBtn>;
}

export default DeleteShop;
