import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import InputStyled from "../styled/InputStyled";
import Button from "../styled/Button";
import PError from "../styled/PError";
import PStyled from "../styled/PStyled";
import LinkStyled from "../styled/LinkStyled";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../actions";

class AuthEmailForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    emailValid: false,
    password: "",
    passwordConf: "",
    passwordsMatch: false,
    redirect: false
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
    const { firstName, lastName, email, password } = this.state;
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
      if (err.response.status === 409) console.log("User already exists.");
      if (err.response.status === 422)
        console.log("The Server failed to create an account.");
    }
  }

  async authUser(type, route, payLoad) {
    try {
      await axios[type](route, payLoad);
      await this.props.fetchUser();
      if (this.props.auth) this.setState({ redirect: true });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { action } = this.props;
    const { redirect } = this.state;
    const isSignUp = action === "Sign up" ? true : false;

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
        message: "●"
      }
    ];

    if (redirect) return <Redirect to="/" />;

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

    return (
      <div className="emailInputs">
        {inputFieldsArray}
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

export default connect(
  mapStateToProps,
  actions
)(AuthEmailForm);
