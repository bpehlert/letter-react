import React from "react";
import PStyled from "../styled/PStyled";
import LinkStyled from "../styled/LinkStyled";

const AuthText = ({ altAction, altPath, title }) => {
  return title === "Sign up" ? (
    <div>
      <PStyled>
        Already have an account?{" "}
        <LinkStyled to={altPath}>{altAction} here.</LinkStyled>
      </PStyled>
    </div>
  ) : (
    <div>
      <PStyled>
        New to Letter?{" "}
        <LinkStyled to={altPath}>Create an account here.</LinkStyled>
      </PStyled>
    </div>
  );
};

export default AuthText;
