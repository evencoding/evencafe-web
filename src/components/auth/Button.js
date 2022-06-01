import styled from "styled-components";

const Button = styled.input`
  color: ${(props) => props.theme.bgColor};
  font-weight: 600;
  border: none;
  margin-top: 12px;
  background-color: ${(props) => props.theme.accent};
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  width: 100%;
  opacity: ${(props) => (props.disabled ? "0.3" : "1")};
`;

export default Button;
