import { Link } from "react-router-dom";
import styled from "styled-components";
import DarkMode from "./DarkMode";
import Logo from "./Logo";
import routes from "../../routes";

const Container = styled.div`
  padding: 12px 20px;
  width: inherit;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

function AuthHeader() {
  return (
    <Container>
      <Link to={routes.home}>
        <Logo />
      </Link>
      <Right>
        <DarkMode />
      </Right>
    </Container>
  );
}

export default AuthHeader;
