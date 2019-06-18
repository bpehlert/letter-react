import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import ContainerAccount from "./styled/ContainerAccount";

class Account extends Component {
  componentDidMount() {
    // Add in method to fetch just number of entries.
    this.props.fetchUser();
  }

  render() {
    const { name, email, entries } = this.props.auth || "";
    const firstName = this.props.auth ? name.firstName : "";
    const lastName = this.props.auth ? name.lastName : "";

    return (
      <ContainerAccount>
        <h1>Account Settings</h1>
        <h3>Name</h3>
        <p>{firstName}</p>
        <p>{lastName}</p>
        <h3>Number of Entries</h3>
        <p>{entries}</p>
        <h3>Account</h3>
        <p>{email}</p>
      </ContainerAccount>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(
  mapStateToProps,
  actions
)(Account);
