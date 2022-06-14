import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/auth/Button";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import { CoffeeShopForm, Title } from "../components/shared";

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile(
    $email: String
    $name: String
    $username: String
    $password: String
    $location: String
    $avatarURL: Upload
    $githubUsername: String
  ) {
    editProfile(
      email: $email
      name: $name
      username: $username
      password: $password
      location: $location
      avatarURL: $avatarURL
      githubUsername: $githubUsername
    ) {
      ok
      error
    }
  }
`;

const UpdateContinaer = styled(CoffeeShopForm)`
  margin-top: 100px;
`;

function EditProfile() {
  const history = useHistory();
  const [submitValid, setSubmitValid] = useState(true);
  const { username: targetUsername } = useParams();
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
  const updateProfileCache = (cache, result) => {
    console.log(cache);
    const {
      data: {
        editProfile: { ok, error },
      },
    } = result;
    if (!ok) {
      setError("result", {
        message: error,
      });
      setSubmitValid(false);
    } else {
      const {
        email,
        name,
        username,
        password,
        location,
        avatarURL,
        githubUsername,
      } = getValues();
      cache.modify({
        id: `User:${targetUsername}`,
        fields: {
          email(prev) {
            if (email) {
              return email;
            }
          },
          name(prev) {
            if (name) {
              return name;
            }
          },
          username(prev) {
            if (username) {
              return username;
            }
          },
          password(prev) {
            if (password) {
              return password;
            }
          },
          location(prev) {
            if (location) {
              return location;
            }
          },
          avatarURL(prev) {
            if (avatarURL) {
              return avatarURL;
            }
          },
          githubUsername(prev) {
            if (githubUsername) {
              return githubUsername;
            }
          },
        },
      });
      history.push(`/profile/${username ? username : targetUsername}`);
    }
  };
  const [editProfileMutation, { loading }] = useMutation(
    EDIT_PROFILE_MUTATION,
    {
      update: updateProfileCache,
    }
  );
  const onSubmitValid = ({
    avatarURL,
    email,
    githubUsername,
    location,
    name,
    password,
    username,
  }) => {
    editProfileMutation({
      variables: {
        ...(avatarURL && { avatarURL: avatarURL[0] }),
        ...(email && { email }),
        ...(githubUsername && { githubUsername }),
        ...(location && { location }),
        ...(name && { name }),
        ...(password && { password }),
        ...(username && { username }),
      },
    });
  };
  const clearLoginError = () => {
    clearErrors("result");
    setSubmitValid(true);
  };
  return (
    <UpdateContinaer>
      <Title>{targetUsername}'s 프로필 수정하기</Title>
      <form onSubmit={handleSubmit(onSubmitValid)}>
        <Input
          {...register("avatarURL")}
          type="file"
          accept="image/png, image/jpeg"
        />
        avatar
        <Input
          {...register("email")}
          onFocus={clearLoginError}
          placeholder="Email"
          type="email"
        />
        <Input
          {...register("name")}
          onFocus={clearLoginError}
          placeholder="Name"
          type="text"
        />
        <Input
          {...register("username")}
          onFocus={clearLoginError}
          placeholder="Username"
          type="text"
        />
        <Input
          {...register("location")}
          onFocus={clearLoginError}
          placeholder="Location"
          type="text"
        />
        <Input
          {...register("githubUsername")}
          onFocus={clearLoginError}
          placeholder="Github Username"
          type="text"
        />
        <Input
          {...register("password")}
          onFocus={clearLoginError}
          placeholder="Password"
          type="password"
        />
        <Button
          type="submit"
          value={loading ? "로딩중..." : "수정하기"}
          disabled={!submitValid || loading}
        />
        <FormError message={errors?.result?.message} />
      </form>
    </UpdateContinaer>
  );
}

export default EditProfile;
