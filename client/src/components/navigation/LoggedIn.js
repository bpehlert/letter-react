import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Nav from "../styled/Nav";
import LogoImg from "../styled/LogoImg";
import DropDown from "../styled/DropDown";
import DropDownContainer from "../styled/DropDownContainer";
import ButtonLink from "../styled/ButtonLink";
import ProfileImg from "../styled/ProfileImg";

class LoggedIn extends Component {
  state = { showMenu: false };

  showMenu = () => {
    document.addEventListener("click", this.closeMenu);
    this.setState({ showMenu: true });
  };

  closeMenu = e => {
    if (!this.profileMenu.contains(e.target)) {
      document.removeEventListener("click", this.closeMenu);
      this.setState({ showMenu: false });
    }
  };

  render() {
    return (
      <Nav>
        <Link to={"/"}>
          <LogoImg src={require("../../assets/block_small_logo.png")} />
        </Link>

        <div className="nav-bar-options">
          <ul>
            <li>
              <ButtonLink to="/new" primary="true">
                New Entry
              </ButtonLink>
            </li>
          </ul>

          <DropDownContainer>
            <ProfileImg
              src={this.props.auth.photoURL}
              onClick={this.showMenu}
              ref={e => {
                this.profileMenu = e;
              }}
            />

            {this.state.showMenu ? (
              <DropDown>
                <Link to={"/account"} className="link">
                  Account
                </Link>
                <a href="/api/logout" className="link">
                  Log out
                </a>
              </DropDown>
            ) : null}
          </DropDownContainer>
        </div>
      </Nav>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(LoggedIn);
