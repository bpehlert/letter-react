import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import InputStyled from "../styled/InputStyled";
import Button from "../styled/Button";
import PStyled from "../styled/PStyled";
import Message from "../styled/Message";
import LinkStyled from "../styled/LinkStyled";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../actions";

const SIGN_UP = "Sign up";
const LOG_IN = "Log in";

class AuthEmailForm extends Component {
  state = {
    path: this.props.location.pathname,
    firstName: "",
    lastName: "",
    email: "",
    emailValid: false,
    password: "",
    passwordConf: "",
    passwordValid: false,
    passwordsMatch: false,
    showMessage: false,
    errorMessage: "",
    isErr: "",
    redirect: false,
    redirectRoute: ""
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  onInputChange = e => {
    const field = e.target.id;
    const entry = e.target.value;
    this.setState({ [field]: entry });

    switch (field) {
      case "email":
        const validEmail = this.validateEmail(entry);
        this.setState({ emailValid: validEmail });
        break;
      case "password":
        const validPassword = this.validatePassword(entry);
        this.setState({ passwordValid: validPassword });
        break;
      case "passwordConf":
        const passwordsMatch = this.checkPasswords(this.state.password, entry);
        this.setState({ passwordsMatch: passwordsMatch });
        break;
      default:
        return;
    }
  };

  validateEmail = email => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  validatePassword = password => {
    return /^(?=.{8,})/.test(password);
  };

  checkPasswords = (password, passwordConf) => {
    const match = password === passwordConf && password !== "" ? true : false;
    return match;
  };

  onClick = () => {
    const { action } = this.props;
    const {
      firstName,
      lastName,
      email,
      password,
      emailValid,
      passwordValid,
      passwordsMatch
    } = this.state;

    // Check for valid form submission
    if (action === SIGN_UP && (!firstName || !lastName)) {
      return this.showMessage("Please enter your first and last name.", true);
    }
    if (!emailValid) {
      return this.showMessage("Please enter a valid email address.", true);
    }
    if (!passwordValid) {
      return this.showMessage(
        "Your password must contain at leaset 8 characters.",
        true
      );
    }
    if (action === SIGN_UP && !passwordsMatch) {
      return this.showMessage("Your passwords do not match.", true);
    }
    if (action === LOG_IN && !password) {
      return this.showMessage("Please enter your password.", true);
    }

    switch (action) {
      case SIGN_UP:
        const newUser = {
          name: {
            firstName: firstName,
            lastName: lastName
          },
          email: email,
          password: password
        };
        this.saveUserToDB("post", "/api/email_sign_up", newUser);
        break;
      case LOG_IN:
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
        this.showMessage(
          "It looks like you already have an account with us.",
          false
        );
      }
      // Failure to create an account
      if (err.response.status === 422)
        this.showMessage("The Server failed to create an account.", true);
    }
  }

  async authUser(type, route, payLoad) {
    try {
      await axios[type](route, payLoad);
      await this.props.fetchUser();
      if (this.props.auth) this.changeRoute("/");
    } catch (err) {
      console.log(err);
      this.showMessage("Incorrect username or password.", true);
    }
  }

  showMessage(message, isErr) {
    this.setState({
      showMessage: true,
      errorMessage: message,
      isErr
    });
    this.timer = setTimeout(() => {
      this.setState({ showMessage: false });
      if (!isErr) this.changeRoute("/log-in");
    }, 2200);
  }

  changeRoute(route) {
    this.setState({ redirect: true, redirectRoute: route });
  }

  render() {
    const { action } = this.props;
    const isSignUp = action === SIGN_UP ? true : false;
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
        show: isSignUp
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
        <Button onClick={this.onClick} primary>
          {action}
        </Button>
        <Message show={this.state.showMessage} isErr={this.state.isErr}>
          {this.state.errorMessage}
        </Message>
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
