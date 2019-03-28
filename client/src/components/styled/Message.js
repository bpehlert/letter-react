import styled from "styled-components";

const Message = styled.div`
  display: ${props => (props.show ? "" : "none")};
  background-color: ${props => (props.isErr ? "#f9dede" : "#e7f4e4")};
  text-align: center;
  margin: 10px;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 0.8em;

  animation: fadeIn ease 1s;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  animation-name: fadeOut ease 0.9s;

  @keyframes fadeOut {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export default Message;
