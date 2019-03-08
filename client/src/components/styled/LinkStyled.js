import styled from "styled-components";
import { Link } from "react-router-dom";

const LinkStlyed = styled(Link)`
  text-decoration: none;
  color: #59abe3;

  &:hover {
    color: #22a7f0;
  }
`;

export default LinkStlyed;
