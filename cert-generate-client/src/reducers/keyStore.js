import { KEY_STORE_SAVE } from '../types';

const initialState = {
  privateKey: "",
};

const handleSave = (state, { privateKey }) => ({
  privateKey: privateKey,
});

const handlers = {
  [KEY_STORE_SAVE]: handleSave,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action.payload) : state;
};
