import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
`;
const TopInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
`;
const UserName = styled.div`
  display: flex;
  align-items: center;
  span {
    font-size: 30px;
    font-weight: 600;
  }
`;
const UserAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.fontColor};
  background-image: url(${(props) => props.url});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 0px 0px 12px 0px ${(props) => props.theme.categoryColor};
  margin-right: 25px;
`;
const CoffeeShopNumber = styled.div`
  font-size: 25px;
`;
const ButtonInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Email = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 13px;
  div {
    &:not(:last-child) {
      margin-bottom: 5px;
    }
    span {
      font-weight: 600;
    }
  }
`;
const SNS = styled.div`
  display: flex;
  align-items: flex-end;
  font-weight: 600;
  font-size: 15px;
  a {
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
`;

function UserInfo({ data }) {
  return (
    <UserInfoContainer>
      <TopInfo>
        <UserName>
          <UserAvatar url={data?.seeProfile?.user?.avatarURL} />
          <span>{data?.seeProfile?.user?.username}</span>
        </UserName>
        <CoffeeShopNumber>
          등록한 카페 수 {data?.seeProfile?.user?.shops?.length}
        </CoffeeShopNumber>
      </TopInfo>
      <ButtonInfo>
        <SNS>
          <a href="https://www.instagram.com/jayden__0_0/">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://solved.ac/profile/evencoding">
            <div>solved.ac</div>
          </a>
          <a href="https://velog.io/@evencoding">
            <div>Velog</div>
          </a>
        </SNS>
        <Email>
          <div>
            email: <span>{data?.seeProfile?.user?.email}</span>
          </div>
          {data?.seeProfile?.user?.githubUsername ? (
            <div>
              githubEmail: <span>{data?.seeProfile?.user?.githubUsername}</span>
            </div>
          ) : null}
        </Email>
      </ButtonInfo>
    </UserInfoContainer>
  );
}

export default UserInfo;
