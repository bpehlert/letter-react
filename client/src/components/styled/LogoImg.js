import styled from "styled-components";

const LogoImg = styled.img`
  width: ${props => (props.large ? "50%" : "28%")};
`;

export default LogoImg;
