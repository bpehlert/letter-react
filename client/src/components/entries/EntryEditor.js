import React from "react";
import DatePicker from "react-datepicker";
import SaveMessage from "./SaveMessage";
import { Editor, EditorState, RichUtils } from "draft-js";
import { connect } from "react-redux";
import * as actions from "../../actions";

class EntryEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      date: new Date(),
      timeout: null,
      showSaved: false,
      savedMessage: "Saved"
    };
  }

  onChange = editorState => {
    // Call for Draft.js to udpate the state
    this.setState({ editorState });

    // Adds the local state of the text editor to the redux store
    this.props.updateEntry(editorState);

    this.setState({
      timeout: this.resetTimeout(
        this.state.timeout,
        setTimeout(this.saveValue, 900)
      )
    });
  };

  resetTimeout = (id, newID) => {
    clearTimeout(id);
    return newID;
  };

  saveValue = () => {
    this.setState({ ...this.state, showSaved: true });

    // Function to persist entry to database.
    console.log(this.state.editorState.getCurrentContent());

    setTimeout(() => this.setState({ ...this.state, showSaved: false }), 1000);
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
    const { showSaved, date, editorState } = this.state;
    return (
      <div>
        <SaveMessage className={"saved" + (showSaved ? " saved-visible" : "")}>
          <p>{this.state.savedMessage}</p>
        </SaveMessage>

        <DatePicker
          selected={date}
          onChange={date => this.setState({ date: date })}
          className="date"
        />

        <Editor
          editorState={editorState}
          onChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand.bind(this)}
          placeholder="Start writing here . . ."
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(
  mapStateToProps,
  actions
)(EntryEditor);
