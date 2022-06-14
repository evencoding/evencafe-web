import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { toggleShopUpdateBtn } from "../apollo";
import Button from "../components/auth/Button";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import { CoffeeShopForm, Title } from "../components/shared";

const EDIT_COFFEESHOP = gql`
  mutation editCoffeeShop(
    $id: Int!
    $bio: String
    $adress: String
    $name: String
    $categories: String
    $avatar: Upload
  ) {
    editCoffeeShop(
      id: $id
      bio: $bio
      adress: $adress
      name: $name
      categories: $categories
      avatar: $avatar
    ) {
      ok
      id
      error
    }
  }
`;
const UPLOAD_PHOTO = gql`
  mutation uploadPhoto($id: Int!, $file: Upload!) {
    uploadPhoto(id: $id, file: $file) {
      ok
      error
    }
  }
`;

const UpdateContinaer = styled(CoffeeShopForm)`
  margin-top: 50px;
`;

function UpdateCoffeeShop({ id }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
  });
  const onCompletedUpload = ({ ok, error }) => {
    if (!ok) {
      return;
    }
  };
  const [uploadPhoto, { loading: uploadLoading }] = useMutation(UPLOAD_PHOTO);
  const onCompletedUpdate = (data) => {
    const {
      editCoffeeShop: { ok, error },
    } = data;
    if (!ok) {
      setError("result", { message: error });
      return;
    }
    if (getValues()?.photo.length > 0) {
      if (uploadLoading) {
        return;
      }
      uploadPhoto({
        variables: {
          id,
          file: getValues()?.photo[0],
        },
        onCompleted: onCompletedUpload,
      });
    }
    toggleShopUpdateBtn();
  };
  const [updateShop, { loading: updateLoading }] = useMutation(
    EDIT_COFFEESHOP,
    {
      onCompleted: onCompletedUpdate,
    }
  );
  const onSubmitValid = ({ name, description, adress, category, avatar }) => {
    if (updateLoading) {
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
    updateShop({
      variables: {
        id,
        ...(name && { name }),
        ...(description && { bio: description }),
        ...(adress && { adress }),
        ...(category && { categories: category }),
        ...(avatar && { avatar: avatar[0] }),
      },
    });
  };
  const clearLoginError = () => {
    clearErrors("result");
  };
  return (
    <UpdateContinaer>
      <Title onClick={toggleShopUpdateBtn}>카페 수정하기</Title>
      <form onSubmit={handleSubmit(onSubmitValid)}>
        <Input
          {...register("name")}
          onFocus={clearLoginError}
          type="text"
          placeholder="카페 이름"
        />
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
        Coffee Shop Avatar
        <Input
          {...register("photo")}
          onFocus={clearLoginError}
          type="file"
          accept="image/png, image/jpeg"
        />
        Coffee Shop Photo
        <Button type="submit" disabled={!isValid} value={"수정하기"} />
        <FormError message={errors?.result?.message} />
      </form>
    </UpdateContinaer>
  );
}

export default UpdateCoffeeShop;
