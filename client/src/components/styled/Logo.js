import styled from "styled-components";
import { Link } from "react-router-dom";

const Logo = styled(Link)`
  font-weight: bold;
  text-decoration: none;
  font-size: 2em;
  a:visited {
    color: black;
  }
`;

export default Logo;
