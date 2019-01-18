// EntryFormReview shows users their entry.
import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";

const EntryFormReview = ({ onEntryEdit, formValues }) => {
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
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.entryForm.values };
}

export default connect(mapStateToProps)(EntryFormReview);
