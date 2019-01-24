import styled from "styled-components";

const ProfileImg = styled.img`
  content: url(${props => props.src.replace("sz=50", "sz=42")});
  border-radius: 50%;
  margin: 0 10px;
`;

export default ProfileImg;
