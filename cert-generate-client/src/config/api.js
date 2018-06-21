import axios from 'axios';

import { host, google2FAUrl } from "./index";

const serverRequest = config => async ({ data = false, params = false } = { data: false, params: false }) => {
  try {
    const r = await axios({
      ...config,
      data: data || undefined,
      params: params || undefined,
    });
    return r.data;
  } catch (e) {
    return e.response.data;
  }
};

const google2FA = {
  verify2FA: serverRequest({
    method: 'POST',
    url: google2FAUrl,
  })
};

const auth = {
  register: serverRequest({
    method: 'PUT',
    url: host,
    // headers: defaultHeaders(authHeaders),
  }),
  logout: serverRequest({
    method: 'DELETE',
    url: host
  })
};

export default {
  ...google2FA,
  ...auth
}