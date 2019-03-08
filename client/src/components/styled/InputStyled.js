import styled from "styled-components";

const InputStyled = styled.input`
  margin-top: 10px;
  width: 200px;
  font-family: sans-serif;
  font-size: 1em;
  color: #555;
  padding: 0.25em 1em;
  line-height: 1.4;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);

  :focus {
    outline: none;
  }

  display: ${props => (props.show ? "" : "none")};
`;

export default InputStyled;
