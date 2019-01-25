import styled from "styled-components";

const ProfileImg = styled.img`
  content: url(${props => props.src.replace("sz=50", "sz=42")});
  cursor: pointer;
  border-radius: 50%;
  margin-left: 15px;
`;

export default ProfileImg;
