import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import GlobalStyle from "../theme/global";

import Header from "./navigation/Header";
import Landing from "./Landing";
import Entries from "./Entries";
import New from "./entries/New";
import Auth from "./auth/Auth";
import Account from "./Account";

// Refactor with React Hooks

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
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          this.props.auth ? <Component {...props} /> : <Redirect to="/log-in" />
        }
      />
    );

    return (
      <Router>
        <div>
          <GlobalStyle />
          <Header />
          <Route exact path="/" component={this.renderContent()} />
          <Route exact path="/sign-up" component={Auth} />
          <Route exact path="/log-in" component={Auth} />
          <Route exact path="/new" component={New} />
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
