import styled from "styled-components";

const EntryContainer = styled.div`
  width: 650px;
  margin: 60px auto;

  .date {
    margin-bottom: 20px;
    border: none;
    font-family: "Helvetica Neue", sans-serif;
    font-size: 1.8em;
    cursor: pointer;
  }

  .date:focus {
    outline-width: 0;
  }
`;

export default EntryContainer;
