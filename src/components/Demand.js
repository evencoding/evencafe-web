import { gql, useMutation, useQuery } from "@apollo/client";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const SEE_DEMAND = gql`
  query seeDemand {
    seeDemand {
      payload
      username
    }
  }
`;
const CREATE_DEMAND_MUTATION = gql`
  mutation createDemand($payload: String!) {
    createDemand(payload: $payload) {
      ok
      error
    }
  }
`;

const DemandContainer = styled(motion.div)`
  position: fixed;
  bottom: 33px;
  right: 33px;
  cursor: pointer;
  z-index: 100;
`;
const DemandBtn = styled.div`
  span {
    display: block;
    margin-top: 10px;
    font-weight: 900;
  }
`;
const DemandIcon = styled.div`
  box-shadow: 0px 0px 12px 0px ${(props) => props.theme.fontColor};
  width: 50px;
  height: 50px;
  background-color: white;
  display: flex;
  font-size: 18px;
  font-weight: 900;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: black;
`;
const DemandBox = styled.div`
  box-shadow: 0px 0px 12px 0px ${(props) => props.theme.dark};
  width: 350px;
  background-color: white;
  height: 500px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
`;
const DemandBoxHeader = styled.div`
  width: 100%;
  height: 45px;
  background-color: ${(props) => props.theme.dark};
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  opacity: 0.9;
  color: black;
  span {
    font-weight: 600;
  }
  border-bottom: 1px solid black;
`;
const Input = styled.input`
  position: absolute;
  background-color: rgba(181, 94, 40, 0.3);
  padding: 0 10px;
  width: 100%;
  height: 38px;
  border-top: 1px solid;
  color: black;
  bottom: 0;
`;
const PayloadContainer = styled.div`
  padding: 8px 15px;
  color: black;
  height: 380px;
  overflow-y: auto;
`;
const Payload = styled.div`
  width: 100%;
  display: flex;
`;
const Username = styled.div`
  font-weight: 900;
  width: 70px;
`;
const Text = styled.div`
  margin-left: 10px;
  line-height: 16px;
`;
const Saperater = styled.div`
  width: 100%;
  height: 1px;
  background-color: black;
  margin: 7px 0;
`;
const AdminMessage = styled.div`
  width: 100%;
  height: 35px;
  background-color: rgba(1, 1, 1, 0.8);
  color: white;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Demand() {
  const [showBox, setShowBox] = useState(false);
  const { data, refetch } = useQuery(SEE_DEMAND);
  const [createDemand, { loading }] = useMutation(CREATE_DEMAND_MUTATION);
  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = ({ payload }) => {
    createDemand({
      variables: {
        payload,
      },
      onCompleted: () => refetch(),
    });
    setValue("payload", "");
  };
  return (
    <DemandContainer layout>
      {showBox ? (
        <DemandBox>
          <DemandBoxHeader>
            <span>건의사항</span>
            <FontAwesomeIcon
              icon={faXmark}
              size="2xl"
              onClick={() => setShowBox(false)}
              style={{ position: "absolute", right: 10, top: 8 }}
            />
          </DemandBoxHeader>
          <AdminMessage>
            ⚠️ 부적절한 사항은 사전조치 없이 삭제될 수 있습니다
          </AdminMessage>
          <PayloadContainer>
            {data?.seeDemand?.map((d, i) => (
              <React.Fragment key={i}>
                <Payload>
                  <Username>
                    {d?.username
                      ? d?.username?.length > 8
                        ? d?.username?.slice(0, 7) + "..."
                        : d?.username
                      : "익명의 손님"}
                  </Username>
                  <Text>{d?.payload}</Text>
                </Payload>
                {i === data?.seeDemand?.length - 1 ? null : <Saperater />}
              </React.Fragment>
            ))}
          </PayloadContainer>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("payload", {
                required: true,
              })}
              type="text"
              placeholder="건의사항을 남겨주시면 큰 도움이 됩니다!"
            />
          </form>
        </DemandBox>
      ) : (
        <DemandBtn onClick={() => setShowBox(!showBox)}>
          <DemandIcon>
            <FontAwesomeIcon icon={faComments} size="lg" color="#B55E28" />
          </DemandIcon>
          <span>건의 사항</span>
        </DemandBtn>
      )}
    </DemandContainer>
  );
}

export default Demand;
