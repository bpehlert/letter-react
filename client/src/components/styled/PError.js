import styled from "styled-components";

const PError = styled.p`
  font-family: sans-serif;
  font-size: 0.85em;
  position: absolute;
  float: right;
  display: ${props => (props.show ? "flex" : "none")};
  color: ${props => (props.green ? "#4BB543" : "#d8000c")};
`;

export default PError;
