import api from "../config/api";
import { LOGIN, LOGOUT } from "../types";

export const login = data => dispatch => {
  dispatch({
    type: LOGIN,
    payload: data
  })
};

export const logout = () => async dispatch => {
  const userId = localStorage.getItem('userId');
  const data = {
    userId
  };
  await api.logout({ data });
  localStorage.removeItem('userId');
  localStorage.removeItem('name');
  dispatch({
    type: LOGOUT
  })
};