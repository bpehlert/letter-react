import styled from "styled-components";

const Nav = styled.nav`
  margin: 0 15%;
  display: flex;
  align-items: center;
  justify-content: space-between;

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
