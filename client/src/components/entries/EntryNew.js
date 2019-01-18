// EntryNew shows EntryForm and EntryReview
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import EntryForm from "./EntryForm";
import EntryFormReview from "./EntryFormReview";

class EntryNew extends Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <EntryFormReview
          onEntryEdit={() => this.setState({ showFormReview: false })}
        />
      );
    }
    return (
      <EntryForm
        onEntrySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default reduxForm({
  form: "entryForm"
})(EntryNew);
