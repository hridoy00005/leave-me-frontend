import { combineReducers } from "redux";
import { AuthReducer } from "./modules";

export default combineReducers({
  auth: AuthReducer,
});
