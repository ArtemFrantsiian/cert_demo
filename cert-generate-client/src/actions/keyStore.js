import { KEY_STORE_SAVE } from "../types";

export const saveKeyStore = data => dispatch => {
  dispatch({
    type: KEY_STORE_SAVE,
    payload: data
  })
};