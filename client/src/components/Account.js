import React, { Component } from "react";
import { connect } from "react-redux";

class Account extends Component {
  state = { props: this.props };

  render() {
    const { name, email, entries } = this.props.auth || "";
    const firstName = this.props.auth ? name.firstName : "";
    const lastName = this.props.auth ? name.lastName : "";
    return (
      <div>
        <h1>Account Settings</h1>
        <h3>Name</h3>
        <p>{firstName}</p>
        <p>{lastName}</p>
        <h3>Account</h3>
        <p>{email}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Account);
