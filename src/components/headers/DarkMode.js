import { useReactiveVar } from "@apollo/client";
import { useState } from "react";
import styled from "styled-components";
import { darkModeVar, disableDarkMode, enableDarkMode } from "../../apollo";

const Wrapper = styled.div`
  cursor: pointer;
  position: relative;
  touch-action: pan-x;
  user-select: none;
`;

const DarkModeBtn = styled.div`
  background-color: #4d4d4d;
  border-radius: 30px;
  height: 24px;
  transition: 0.2s;
  width: 50px;
  display: flex;
  align-items: center;
  position: relative;
`;

const Moon = styled.div`
  position: relative;
  left: 5px;
  height: 10px;
  span {
    align-items: center;
    display: flex;
    height: 12px;
    justify-content: center;
    width: 10px;
  }
`;

const Sun = styled.div`
  position: absolute;
  right: 8px;
  height: 8px;
  span {
    align-items: center;
    display: flex;
    height: 10px;
    justify-content: center;
    width: 10px;
  }
`;

const SwitchBtn = styled.div`
  background-color: #fafafa;
  border: 1px solid #4d4d4d;
  border-radius: 50%;
  height: 22px;
  left: ${(props) => (props.isDark ? "1px" : "27px")};
  position: absolute;
  top: 1px;
  transition: 0.25s;
  width: 22px;
  ${(props) => (props.isHover ? "box-shadow: 0 0 2px 3px #3578e5" : null)}
`;

function DarkMode() {
  const isDark = useReactiveVar(darkModeVar);
  const [isHover, setIsHover] = useState(false);
  const mouseHover = () => {
    setIsHover((current) => !current);
  };
  return (
    <Wrapper
      onClick={isDark ? disableDarkMode : enableDarkMode}
      onMouseEnter={mouseHover}
      onMouseLeave={mouseHover}
    >
      <DarkModeBtn role="button" tabIndex={-1}>
        <Moon>
          <span>🌜</span>
        </Moon>
        <Sun>
          <span>🌞</span>
        </Sun>
        <SwitchBtn isDark={isDark} isHover={isHover} />
      </DarkModeBtn>
    </Wrapper>
  );
}

export default DarkMode;
