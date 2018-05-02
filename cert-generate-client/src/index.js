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

let userId = localStorage.userId;
let name = localStorage.name;
if (userId) {
  store.dispatch(login({ userId, name }));
}

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
