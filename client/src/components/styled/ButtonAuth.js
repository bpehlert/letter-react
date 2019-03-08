import styled from "styled-components";

const ButtonAuth = styled.button`
  background: white;
  color: black;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 1px solid #22a7f0;
  border-radius: 5px;
  text-decoration: none;
  width: 200px;
  display: flex;
  cursor: pointer;

  &:hover {
    color: #22a7f0;
  }

  img {
    padding-right: 7px;
  }
`;

export default ButtonAuth;
