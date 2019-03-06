import React from "react";
import { Link } from "react-router-dom";
import Nav from "../styled/Nav";
import LogoImg from "../styled/LogoImg";
import ButtonLink from "../styled/ButtonLink";
import Button from "../styled/Button";

const Landing = () => {
  return (
    <Nav>
      <Link to={"/"}>
        <LogoImg large src={require("../../assets/index_logo.png")} />
      </Link>
      <ul>
        <li>
          <ButtonLink to="/signup" primary="true">
            Get Started
          </ButtonLink>
        </li>
        <li>
          <Button as="a" href="/auth/google">
            Sign in
          </Button>
        </li>
      </ul>
    </Nav>
  );
};

export default Landing;
