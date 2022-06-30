import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { SEE_COMMENT_QUERY } from "./Shop";

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($shopId: Int!, $payload: String!) {
    createComment(shopId: $shopId, payload: $payload) {
      ok
      error
    }
  }
`;

const Container = styled.div`
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.div`
  width: 60%;
  margin-bottom: 30px;
  color: ${(props) => props.theme.shopFontColor};
  font-size: 16px;
  span {
    font-size: 30px;
    font-weight: 600;
    color: ${(props) => props.theme.fontColor};
  }
`;
const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  font-size: 18px;
  padding: 10px;
  outline: none;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.bgReverse};
`;
const Btn = styled.button`
  margin-top: 25px;
  width: 100%;
  height: 45px;
  color: ${(props) => props.theme.categoryBg};
  background-color: ${(props) => props.theme.fontColor};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  cursor: pointer;
`;
function CreateComment() {
  const history = useHistory();
  const [cnt, setCnt] = useState(0);
  const {
    state: { shopName, shopId },
  } = useLocation();
  const [createCommentMutation, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      refetchQueries: [SEE_COMMENT_QUERY, "seeComments"],
      onCompleted: () => history.goBack(),
    }
  );
  const { register, handleSubmit, watch } = useForm();
  const onValid = ({ comment }) => {
    createCommentMutation({
      variables: {
        shopId,
        payload: comment,
      },
    });
  };
  const onChange = () => {
    setCnt(watch("comment").length);
  };
  return (
    <Container>
      <Title>
        <span>{shopName}</span> 에 대한 솔직한 리뷰를 작성해 주세요
      </Title>
      <form style={{ width: "60%" }} onSubmit={handleSubmit(onValid)}>
        <TextArea
          {...register("comment", { onChange })}
          maxLength={1000}
          required
          autoFocus
          placeholder="방문하신 카페의 분위기나 느낀점을 알려주세용!"
        ></TextArea>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "4px",
          }}
        >
          <span>{cnt} / 1000</span>
        </div>
        <Btn>리뷰 올리기</Btn>
      </form>
    </Container>
  );
}

export default CreateComment;
