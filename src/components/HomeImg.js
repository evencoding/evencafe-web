import styled from "styled-components";
import bgImg from "../img/shard-2803941.jpg";

const Img = styled.div`
  height: 70vh;
  width: 100vw;
  position: absolute;
  z-index: -100;
  left: 0;
  top: 0;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.2) 80%,
      rgba(0, 0, 0, 1)
    ),
    url(${bgImg});
  /* background-image: linear-gradient(
      to bottom,
      ${(props) => props.theme.homeImgTop},
      ${(props) => props.theme.homeImgbutton}
    ),
    url(${bgImg}); */
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: cover;
  display: flex;
  justify-content: center;
  font-size: 30px;
  font-weight: 900;
  color: ${(props) => props.theme.fontColor};
  span {
    margin-top: 20%;
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
      <span>커피 한잔 하고 힘내세요!!</span>
      <Download>
        <img alt="andr" src={require("../img/andr.jpg")} />
        <img alt="apple" src={require("../img/apple.jpg")} />
      </Download>
    </Img>
  );
}

export default HomeImg;
