import express from 'express';
import request from 'request';

import { createCertificateUrl, certificateUrl } from "../config";
import { fromBase64ToPem, verifySecret } from "../functions";


const router = express.Router();

/**
 * for create certificate
 */
router.put('/', (req, res) => {
  const { certificate, token, secret } = req.body;
  if(!verifySecret(secret, token)){
    console.log("Google Authenticatior was not confirmed");
    // res.status(400).json({ qrcode: false });
    // return;
  }
  //TODO store certificate, and 2FA secret in persistent storage
  request
    .put(createCertificateUrl, {
      body: {
        certificate
      },
      json: true,
    })
    .on('error', function(err) {
      console.log(err);
    })
    .pipe(res);
});

/**
 * for revoke certificate
 */
router.delete('/', (req, res) => {
  const certificate = fromBase64ToPem(req.body.certificate);
  request
    .delete(certificateUrl, {
      body: {
        certificate
      },
      json: true,
    })
    .on('error', function(err) {
      console.log(err);
    })
    .pipe(res);
});

export default router;