import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  dark: "#B55E28",
  light: "#FED543",
  categoryBg: "#B55E28",
  categoryColor: "#FED543",
  bgColor: "white",
  headerBg: "#B55E28",
  bgReverse: "black",
  fontColor: "#B55E28",
  reverse: "#FED543",
  accent: "#B55E28",
  borderColor: "white",
  maxW: "930px",
  // homeImgTop: "rgba(0, 0, 0, 0.2) 85%",
  // homeImgbutton: "rgba(255, 255, 255, 1)",
};

export const darkTheme = {
  dark: "#B55E28",
  light: "#FED543",
  categoryBg: "#FED543",
  categoryColor: "#B55E28",
  bgColor: "#1A1819",
  headerBg: "black",
  bgReverse: "white",
  fontColor: "#FED543",
  reverse: "#B55E28",
  accent: "#FED543",
  borderColor: "white",
  maxW: "930px",
  // homeImgTop: "rgba(0, 0, 0, 0.2) 80%",
  // homeImgbutton: "rgba(0, 0, 0, 1)",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    input {
      all:unset;
    }
    * {
      box-sizing:border-box;
    }
    body {
        background-color: ${(props) => props.theme.bgColor};
        font-size:14px;
        color: ${(props) => props.theme.fontColor};
        font-family: 'Open Sans', sans-serif;
        -ms-overflow-style:none;
      }
      body::-webkit-scrollbar { display:none; }
    a {
      text-decoration: none;
      color:inherit;
    }
`;
