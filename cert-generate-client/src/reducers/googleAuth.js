import { SET_GOOGLE_AUTH } from '../types';

const initialState = {
  check: true,
};

const handleSet = (state, { check }) => ({
  check,
});

const handlers = {
  [SET_GOOGLE_AUTH]: handleSet,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action.payload) : state;
};
