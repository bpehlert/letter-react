import { combineReducers } from "redux";
import authReducer from "./authReducer";
import entryReducer from "./entryReducer";

export default combineReducers({
  auth: authReducer,
  entry: entryReducer
});
