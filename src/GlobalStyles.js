import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  bgColor: "white",
  bgReverse: "black",
  fontColor: "#B55E28",
  reverse: "#FED543",
  accent: "#B55E28",
  borderColor: "rgba(219, 219, 219, 0.7)",
};

export const darkTheme = {
  bgColor: "black",
  bgReverse: "white",
  fontColor: "#FED543",
  reverse: "#B55E28",
  accent: "#FED543",
  borderColor: "rgba(219, 219, 219, 0.7)",
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
