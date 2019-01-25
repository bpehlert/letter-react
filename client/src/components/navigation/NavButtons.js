import React from "react";
import ButtonLink from "../styled/ButtonLink";

const NavButtons = ({ componentName }) => {
  switch (componentName) {
    default:
      return (
        <ul>
          <li>
            <ButtonLink to="/new" primary="true">
              New Entry
            </ButtonLink>
          </li>
        </ul>
      );
    case "/new":
      return (
        <ul>
          <li>
            <ButtonLink to="/account">Delete Entry</ButtonLink>
          </li>
          <li>
            <ButtonLink to="/test" primary="true">
              Save Entry
            </ButtonLink>
          </li>
        </ul>
      );
  }
};

export default NavButtons;
