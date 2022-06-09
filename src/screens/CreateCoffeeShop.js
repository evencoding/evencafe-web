import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/auth/Button";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import { CoffeeShopForm } from "../components/shared";

const CREATE_COFFEESHOP_MUTATION = gql`
  mutation createCoffeeShop(
    $name: String!
    $bio: String
    $adress: String
    $categories: String
    $avatar: Upload
  ) {
    createCoffeeShop(
      name: $name
      bio: $bio
      adress: $adress
      categories: $categories
      avatar: $avatar
    ) {
      ok
      id
      error
    }
  }
`;

const Title = styled.div`
  font-weight: 900;
  display: block;
  font-size: 24px;
  margin-bottom: 50px;
`;

function CreateCoffeeShop() {
  const history = useHistory();
  const onCompleted = ({ createCoffeeShop: { ok, id, error } }) => {
    if (!ok) {
      setError("result", { message: error });
      return;
    }
    history.push(`/shop/${id}`);
  };
  const [createCoffeeShop, { loading }] = useMutation(
    CREATE_COFFEESHOP_MUTATION,
    {
      onCompleted,
    }
  );
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
  });
  const onSubmitValid = ({ name, description, adress, category, avatar }) => {
    if (loading) {
      return;
    }
    if (category) {
      category = category.split(" ");
      category.filter((word) => word.startsWith("#"));
      if (category.length > 3) {
        setError("category", {
          message: "카테고리는 최대 3개까지만 등록 가능합니다",
        });
        return;
      } else {
        category = category.join(" ");
      }
    }
    createCoffeeShop({
      variables: {
        name,
        ...(description && { bio: description }),
        adress,
        ...(category && { categories: category }),
        ...(avatar && { avatar: avatar[0] }),
      },
    });
  };
  const clearLoginError = () => {
    clearErrors("result");
  };
  return (
    <CoffeeShopForm>
      <Title>카페 등록하기</Title>
      <form onSubmit={handleSubmit(onSubmitValid)}>
        <Input
          {...register("name", {
            required: "카페 이름정도는 있어야 생성할 수 있을텐데..?",
          })}
          onFocus={clearLoginError}
          type="text"
          placeholder="카페 이름"
        />
        <FormError message={errors?.name?.message} />
        <Input
          {...register("description")}
          onFocus={clearLoginError}
          type="text"
          placeholder="한줄 설명 !!"
        />
        <Input {...register("adress")} type="text" placeholder="카페 주소" />
        <Input
          {...register("category")}
          onFocus={clearLoginError}
          type="text"
          placeholder="#카테고리   *최대 3개"
        />
        <FormError message={errors?.category?.message} />
        <Input
          {...register("avatar")}
          onFocus={clearLoginError}
          type="file"
          accept="image/png, image/jpeg"
        />
        <Button
          type="submit"
          disabled={!isValid || loading}
          value={loading ? "로딩중..." : "생성하기"}
        />
        <FormError message={errors?.result?.message} />
      </form>
    </CoffeeShopForm>
  );
}

export default CreateCoffeeShop;
