import styled from "styled-components";

const Container = styled.div`
  font-size: 15px;
  font-weight: 900;
  display: flex;
  align-items: center;
  div {
    div {
      margin-left: 40px;
    }
  }
`;

const Img = styled.img`
  width: 32px;
  position: absolute;
  top: 10px;
`;

function Logo() {
  return (
    <Container>
      <div>
        <Img alt="logo" src={require("../../img/logo.png")} />
        <div>NOMAD</div>
        <div>COFFEE</div>
      </div>
    </Container>
  );
}

export default Logo;
