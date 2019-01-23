import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import GlobalStyle from "../theme/global";

import Header from "./navigation/Header";
import Landing from "./Landing";
import Entries from "./Entries";
import EntryNew from "./entries/EntryNew";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <Router>
        <div>
          <GlobalStyle />
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/entries" component={Entries} />
          <Route path="/entries/new" component={EntryNew} />
        </div>
      </Router>
    );
  }
}

export default connect(
  null,
  actions
)(App);
