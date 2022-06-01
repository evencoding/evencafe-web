import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Greeting from "../components/auth/Greeting";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import routes from "../routes";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CREATEACCOUNT_MUTATION = gql`
  mutation createAccount(
    $name: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      name: $name
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

function Signup() {
  const history = useHistory();
  const onCompleted = (data) => {
    const { username, password } = getValues();
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      setError("result", { message: error });
      return;
    }
    history.push(routes.login, {
      message: "회원가입 해주셔서 감사합니다!!",
      username,
      password,
    });
  };
  const [createAccount, { loading }] = useMutation(CREATEACCOUNT_MUTATION, {
    onCompleted,
  });
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
  const onSibmitValid = (data) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: {
        ...data,
      },
    });
  };
  const clearLoginError = () => {
    clearErrors("result");
  };
  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <HeaderContainer>
          <Greeting
            hello="회원가입"
            haveFun="회원가입하면 내 카페를 소개할 수 있다!? 오히려 좋아"
          />
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSibmitValid)}>
          <Input
            {...register("email", {
              required: "이메일 정보는 필수일지도?",
            })}
            onFocus={clearLoginError}
            type="email"
            placeholder="Email"
          />
          <FormError message={errors?.email?.message} />
          <Input
            {...register("name", {
              required: "이름 정도는 적어 줘야지...",
            })}
            type="text"
            placeholder="Name"
          />
          <FormError message={errors?.name?.message} />
          <Input
            {...register("username", {
              required: "유저 이름으로 로그인 하는거니까 필수지!",
              minLength: {
                value: 5,
                message: "적어도 다섯 글자 이상으로 해주세용 ㅎ..",
              },
            })}
            onFocus={clearLoginError}
            type="text"
            placeholder="Username"
          />
          <FormError message={errors?.username?.message} />
          <Input
            {...register("password", {
              required: "아니 비밀번호도 없이 회원가입을 어찌 하겠사옵니까",
              minLength: {
                value: 8,
                message: "비밀번호는 8글자 이상으로 해야지..",
              },
            })}
            type="password"
            placeholder="Password"
          />
          <FormError message={errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? "로딩중..." : "회원가입"}
            disabled={!isValid || loading}
          />
          <FormError message={errors?.result?.message} />
        </form>
      </FormBox>
      <BottomBox
        cta="로그인하러 가기 >>"
        linkText="Log in"
        link={routes.login}
      />
    </AuthLayout>
  );
}
export default Signup;
