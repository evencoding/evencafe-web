import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Header from "./headers/Header";
import SubHeader from "./headers/SubHeader";

const Container = styled.div``;

const Content = styled.main`
  margin: 0 auto;
  margin-top: 45px;
  max-width: ${(props) => props.theme.maxW};
  width: 100%;
`;

function Layout({ children }) {
  const history = useHistory();
  const {
    location: { pathname },
  } = history;
  return (
    <Container>
      {pathname.startsWith("/profile") || pathname.startsWith("/add") ? (
        <SubHeader />
      ) : (
        <Header />
      )}
      <Content>{children}</Content>
    </Container>
  );
}

export default Layout;
