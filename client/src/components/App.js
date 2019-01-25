import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import GlobalStyle from "../theme/global";

import Header from "./navigation/Header";
import Landing from "./Landing";
import Entries from "./Entries";
import EntryNew from "./entries/EntryNew";
import Account from "./Account";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return Landing;
      default:
        return Entries;
    }
  }

  render() {
    return (
      <Router>
        <div>
          <GlobalStyle />
          <Header />
          <Route exact path="/" component={this.renderContent()} />
          <Route exact path="/new" component={EntryNew} />
          <Route path="/account" component={Account} />
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(
  mapStateToProps,
  actions
)(App);
