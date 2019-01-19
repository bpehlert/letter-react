import React from "react";
import { Link } from "react-router-dom";

const Entries = () => {
  return (
    <div>
      <p>Entries Paragraph</p>
      Entries
      <div className="fixed-action-btn">
        <Link
          to="/entries/new"
          className="btn-floating btn-large waves-effect waves-light red"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Entries;
