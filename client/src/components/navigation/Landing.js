import React from "react";
import { Link } from "react-router-dom";
import Nav from "../styled/Nav";
import LogoImg from "../styled/LogoImg";
import ButtonLink from "../styled/ButtonLink";
import Button from "../styled/Button";
import Simple from "./Simple";

const Landing = ({ location }) => {
  switch (location.pathname) {
    case "/":
      return (
        <Nav>
          <Link to={"/"}>
            <LogoImg large src={require("../../assets/index_logo.png")} />
          </Link>
          <ul>
            <li>
              <ButtonLink to="/sign-up" primary="true">
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
    default:
      return <Simple />;
  }
};

export default Landing;
