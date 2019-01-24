import styled from "styled-components";
import { Link } from "react-router-dom";

const ButtonLink = styled(Link)`
  background: ${props => (props.primary ? "#22A7F0" : "white")};
  color: ${props => (props.primary ? "white" : "#22A7F0")};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #22a7f0;
  border-radius: 5px;
  text-decoration: none;
`;

export default ButtonLink;
