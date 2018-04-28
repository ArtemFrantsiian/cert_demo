import React from 'react';
import { render } from "react-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";

import rootReducer from "./reducers";
import Routes from "./routes";
import { login } from "./actions";
import './index.scss';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

let token = localStorage.token;
let name = localStorage.name;
let secret = localStorage.secret;
if (token) {
  store.dispatch(login({ certificate: token, name: name, secret }));
}

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
