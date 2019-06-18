import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import Entry from "./entries/Entry";

class Entries extends Component {
  componentDidMount() {
    this.props.fetchEntries();
  }

  mapEntries = entries => {
    console.log(entries);
    entries.map((entry, i) => {
      console.log(entry.date);
      return <Entry date={entry.date} />;
    });
  };

  render() {
    const { entries } = this.props;
    return entries.map((entry, i) => {
      return (
        <Entry key={i} date={entry.date} body={entry.body.blocks[0].text} />
      );
    });
  }
}

function mapStateToProps(state) {
  return { entries: state.entries };
}

export default connect(
  mapStateToProps,
  actions
)(Entries);
