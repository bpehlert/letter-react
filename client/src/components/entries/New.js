import React from "react";
import EntryContainer from "../styled/EntryContainer";
import EntryEditor from "./EntryEditor";

import "react-datepicker/dist/react-datepicker.css";

const New = () => {
  return (
    <EntryContainer>
      <EntryEditor />
    </EntryContainer>
  );
};

export default New;
