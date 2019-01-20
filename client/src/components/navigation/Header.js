import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Nav from "../styled/Nav";
import LoggedIn from "./LoggedIn";
import Landing from "./Landing";
import LogoLink from "../styled/LogoLink";
import LogoImg from "./LogoImg";

class Header extends Component {
  // Checks the auth state of the app to determine if user is logged in.
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <Landing />;
      default:
        return <LoggedIn />;
    }
  }

  render() {
    return (
      <Nav>
        <LogoLink to={this.props.auth ? "/entries" : "/"}>
          <LogoImg src={require("../../assets/index_logo.png")} />
        </LogoLink>
        <ul>{this.renderContent()}</ul>
      </Nav>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);
