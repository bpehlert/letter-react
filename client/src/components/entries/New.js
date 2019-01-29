import React, { Component } from "react";
import DatePicker from "react-datepicker";
import EntryInput from "../styled/EntryInput";
import TextEditor from "./TextEditor";

import "react-datepicker/dist/react-datepicker.css";
import Button from "../styled/Button";

class New extends Component {
  state = {
    date: new Date(),
    body: ""
  };

  handleChange = date => {
    this.setState({
      date: date
    });
  };

  onTextChange = e => {
    const newBody = e.target.value;
    this.setState({
      body: newBody
    });
  };

  printEntry = e => {
    console.log({ date: this.state.date }, { body: this.state.body });
  };

  render() {
    return (
      <div>
        <DatePicker selected={this.state.date} onChange={this.handleChange} />
        <EntryInput onChange={this.onTextChange} />
        <TextEditor />
        <Button onClick={this.printEntry}>Print to console</Button>
      </div>
    );
  }
}

export default New;