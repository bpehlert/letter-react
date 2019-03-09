import React, { Component } from "react";
import InputStyled from "../styled/InputStyled";
import Button from "../styled/Button";
import PError from "../styled/PError";

class AuthEmailForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    emailValid: false,
    password: "",
    passwordConf: "",
    passwordsMatch: false
  };

  onInputChange = e => {
    const field = e.target.id;
    this.setState({ [field]: e.target.value });

    // Check and validate valid email address
    if (field === "email") {
      const validEmail = this.validateEmail(e.target.value);
      this.setState({ emailValid: validEmail });
    }

    //Check if confirmed password is the same as password.
    if (field === "passwordConf") {
      const passwordsMatch = this.checkPasswords(
        this.state.password,
        e.target.value
      );
      this.setState({ passwordsMatch: passwordsMatch });
      console.log(this.state.passwordsMatch);
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
    console.log(this.state);
  };

  render() {
    const { action } = this.props;
    const itDepends = action === "Sign up" ? true : false;

    const inputs = [
      {
        id: "firstName",
        type: "text",
        text: "First name",
        show: itDepends,
        message: "Please enter your first name."
      },
      {
        id: "lastName",
        type: "text",
        text: "Last name",
        show: itDepends,
        message: "Please enter your last name."
      },
      {
        id: "email",
        type: "email",
        text: "Email address",
        show: true,
        message: "Please enter a valid email."
      },
      {
        id: "password",
        type: "password",
        text: "Password",
        show: true,
        message: ""
      },
      {
        id: "passwordConf",
        type: "password",
        text: "Confirm password",
        show: itDepends,
        message: "●"
      }
    ];

    const inputArray = inputs.map(input => (
      <div className="inputDiv" show={input.show}>
        <InputStyled
          key={input.id}
          id={input.id}
          type={input.type}
          placeholder={input.text}
          onChange={this.onInputChange}
        />
        <PError className="error" show={input.show}>
          ●
        </PError>
      </div>
    ));

    return (
      <div className="emailInputs">
        {inputArray}
        <Button onClick={this.sendAuth} primary>
          {action}
        </Button>
      </div>
    );
  }
}

export default AuthEmailForm;
