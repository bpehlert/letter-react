import React from "react";
import Button from "../styled/Button";

const Landing = () => {
  return (
    <div>
      <li>
        <Button as="a" href="#" primary>
          Start a journal
        </Button>
      </li>
      <li>
        <Button as="a" href="/auth/google">
          Sign in
        </Button>
      </li>
    </div>
  );
};

export default Landing;
