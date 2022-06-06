import { Link } from "react-router-dom";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import styled from "styled-components";
import DarkMode from "./DarkMode";
import Logo from "./Logo";
import routes from "../../routes";
import { useEffect } from "react";
import { useReactiveVar } from "@apollo/client";
import { darkModeVar, isLoggedInVar, logUserOut } from "../../apollo";

const Container = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  padding: 12px 0;
  max-width: ${(props) => props.theme.maxW};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${(props) => props.theme.light};
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const RightMenu = styled.div`
  font-size: 15px;
  font-weight: 900;
  margin-right: 25px;
  cursor: pointer;
`;

function Header() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const isDark = useReactiveVar(darkModeVar);
  const navVariants = {
    top: {
      backgroundColor: "rgba(0,0,0,0)",
    },
    scroll: {
      backgroundColor: isDark ? "rgba(1, 1, 1, 1)" : "#B55E28",
    },
  };
  const navAnimation = useAnimation();
  const { scrollY } = useViewportScroll();
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 20) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY, navAnimation]);
  return (
    <Container
      variants={navVariants}
      animate={navAnimation}
      transition={{ duration: 0.05 }}
    >
      <Wrapper>
        <Link to={routes.home}>
          <Logo />
        </Link>
        <Right>
          <RightMenu>
            <Link to={routes.RightMenu}>
              <span>Category</span>
            </Link>
          </RightMenu>
          <RightMenu>
            {isLoggedIn ? (
              <Link to={routes.profile}>
                <span>Profile</span>
              </Link>
            ) : (
              <Link to={routes.login}>
                <span>Login</span>
              </Link>
            )}
          </RightMenu>
          {isLoggedIn ? (
            <RightMenu onClick={logUserOut}>
              <span>Logout</span>
            </RightMenu>
          ) : null}
          <DarkMode />
        </Right>
      </Wrapper>
    </Container>
  );
}

export default Header;
