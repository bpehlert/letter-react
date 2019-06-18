import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import axios from "axios";

class Entries extends Component {
  componentDidMount() {
    this.props.fetchEntries();
  }

  render() {
    console.log(this.props.entries);

    return (
      <div>
        <p>Entries to print here.</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { entries: state.entries, auth: state.auth };
}

export default connect(
  mapStateToProps,
  actions
)(Entries);
