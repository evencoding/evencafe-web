import { useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import PageTitle from "../components/PageTitle";
import routes from "../routes";
import Greeting from "../components/auth/Greeting";
import { gql, useMutation } from "@apollo/client";
import { logUserIn } from "../apollo";

const GoHome = styled.div`
  font-size: 600px;
  font-size: 14px;
`;

const Notification = styled.div`
  color: #2ecc71;
  padding-top: 20px;
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

function Login() {
  const location = useLocation();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: location?.state?.username || "",
      password: location?.state?.password || "",
    },
  });
  console.log(isValid);
  const onCompleted = (data) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      setError("result", { message: error });
      return;
    } else {
      if (token) {
        logUserIn(token);
      }
      history.push(routes.home);
    }
  };
  const [login, { loading }] = useMutation(LOGIN_MUTATION, { onCompleted });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    login({
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
      <PageTitle title="Login" />
      <FormBox>
        <Greeting hello="로그인" haveFun="좋은 하루 보내세요!" />
        <Notification>{location?.state?.message}</Notification>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("username", {
              required: "username is required",
              minLength: {
                value: 5,
                message: "유저명은 5글자 이상일것인디!?",
              },
              //   validate: (currentValue) => currentValue.includes("potato"),
            })}
            onFocus={() => clearLoginError()}
            type="text"
            placeholder="Username"
            hasError={Boolean(errors?.username?.message)}
          />
          <FormError message={errors?.username?.message} />
          <Input
            {...register("password", {
              required: "password is required",
              minLength: {
                value: 3,
                message: "비밀번호는 8글자 이상일텐대이잉!?",
              },
            })}
            onFocus={() => clearLoginError()}
            type="password"
            placeholder="Password"
            hasError={Boolean(errors?.password?.message)}
          />
          <FormError message={errors.password?.message} />
          <Button
            type="submit"
            value={loading ? "로딩중..." : "로그인"}
            disabled={!isValid || loading}
          />
          <FormError message={errors.result?.message} />
        </form>
        <Separator />
        <GoHome>
          <Link to={routes.home}>
            <div>우선 한번 둘러보기</div>
          </Link>
        </GoHome>
      </FormBox>
      <BottomBox
        cta="회원가입하러 가기 >>"
        link={routes.signUp}
        linkText="Sign up"
      />
    </AuthLayout>
  );
}
export default Login;
