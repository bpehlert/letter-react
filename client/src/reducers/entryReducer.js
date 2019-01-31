import { UPDATE_ENTRY } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case UPDATE_ENTRY:
      return action.payload;
    default:
      return state;
  }
}
