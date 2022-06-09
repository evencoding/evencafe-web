import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";

const CaffeeCard = styled.div`
  /* background-color: ${(props) => props.theme.fontColor}; */
  /* box-shadow: 0px 0px 12px 0px ${(props) => props.theme.categoryColor}; */
  box-shadow: 0px 0px 12px 0px ${(props) => props.theme.fontColor};
  /* color: ${(props) => props.theme.reverse}; */
  color: ${(props) => props.theme.fontColor};
  border-radius: 15px;
  height: 250px;
  display: flex;
  justify-content: space-between;
  border-radius: 12px;
  overflow: hidden;
`;
const CaffeePhoto = styled.div`
  width: 35%;
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  cursor: pointer;
`;
const NoImage = styled.div`
  width: 35%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div {
    font-size: 60px;
  }
  span {
    font-weight: 600;
    margin-top: 15px;
  }
`;
const CaffeeInfo = styled.div`
  padding: 12px 12px;
  width: 65%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const TopInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  height: 30%;
`;
const LikedNumber = styled.span`
  font-size: 12px;
`;
const CafeDiscription = styled.div`
  font-weight: 600;
  opacity: 0.8;
`;
const ButtonInfo = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40%;
`;
const CafeName = styled.div`
  font-size: 20px;
  font-weight: 900;
  margin-bottom: 12px;
  cursor: pointer;
`;
const CafeAdress = styled.div`
  opacity: 0.8;
  margin-bottom: 8px;
  font-weight: 600;
  cursor: pointer;
`;
const Like = styled.div`
  display: flex;
  font-size: 25px;
  cursor: pointer;
`;
const CafeCategory = styled.div`
  display: flex;
  flex-direction: column;
  border-color: white;
  justify-content: end;
  span {
    cursor: pointer;
    transition: 0.2s;
    padding: 5px;
    font-weight: 600;
    border-radius: 8px;
    border: 1.5px solid ${(props) => props.theme.fontColor};
    &:not(:last-child) {
      margin-bottom: 6px;
    }
    &:hover {
      background-color: ${(props) => props.theme.categoryColor};
    }
  }
`;
const ButtonRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: flex-end;
`;
const SeeCafe = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  font-weight: 900;
  font-size: 16px;
  cursor: pointer;
`;
const AdminUser = styled.div`
  margin-top: 25px;
  cursor: pointer;
  span {
    font-weight: 600;
  }
`;

function CoffeeShopCard({ coffeeShop }) {
  const history = useHistory();
  const seeShop = () => {
    history.push(`/shop/${coffeeShop?.id}`);
  };
  return (
    <CaffeeCard key={coffeeShop?.id}>
      {coffeeShop?.avatar ? (
        <CaffeePhoto onClick={seeShop} url={coffeeShop?.avatar} />
      ) : (
        <NoImage onClick={seeShop}>
          <div>
            <FontAwesomeIcon icon={faFileImage} />
          </div>
          <span>No Image</span>
        </NoImage>
      )}
      <CaffeeInfo>
        <TopInfo>
          <div>
            <Link to={`/shop/${coffeeShop?.id}`}>
              <CafeName>{coffeeShop?.name}</CafeName>
            </Link>
            <Link to={`/shop/${coffeeShop?.id}`}>
              <CafeAdress>
                {coffeeShop?.adress ? (
                  coffeeShop?.adress?.length > 19 ? (
                    <span>{coffeeShop?.adress?.substring(0, 20)}...</span>
                  ) : (
                    <span>{coffeeShop?.adress}</span>
                  )
                ) : (
                  <span>등록된 주소 없음</span>
                )}
              </CafeAdress>
            </Link>
            <LikedNumber>{coffeeShop?.followers} 명이 즐겨찾기함</LikedNumber>
          </div>
          <Like>
            <FontAwesomeIcon icon={faStar} />
          </Like>
        </TopInfo>
        <Link to={`/shop/${coffeeShop.id}`}>
          <CafeDiscription>
            {coffeeShop?.bio ? (
              coffeeShop?.bio.length > 25 ? (
                <span>{coffeeShop?.bio?.substring(0, 26)}...</span>
              ) : (
                <span>{coffeeShop?.bio}</span>
              )
            ) : null}
          </CafeDiscription>
        </Link>
        <ButtonInfo>
          <CafeCategory>
            {coffeeShop?.categories?.map((category) => (
              <span key={category.id}>{category.name}</span>
            ))}
          </CafeCategory>
          <ButtonRight>
            <SeeCafe>
              <Link to={`/shop/${coffeeShop.id}`}>
                <div>
                  {coffeeShop?.name} 더보기{" "}
                  <FontAwesomeIcon icon={faCircleChevronRight} />
                </div>
              </Link>
            </SeeCafe>
            <AdminUser>
              <Link to={`/profile/${coffeeShop?.user?.username}`}>
                <div>
                  관리자: <span>{coffeeShop?.user?.username}</span>
                </div>
              </Link>
            </AdminUser>
          </ButtonRight>
        </ButtonInfo>
      </CaffeeInfo>
    </CaffeeCard>
  );
}

export default CoffeeShopCard;
