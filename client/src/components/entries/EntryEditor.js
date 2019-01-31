import React from "react";
import DatePicker from "react-datepicker";
import { Editor, EditorState, RichUtils } from "draft-js";

class EntryEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty(), date: new Date() };
    this.onChange = editorState => this.setState({ editorState });
  }

  handleChange = date => {
    this.setState({
      date: date
    });
  };

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  }

  render() {
    return (
      <div>
        <DatePicker
          selected={this.state.date}
          onChange={this.handleChange}
          className="date"
        />

        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand.bind(this)}
          placeholder="Start writing here . . ."
        />
      </div>
    );
  }
}

export default EntryEditor;
