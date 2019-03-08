import React from "react";
import PStyled from "../styled/PStyled";
import LinkStyled from "../styled/LinkStyled";

const AuthText = ({ altAction, altPath, title }) => {
  return title === "Sign up" ? (
    <div>
      <PStyled>
        By signing up, you agree to our{" "}
        <LinkStyled to="#">terms and conditions.</LinkStyled>
      </PStyled>
      <PStyled>
        Already have an account?{" "}
        <LinkStyled to={altPath}>{altAction} here.</LinkStyled>
      </PStyled>
    </div>
  ) : (
    <div>
      <PStyled>
        <LinkStyled to="#">Forgot your password?</LinkStyled>
      </PStyled>
      <PStyled>
        <LinkStyled to={altPath}>Create an account.</LinkStyled>
      </PStyled>
    </div>
  );
};

export default AuthText;
