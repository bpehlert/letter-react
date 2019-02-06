import React from "react";
import SaveMessage from "./SaveMessage";
import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";
// import { stateToHTML } from "draft-js-export-html"; //https://www.npmjs.com/package/draft-js-export-html
import { connect } from "react-redux";
import JournalDate from "./JournalDate";
import axios from "axios";

import "draft-js/dist/Draft.css";

class EntryEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      date: new Date(),
      timeout: null,
      showSavedMessage: false,
      saveMessage: "Saved",
      id: ""
    };
  }

  componentDidMount() {
    this.refs.start.focus();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    clearTimeout(this.state.timeout);
    clearTimeout(this.showTimer);
  }

  onChange = editorState => {
    this.setState({ editorState });
    if (
      editorState.getCurrentContent() ===
      this.state.editorState.getCurrentContent()
    )
      return;
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

  handleDateChange = date => {
    this.setState({ date });
  };

  saveEntry = () => {
    this.setState({ showSavedMessage: true, saveMessage: "Saving..." });

    const payLoad = {
      id: this.state.id,
      date: this.state.date,
      body: convertToRaw(this.state.editorState.getCurrentContent())
    };

    if (!this.state.id) {
      this.saveToDB("post", "/api/entries", payLoad);
      return;
    }
    this.saveToDB("put", "/api/entries", payLoad);
  };

  async saveToDB(type, route, payLoad) {
    const res = await axios[type](route, payLoad);
    this.setState({ id: res.data._id });

    this.timer = setTimeout(() => {
      this.setState({ saveMessage: "Saved" });
      this.showTimer = setTimeout(
        () => this.setState({ showSavedMessage: false }),
        1000
      );
    }, 500);
  }

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

        <JournalDate today={date} handleDateChange={this.handleDateChange} />

        <Editor
          editorState={editorState}
          onChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand.bind(this)}
          placeholder="Start writing here . . ."
          ref="start"
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(EntryEditor);
