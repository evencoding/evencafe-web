import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Demand from "./Demand";
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
      {pathname.startsWith("/profile") ||
      pathname.startsWith("/add") ||
      pathname.startsWith("/categories") ||
      pathname.startsWith("/comment") ||
      pathname.startsWith("/edit") ? (
        <SubHeader />
      ) : (
        <Header />
      )}
      <Content>{children}</Content>
      <Demand />
    </Container>
  );
}

export default Layout;
