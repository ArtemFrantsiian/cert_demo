import express from 'express';
import { asn1, pki, util } from "node-forge";
import request from "request";
import moment from 'moment';
import { certificateUrl } from "../config";
import { fromBase64ToPem } from "../functions";

const router = express.Router();

router.get("/", (req, res) => {
  var certificate = decodeURIComponent(req.get('X-SSL-Client-Cert'));
  const cert = pki.certificateFromPem(certificate);
  const backURL = req.header('Referer') || '/';
  const isOk = moment().isSameOrBefore(cert.valid_to);
  if (isOk && cert.valid_to) {
    request.post(certificateUrl, {
      body: {
        certificate
      },
      json: true,
    }, function (error, response, body) {
      if (error || response.statusCode !== 200) {
        res.redirect(`${backURL}?isOk=false&name=false`);
        return;
      }
      if (body.revoked) {
        res.redirect(`${backURL}?isOk=false&name=false`);
        return;
      }
      res.redirect(`${backURL}?isOk=${isOk}&name=${cert.subject.CN.split(" ")[0]}`);
    });
  } else {
    console.log("isNotOk");
    res.redirect(`${backURL}?isOk=false&name=false`);
  }
});

export default router;