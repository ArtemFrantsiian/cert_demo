import jwt from 'jsonwebtoken';

import api from "../config/api";
import { LOGIN, LOGOUT } from "../types";

export const login = data => dispatch => {
  dispatch({
    type: LOGIN,
    payload: data
  })
};

export const logout = () => async dispatch => {
  const token = localStorage.getItem("token");
  const { userId } = jwt.decode(token);
  const data = {
    userId
  };
  await api.logout({ data });
  localStorage.removeItem('token');
  dispatch({
    type: LOGOUT
  })
};