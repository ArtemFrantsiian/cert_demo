import express from 'express';
import request from 'request';
import { pki } from 'node-forge';

import { createCertificateUrl, certificateUrl } from "../config";
import { fromBase64ToPem, verifySecret } from "../functions";

const router = express.Router();

/**
 * for create certificate
 */
router.put('/', (req, res) => {
  const { csr, token, secret } = req.body;
  if(!verifySecret(secret, token)){
    console.log("Google Authenticatior was not confirmed");
    res.status(400).json({ qrcode: false });
    return;
  }
  request.put(createCertificateUrl, {
      body: {
        certificate: csr
      },
      json: true,
    }, (error, response, body) => {
      const { certificate } = body;
      // store.hset(userId, "certificate", certificate);
      const certReq = pki.certificationRequestFromPem(csr);
      console.log(certReq.publicKey);
      res.json({
        certificate
      })
    })
    .on("error", e => {
      console.log(e);
    });
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