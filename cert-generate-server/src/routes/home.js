import express from 'express';
import { asn1, pki, util } from "node-forge";
import request from "request";
import moment from 'moment';
import redis from 'redis';

import { certificateUrl } from "../config";
import { getUserId } from "../functions";

const router = express.Router();
const session = redis.createClient();

router.get("/", (req, res) => {
  const certificate = decodeURIComponent(req.get('X-SSL-Client-Cert'));
  const cert = pki.certificateFromPem(certificate);
  const backURL = req.header('Referer') || 'http://localhost/login';
  const isOk = moment().isSameOrBefore(cert.valid_to);
  const userId = getUserId();
  const { publicKey } = cert;
  session.set(userId, publicKey);
  if (isOk && cert.valid_to) {
    request.post(certificateUrl, {
      body: {
        certificate
      },
      json: true,
    }, function (error, response, body) {
      if (error || response.statusCode !== 200) {
        res.redirect(`${backURL}?isOk=false&name=false&userId=false`);
        return;
      }
      if (body.revoked) {
        res.redirect(`${backURL}?isOk=false&name=false&userId=false`);
        return;
      }
      res.redirect(`${backURL}?isOk=${isOk}&name=${cert.subject.CN.split(" ")[0]}&userId=${userId}`);
    });
  } else {
    console.log("isNotOk");
    res.redirect(`${backURL}?isOk=false&name=false&userId=false`);
  }
});

router.delete('/', (req, res) => {
  const { userId } = req.body;
  session.del(userId);
  res.json({ success: true });
});

export default router;