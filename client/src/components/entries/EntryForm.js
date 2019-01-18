import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import EntryField from "./EntryField";
import { Link } from "react-router-dom";
import formFields from "./formFields";

class EntryForm extends Component {
  renderFields() {
    return formFields.map(({ label, name }) => {
      return (
        <Field
          key={name}
          component={EntryField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onEntrySubmit)}>
          {this.renderFields()}
          <Link to="/entries" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  formFields.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a ${name}.`;
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: "entryForm",
  destroyOnUnmount: false
})(EntryForm);
