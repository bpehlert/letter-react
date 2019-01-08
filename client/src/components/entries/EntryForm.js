import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";

class EntryForm extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          <Field type="text" name="entryDate" component="input" />
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: "entryForm"
})(EntryForm);
