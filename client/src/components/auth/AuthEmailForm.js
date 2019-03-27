import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import InputStyled from "../styled/InputStyled";
import Button from "../styled/Button";
import PError from "../styled/PError";
import PStyled from "../styled/PStyled";
import Message from "../styled/Message";
import LinkStyled from "../styled/LinkStyled";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../actions";

class AuthEmailForm extends Component {
  state = {
    path: this.props.location.pathname,
    firstName: "",
    lastName: "",
    email: "",
    emailValid: false,
    password: "",
    passwordConf: "",
    passwordsMatch: false,
    showMessage: false,
    errorMessage: "",
    redirect: false,
    redirectRoute: ""
  };

  onInputChange = e => {
    const field = e.target.id;
    const entry = e.target.value;
    this.setState({ [field]: entry });

    switch (field) {
      case "email":
        const validEmail = this.validateEmail(entry);
        this.setState({ emailValid: validEmail });
        break;
      case "passwordConf":
        const passwordsMatch = this.checkPasswords(this.state.password, entry);
        entry.length === this.state.password.length
          ? this.setState({ passwordsMatchIndicator: "●" })
          : this.setState({ passwordsMatchIndicator: "" });
        this.setState({ passwordsMatch: passwordsMatch });
        break;
      default:
        return;
    }
  };

  validateEmail = email => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  checkPasswords = (password, passwordConf) => {
    const match = password === passwordConf && password !== "" ? true : false;
    return match;
  };

  onClick = () => {
    const {
      firstName,
      lastName,
      email,
      password,
      emailValid,
      passwordsMatch
    } = this.state;

    if (!emailValid) {
      this.setState({
        showMessage: true,
        errorMessage: "Please enter a valid email address."
      });
      return;
    }
    if (!passwordsMatch) {
      this.setState({
        showMessage: true,
        errorMessage: "Your passwords do not match."
      });
      return;
    }

    const { action } = this.props;
    switch (action) {
      case "Sign up":
        const newUser = {
          name: {
            firstName: firstName,
            lastName: lastName
          },
          email: email,
          password: password
        };
        this.saveUserToDB("post", "/api/email_signup", newUser);
        break;
      case "Log in":
        const userCredentials = {
          email: email,
          password: password
        };
        this.authUser("post", "/api/local_auth", userCredentials);
        break;
      default:
        return;
    }
  };

  async saveUserToDB(type, route, payLoad) {
    // Add in middleware to confirm email address.

    try {
      const res = await axios[type](route, payLoad);
      const userToAuth = {
        email: res.data.email,
        password: payLoad.password
      };
      this.authUser("post", "/api/local_auth", userToAuth);
    } catch (err) {
      // User exists
      if (err.response.status === 409) {
        alert("It looks like you already have an account with us.");
        this.changeRoute("/log-in");
      }
      // Failure to create an account
      if (err.response.status === 422)
        alert("The Server failed to create an account.");
    }
  }

  async authUser(type, route, payLoad) {
    try {
      await axios[type](route, payLoad);
      await this.props.fetchUser();
      if (this.props.auth) this.changeRoute("/");
    } catch (err) {
      console.log(err);
    }
  }

  changeRoute(route) {
    this.setState({ redirect: true, redirectRoute: route });
  }

  render() {
    const { action } = this.props;
    const isSignUp = action === "Sign up" ? true : false;
    const { redirect, redirectRoute } = this.state;

    const inputFields = [
      {
        id: "firstName",
        type: "text",
        text: "First name",
        show: isSignUp
      },
      {
        id: "lastName",
        type: "text",
        text: "Last name",
        show: isSignUp
      },
      {
        id: "email",
        type: "email",
        text: "Email address",
        show: true
      },
      {
        id: "password",
        type: "password",
        text: "Password",
        show: true
      },
      {
        id: "passwordConf",
        type: "password",
        text: "Confirm password",
        show: isSignUp,
        message: ""
      }
    ];

    const inputFieldsArray = inputFields.map(input => (
      <div className="inputDiv" key={input.id}>
        <InputStyled
          id={input.id}
          type={input.type}
          placeholder={input.text}
          onChange={this.onInputChange}
          show={input.show}
        />
        <PError className="error" show={input.show}>
          {input.message}
        </PError>
      </div>
    ));

    const terms = isSignUp ? (
      <PStyled>
        By signing up, you agree to our{" "}
        <LinkStyled to="#">terms and conditions.</LinkStyled>
      </PStyled>
    ) : (
      <PStyled>
        <LinkStyled to="#">Forgot your password?</LinkStyled>
      </PStyled>
    );

    if (redirect) return <Redirect to={redirectRoute} />;

    return (
      <div className="emailInputs">
        {inputFieldsArray}
        <Message show={this.state.showMessage}>
          {this.state.errorMessage}
        </Message>
        <Button onClick={this.onClick} primary>
          {action}
        </Button>
        {terms}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(AuthEmailForm)
);
