import styled from "styled-components";

const Message = styled.div`
  display: ${props => (props.show ? "" : "none")};
  background-color: #e7f4e4;
  text-align: center;
  margin: 10px;
  padding: 10px 40px;
  border-radius: 5px;
  -webkit-animation: fadein 2s;

  font-size: 0.8em;
`;

export default Message;
