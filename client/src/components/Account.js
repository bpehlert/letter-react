import React from "react";
import Header from "./navigation/Header";

const Account = ({ routeProps }) => {
  console.log(routeProps);

  return (
    <div>
      <Header routeProps={routeProps.location.pathname} />
      <div>
        <p>Account Settings</p>
      </div>
    </div>
  );
};

export default Account;
