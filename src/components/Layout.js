import styled from "styled-components";
import Header from "./headers/Header";

const Container = styled.div``;

const Content = styled.main`
  margin: 0 auto;
  margin-top: 45px;
  max-width: ${(props) => props.theme.maxW};
  width: 100%;
`;

function Layout({ children }) {
  return (
    <Container>
      <Header />
      <Content>{children}</Content>
    </Container>
  );
}

export default Layout;
