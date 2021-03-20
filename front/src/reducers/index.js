import { combineReducers } from "redux";

import clients from "./clients";
import authReducer from "./auth";

export default combineReducers({
  clients,
  authReducer,
});
