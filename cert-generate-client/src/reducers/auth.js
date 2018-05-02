import { LOGIN, LOGOUT } from '../types';

const initialState = {
  isLoggedIn: false,
  certificate: "",
  name: "",
  secret: ""
};

const handleLogin = (state, { certificate, name, secret }) => ({
  isLoggedIn: true,
  certificate,
  name,
  secret
});

const handleLogout = () => initialState;

const handlers = {
  [LOGIN]: handleLogin,
  [LOGOUT]: handleLogout,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action.payload) : state;
};
