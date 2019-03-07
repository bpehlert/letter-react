import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

class Auth extends Component {
  state = { location: "" };

  componentDidMount() {
    const { pathname } = this.props.location;
    switch (pathname) {
      case "/sign-in":
        return this.setState({ location: "Log in" });
      case "/log-in":
        return this.setState({ location: "Sign in" });
    }
  }

  render() {
    console.log(this.state);

    return (
      <div>
        <h1>Sign Up</h1>
        <p>By signing up, you agree to our terms and conditions.</p>
        <p>
          Already have an account?{" "}
          <Link to="/log-in">{this.state.location} here.</Link>
        </p>
      </div>
    );
  }
}

export default withRouter(Auth);
