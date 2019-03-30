import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

import AuthBtns from "./AuthBtns";
import AuthText from "./AuthText";
import ContainerAuth from "../styled/ContainerAuth";
import AuthEmailForm from "./AuthEmailForm";

class Auth extends Component {
  state = {
    title: "Sign up",
    altAction: "Log in",
    altPath: "/log-in",
    showEmailForm: false,
    redirect: false
  };

  componentWillMount() {
    if (this.props.auth) return this.setState({ redirect: true });
    const { pathname } = this.props.location;
    switch (pathname) {
      case "/sign-in":
        return this.setState({
          title: "Sign up",
          altAction: "Log in",
          altPath: "/log-in"
        });
      case "/log-in":
        return this.setState({
          title: "Log in",
          altAction: "Sign up",
          altPath: "/sign-up"
        });
      default:
        return "";
    }
  }

  showEmailSignUp = () => {
    const show = !this.state.showEmailForm;
    this.setState({ showEmailForm: show });
  };

  render() {
    const { title, altAction, altPath, redirect } = this.state;

    if (redirect) return <Redirect to={"/"} />;

    return (
      <div>
        <ContainerAuth>
          <img
            className="logo"
            src={require("../../assets/index_logo.png")}
            width="150px"
            alt="Letter"
          />
          <h1>{title}</h1>
          <div className="btns">
            <AuthBtns action={title} showForm={this.showEmailSignUp} />
          </div>

          {this.state.showEmailForm ? <AuthEmailForm action={title} /> : ""}

          <div className="authText">
            <AuthText altPath={altPath} altAction={altAction} title={title} />
          </div>
        </ContainerAuth>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default withRouter(connect(mapStateToProps)(Auth));
