import express from 'express';
import request from 'request';
import redis from 'redis';
import { pki } from 'node-forge';
import { promisify } from 'util';

import { createCertificateUrl, certificateUrl } from "../config";
import { fromBase64ToPem, verifySecret, getCollection } from "../functions";

const router = express.Router();
const session = redis.createClient();
const getFromSession = promisify(session.get).bind(session);

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
    }, async (error, response, body) => {
      if (error) {
        console.log(e);
        return;
      }
      const { certificate } = body;
      const certReq = pki.certificationRequestFromPem(csr);
      const { publicKey } = certReq;
      const store = await getCollection("certificates");
      await store.insertOne({
        publicKey,
        secret
      });
      res.json({
        certificate
      })
    });
});

/**
 * for revoke certificate
 */
router.delete('/', (req, res) => {
  const { userId } = req.body;
  const certificate = getFromSession(userId);
  request.delete(certificateUrl, {
      body: {
        certificate
      },
      json: true,
    })
    .on('error', function(err) {
      console.log(err);
    })
    .pipe(request.delete('http://localhost:8000'));
});

export default router;