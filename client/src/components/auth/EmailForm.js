import React, { Component } from "react";
import InputStyled from "../styled/InputStyled";
import Button from "../styled/Button";

class EmailForm extends Component {
  state = { firstName: "", lastName: "", email: "", password: "" };

  render() {
    const { action } = this.props;

    const depends = action === "Sign up" ? true : false;

    const inputs = [
      { type: "text", placeholder: "First name", show: depends },
      { type: "text", placeholder: "Last name", show: depends },
      { type: "email", placeholder: "Email address", show: true },
      { type: "password", placeholder: "Password", show: true },
      { type: "password", placeholder: "Confirm Password", show: depends }
    ];

    const inputArray = inputs.map(input => (
      <InputStyled
        key={inputs.indexOf(input)}
        type={input.type}
        placeholder={input.placeholder}
        show={input.show}
      />
    ));

    return (
      <div>
        {inputArray}
        <Button primary>{action}</Button>
      </div>
    );
  }
}

export default EmailForm;
