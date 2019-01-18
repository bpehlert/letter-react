// EntryFormReview shows users their entry.
import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";

const EntryFormReview = ({ onEntryEdit, formValues, saveEntry, history }) => {
  const reviewFields = formFields.map(({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entry</h5>
      {reviewFields}
      <button className="yellow darken-3 btn-flat" onClick={onEntryEdit}>
        Edit
      </button>
      <button
        onClick={() => saveEntry(formValues, history)}
        className="green white-text btn-flat right"
      >
        Save
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.entryForm.values };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(EntryFormReview));
