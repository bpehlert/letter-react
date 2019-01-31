import React from "react";
import DatePicker from "react-datepicker";
import { Editor, EditorState, RichUtils } from "draft-js";
import { connect } from "react-redux";
import * as actions from "../../actions";

class EntryEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty(), date: new Date() };
  }

  onChange = editorState => {
    this.setState({ editorState });
    // Adds the local state of the text editor to the redux store
    this.props.updateEntry(editorState);
  };

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

  // Create autosave function that dispatches the local state of EntryEditor to the Redux store.
  autoSave() {}

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

function mapStateToProps(state) {
  console.log(state);
  return { auth: state.auth };
}

export default connect(
  mapStateToProps,
  actions
)(EntryEditor);
