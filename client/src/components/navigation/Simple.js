import React from "react";
import { Link } from "react-router-dom";
import Nav from "../styled/Nav";
import LogoImg from "../styled/LogoImg";
import XButton from "../styled/XButton";

const Simple = () => {
  return (
    <Nav>
      <Link to={"/"}>
        <LogoImg src={require("../../assets/block_small_logo.png")} />
      </Link>
      <Link to={"/"}>
        <XButton src={require("../../assets/x-btn.png")} />
      </Link>
    </Nav>
  );
};

export default Simple;
