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

  .saved {
    opacity: 0;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    border-radius: 3px;

    &-visible {
      opacity: 0.7;
    }

    p {
      margin: 0;
      padding: 10px 0px;
      font-family: sans-serif;
      font-size: 0.8em;
    }
  }
`;

export default EntryContainer;
