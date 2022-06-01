import styled from "styled-components";
import AuthHeader from "../headers/AuthHeader";

const Full = styled.div`
  display: flex;
`;

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50%;
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

const Img = styled.div`
  width: 50%;
  height: 100vh;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

function AuthLayout({ children }) {
  return (
    <Full>
      <Container>
        <AuthHeader />
        <Wrapper>{children}</Wrapper>
      </Container>
      <Img>
        <img alt="computer" src={require("../../img/coffee-4618705.jpg")} />
      </Img>
    </Full>
  );
}

export default AuthLayout;
