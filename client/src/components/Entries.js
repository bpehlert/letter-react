import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import axios from "axios";

class Entries extends Component {
  componentDidMount() {
    this.props.fetchEntries();
  }

  render() {
    return (
      <div>
        <p>Entries to print here.</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { entries: state.entries };
}

export default connect(
  mapStateToProps,
  actions
)(Entries);
