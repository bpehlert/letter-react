import React from "react";

const Entry = ({ date, body }) => {
  return (
    <div>
      <h4>{date}</h4>
      <p>{body}</p>
    </div>
  );
};

export default Entry;
