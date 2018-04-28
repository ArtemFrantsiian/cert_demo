import { LOGIN, LOGOUT } from "../types";

export const login = data => dispatch => {
  dispatch({
    type: LOGIN,
    payload: data
  })
};

export const logout = () => dispatch => {
  localStorage.removeItem('token');
  dispatch({
    type: LOGOUT
  })
};