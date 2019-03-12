import styled from "styled-components";

const Container = styled.div`
  margin: 50px 25%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .logo {
  }

  .authText {
    text-align: center;
  }

  .emailInputs {
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .inputDiv {
      position: relative;
      display: flex;
      flex-direction: row;
    }

    button {
      width: 100px;
    }
  }
`;

export default Container;
