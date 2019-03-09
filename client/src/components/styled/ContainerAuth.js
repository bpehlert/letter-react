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
      display: ${props => (props.show ? "" : "none")};
    }

    .error {
      margin-left: 3px;
      color: ${props => (props.red ? "#d8000c" : "#4BB543")};
    }

    button {
      width: 100px;
    }
  }
`;

export default Container;
