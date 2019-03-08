import React, { Component } from "react";
import InputStyled from "../styled/InputStyled";
import Button from "../styled/Button";

class EmailForm extends Component {
  state = { firstName: "", lastName: "", email: "", password: "" };

  render() {
    const { action } = this.props;

    const itDepends = action === "Sign up" ? true : false;

    const inputs = [
      { type: "text", text: "First name", show: itDepends },
      { type: "text", text: "Last name", show: itDepends },
      { type: "email", text: "Email address", show: true },
      { type: "password", text: "Password", show: true },
      { type: "password", text: "Confirm Password", show: itDepends }
    ];

    const inputArray = inputs.map(input => (
      <InputStyled
        key={inputs.indexOf(input)}
        type={input.type}
        placeholder={input.text}
        show={input.show}
      />
    ));

    return (
      <div className="emailInputs">
        {inputArray}
        <Button primary>{action}</Button>
      </div>
    );
  }
}

export default EmailForm;
