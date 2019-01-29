import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import LoggedIn from "./LoggedIn";
import Landing from "./Landing";

class Header extends Component {
  // Checks the auth state of the app to determine if user is logged in.

  render() {
    const { location } = this.props;

    switch (this.props.auth) {
      case null:
        return <div />;
      case false:
        return <Landing />;
      default:
        return <LoggedIn location={location} />;
    }
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default withRouter(connect(mapStateToProps)(Header));
