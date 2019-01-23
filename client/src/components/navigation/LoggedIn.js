import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Nav from "../styled/Nav";
import LogoImg from "../styled/LogoImg";
import Button from "../styled/Button";
import ProfileImg from "../styled/ProfileImg";

class LoggedIn extends Component {
  render() {
    return (
      <Nav>
        <Link to={"/"}>
          <LogoImg src={require("../../assets/block_small_logo.png")} />
        </Link>
        <ProfileImg src={this.props.auth.photoURL} />
        <ul>
          <li>
            <Button as="a" href="/api/logout">
              Logout
            </Button>
          </li>
        </ul>
      </Nav>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(LoggedIn);
