import React, { Component } from "react";
import InputStyled from "../styled/InputStyled";
import Button from "../styled/Button";
import PError from "../styled/PError";
import PStyled from "../styled/PStyled";
import LinkStyled from "../styled/LinkStyled";
import axios from "axios";

class AuthEmailForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    emailValid: false,
    password: "",
    passwordConf: "",
    passwordsMatch: false,
    passwordsMatchIndicator: ""
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
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEx.test(email);
  };

  checkPasswords = (password, passwordConf) => {
    const match = password === passwordConf && password !== "" ? true : false;
    return match;
  };

  sendAuth = () => {
    // Check if form entries are valid.
    const { firstName, lastName, email, password } = this.state;
    const newUser = {
      name: {
        firstName: firstName,
        lastName: lastName
      },
      email: email,
      password: password
    };
    this.saveUserToDB("post", "/api/email_auth", newUser);
  };

  async saveUserToDB(type, route, payLoad) {
    const res = await axios[type](route, payLoad);
    console.log(res);
  }

  render() {
    const { action } = this.props;
    const isSignUp = action === "Sign up" ? true : false;
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
        message: this.state.passwordsMatchIndicator
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
        <PError
          className="error"
          show={input.show}
          green={this.state.passwordsMatch}
        >
          {input.message}
        </PError>
      </div>
    ));

    return (
      <div className="emailInputs">
        {inputFieldsArray}
        <Button onClick={this.sendAuth} primary>
          {action}
        </Button>
        {terms}
      </div>
    );
  }
}

export default AuthEmailForm;
