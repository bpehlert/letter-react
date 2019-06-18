import axios from "axios";
import { FETCH_USER, FETCH_ENTRIES, UPDATE_ENTRY } from "./types";

// This function returns a thunk, or in other words a function that will call the "dispatch"
// function once the promise has been resolved.
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchEntries = () => async dispatch => {
  const res = await axios.get("/api/get_entries");
  dispatch({ type: FETCH_ENTRIES, payload: res.data });
};

// Rather than creating a mapDispatchToProps function at the component level,
// I've create a function that returns the dispatch callback to dispatch the action to the combined reducers.
export const updateEntry = payload => dispatch => {
  dispatch({ type: UPDATE_ENTRY, payload });
};
