import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-around;

  .nav-bar-options {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  ul {
    list-style-type: none;
    display: flex;
    align-items: center;
  }
`;

export default Nav;
