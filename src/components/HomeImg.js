import styled from "styled-components";
import bgImg from "../img/shard-2803941.jpg";
import cafe1 from "../img/cafe-1.jpg";
import cafe2 from "../img/cafe-2.jpg";
import cafe3 from "../img/cafe-3.jpg";

const Img = styled.div`
  height: 65vh;
  width: 100vw;
  position: absolute;
  z-index: -100;
  left: 0;
  top: 0;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.2) 80%,
      rgba(26, 24, 25, 1)
    ),
    url(${cafe3});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  font-size: 30px;
  font-weight: 900;
  color: ${(props) => props.theme.fontColor};
`;

const MainGreed = styled.div`
  color: white;
  margin-top: 110px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    &:not(:last-child) {
      margin: 10px;
    }
  }
`;

const Download = styled.div`
  position: absolute;
  bottom: 30px;
  right: 30px;
  img {
    border-radius: 6px;
    width: 160px;
    margin-left: 20px;
    border: 1px solid white;
  }
`;

function HomeImg() {
  return (
    <Img>
      <MainGreed>
        <span>방문해 주셔서 감사합니다!!</span>
        <span>❤️항상 응원합니다❤️</span>
      </MainGreed>
      <Download>
        <img alt="andr" src={require("../img/andr.jpg")} />
        <img alt="apple" src={require("../img/apple.jpg")} />
      </Download>
    </Img>
  );
}

export default HomeImg;
