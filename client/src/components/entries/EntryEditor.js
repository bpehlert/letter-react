import React from "react";
import DatePicker from "react-datepicker";
import SaveMessage from "./SaveMessage";
import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";
import { connect } from "react-redux";
import * as actions from "../../actions";
import axios from "axios";

class EntryEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      date: new Date(),
      timeout: null,
      showSavedMessage: false,
      saveMessage: "Saved",
      newEntry: true
    };
  }

  componentWillUnmount() {
    // Clears all timeouts to avoid error on unmounting components.
    clearTimeout(this.timer);
    clearTimeout(this.state.timeout);
    clearTimeout(this.showTimer);
  }

  // REFACTOR CODE TO KEEP STATE.SAVEDMESSAGE AS "SAVING..." WHILE POST REQUEST IS PENDING

  onChange = editorState => {
    this.setState({ editorState }); // Call for Draft.js to udpate the state
    this.props.updateEntry(editorState); // Adds the local state of the text editor to the redux store
    this.setState({
      timeout: this.resetTimeout(
        this.state.timeout,
        setTimeout(this.saveEntry, 900)
      )
    });
  };

  resetTimeout = (id, newID) => {
    clearTimeout(id);
    return newID;
  };

  saveEntry = () => {
    this.setState({ showSavedMessage: true, saveMessage: "Saving..." });

    const payLoad = {
      date: this.state.date,
      body: convertToRaw(this.state.editorState.getCurrentContent()),
      entryNumber: 1
    };

    if (this.state.newEntry) {
      this.postToDB("/api/entries", payLoad);
      return;
    }
    this.putToDB("/api/entries", payLoad);
  };

  async postToDB(route, payLoad) {
    const res = await axios.post(route, payLoad);
    console.log(res);

    this.timer = setTimeout(() => {
      this.setState({ saveMessage: "Saved" });
      this.showTimer = setTimeout(
        () => this.setState({ showSavedMessage: false }),
        1000
      );
    }, 500);
  }

  async putToDB(route, payLoad) {}

  // Boilerplate Function for Draft.js to allow for keyboard shortcuts for styling text
  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  }

  render() {
    const { showSavedMessage, date, editorState } = this.state;
    return (
      <div>
        <SaveMessage
          className={"saved" + (showSavedMessage ? " saved-visible" : "")}
        >
          <p>{this.state.saveMessage}</p>
        </SaveMessage>

        <DatePicker
          selected={date}
          onChange={date => this.setState({ date })}
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
