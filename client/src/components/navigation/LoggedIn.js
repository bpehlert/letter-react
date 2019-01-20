import React from "react";
import Button from "../styled/Button";

const LoggedIn = () => {
  return (
    <div>
      <li>
        <Button as="a" href="/api/logout">
          Logout
        </Button>
      </li>
    </div>
  );
};

export default LoggedIn;
