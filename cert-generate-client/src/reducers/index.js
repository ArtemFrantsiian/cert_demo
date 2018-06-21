import { combineReducers } from "redux";

import auth from "./auth";
import keyStore from "./keyStore";

//----------------------------------------------------------------------------------------------------------------------

export default combineReducers({
  auth,
  keyStore,
})