import styled from "styled-components";

const ProfileImg = styled.img`
  content: url(${props => props.src.replace("sz=50", "sz=42")});
  border-radius: 50%;
`;

export default ProfileImg;
