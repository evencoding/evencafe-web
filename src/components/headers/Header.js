import { Link } from "react-router-dom";
import styled from "styled-components";
import DarkMode from "./DarkMode";
import Logo from "./Logo";
import routes from "../../routes";

const Container = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  color: ${(props) => props.theme.fontColor};
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const Category = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-right: 20px;
`;

const Profile = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-right: 20px;
`;

function Header() {
  return (
    <Container>
      <Link to={routes.home}>
        <Logo />
      </Link>
      <Right>
        <Category>
          <Link to={routes.category}>
            <span>Category</span>
          </Link>
        </Category>
        <Profile>
          <Link to={routes.profile}>
            <span>Profile</span>
          </Link>
        </Profile>
        <DarkMode />
      </Right>
    </Container>
  );
}

export default Header;
