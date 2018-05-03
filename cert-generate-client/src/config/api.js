import axios from 'axios';

import { host, certificateUrl, google2FAUrl } from "./index";

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

const certificate = {
  createCertificate: serverRequest({
    method: 'PUT',
    url: certificateUrl,
    // headers: defaultHeaders(authHeaders),
  }),
  revokeCertificate: serverRequest({
    method: 'DELETE',
    url: certificateUrl,
    // headers: defaultHeaders(authHeaders),
  }),
};

const google2FA = {
  verify2FA: serverRequest({
    method: 'POST',
    url: google2FAUrl,
  })
};

const auth = {
  logout: serverRequest({
    method: 'DELETE',
    url: host
  })
};

export default {
  ...certificate,
  ...google2FA,
  ...auth
}