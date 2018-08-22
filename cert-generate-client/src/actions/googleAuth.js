import { SET_GOOGLE_AUTH } from "../types";

export const setGoogleAuth = data => dispatch => {
  dispatch({
    type: SET_GOOGLE_AUTH,
    payload: data
  })
};