import React from "react";
import { Link } from "react-router-dom";
import Nav from "../styled/Nav";
import LogoImg from "../styled/LogoImg";
import ButtonLink from "../styled/ButtonLink";
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
              <ButtonLink to="/log-in">Log in</ButtonLink>
            </li>
          </ul>
        </Nav>
      );
    default:
      return <Simple />;
  }
};

export default Landing;
