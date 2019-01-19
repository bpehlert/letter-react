import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "./styled/Button";
import Logo from "./styled/Logo";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <Button as="a" href="/auth/google" primary>
              Login with Google
            </Button>
          </li>
        );
      default:
        return (
          <li>
            <Button as="a" href="/api/logout">
              Logout
            </Button>
          </li>
        );
    }
  }

  render() {
    return (
      <nav>
        <div>
          <Logo to={this.props.auth ? "/entries" : "/"}>Letter</Logo>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);
