import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Input from "../components/auth/Input";

const EditProfileContainer = styled.div`
  margin-top: ${(props) => props.theme.subHeaderMT};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.div`
  font-weight: 900;
  display: block;
  font-size: 24px;
  margin-bottom: 30px;
`;

function EditProfile() {
  const { username } = useParams();
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
  const onSubmitValid = () => {};
  const clearLoginError = () => {
    clearErrors("result");
  };
  return (
    <EditProfileContainer>
      <Title>프로필 수정하기</Title>
      <form onSubmit={handleSubmit(onSubmitValid)}>
        <Input />
        <Input />
        <Input />
        <Input />
        <Input />
        <Input />
        <Input />
      </form>
    </EditProfileContainer>
  );
}

export default EditProfile;
