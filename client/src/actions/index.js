import axios from "axios";
import { FETCH_USER } from "./types";

// This function returns a thunk, or in other words a function that will call the "dispatch"
// function once the promise has been resolved.
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const saveEntry = (values, history) => async dispatch => {
  history.push("/entries");
  return { type: "submit_survey" };
};
