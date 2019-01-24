import styled from "styled-components";

const DropDown = styled.div`
  border-radius: 4px;
  width: 150px;
  margin: 10px auto;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  position: absolute;
  display: flex;
  align-items: flex-end;
  flex-direction: column;

  .link {
    text-decoration: none;
    color: #5c5d60;
    font-size: 0.9em;
    margin: 5px;
  }

  .link:hover {
    color: black;
  }
`;

export default DropDown;
