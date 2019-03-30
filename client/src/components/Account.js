import React, { Component } from "react";
import { connect } from "react-redux";

class Account extends Component {
  render() {
    return (
      <div>
        <p>Account Settings</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Account);
