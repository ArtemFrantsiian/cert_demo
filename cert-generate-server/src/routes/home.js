import express from 'express';
import { asn1, pki, util } from "node-forge";
import request from "request";
import moment from 'moment';
import { certificateUrl } from "../config";
import { fromBase64ToPem } from "../functions";

const router = express.Router();

router.get("/", (req, res) => {
  const backURL = req.header('Referer') || '/';
  const cert = req.connection.getPeerCertificate();
  console.log(cert);
  const isOk = moment().isSameOrBefore(cert.valid_to);
  if (isOk && cert.valid_to) {
    const base64 = cert.raw.toString('base64');
    const certificate = fromBase64ToPem(base64);
    request.post(certificateUrl, {
      body: {
        certificate
      },
      json: true,
    }, function (error, response, body) {
      if (error || response.statusCode !== 200) {
        res.redirect(`${backURL}?isOk=false&name=false&cert=false`);
        return;
      }
      if (body.revoked) {
        res.redirect(`${backURL}?isOk=false&name=false&cert=false`);
        return;
      }
      res.redirect(`${backURL}?isOk=${isOk}&name=${cert.subject.CN.split(" ")[0]}&cert=${base64}`);
    });
  } else {
    console.log("isNotOk");
    res.redirect(`${backURL}?isOk=false&name=false&cert=false`);
  }
});

export default router;