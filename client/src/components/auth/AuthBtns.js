import React, { Component } from "react";
import ButtonAuth from "../styled/ButtonAuth";

class AuthBtns extends Component {
  state = {
    showEmailForm: true
  };

  showEmailSignUp = () => {
    const show = !this.state.showEmailForm;
    this.setState({ showEmailForm: show });
  };

  render() {
    const { action, showForm } = this.props;
    return (
      <div>
        <ButtonAuth as="a" href="/auth/google">
          <img
            src={require("../../assets/g-logo.png")}
            width="20px"
            height="20px"
            alt="g-logo"
          />
          {action} with Google
        </ButtonAuth>

        <ButtonAuth as="a" onClick={showForm}>
          <img
            src={require("../../assets/email-logo.png")}
            width="20px"
            height="20px"
            alt="@-logo"
          />
          {action} with email
        </ButtonAuth>
      </div>
    );
  }
}

export default AuthBtns;
