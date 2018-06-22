import { combineReducers } from "redux";

import auth from "./auth";
import keyStore from "./keyStore";
import googleAuth from "./googleAuth";

//----------------------------------------------------------------------------------------------------------------------

export default combineReducers({
  auth,
  keyStore,
  googleAuth,
})