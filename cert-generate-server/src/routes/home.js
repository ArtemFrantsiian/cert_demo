import express from 'express';
import { pki } from "node-forge";
import Remme from "remme";
import redis from 'redis';

import { nodeAddress, socketAddress } from "../config";
import { getUserId } from "../functions";

const router = express.Router();
const session = redis.createClient();

router.get("/", async (req, res) => {
  console.log("get");
  const certificate = decodeURIComponent(req.get('X-SSL-Client-Cert'));
  console.log(certificate);
  if (certificate) {
    const cert = pki.certificateFromPem(certificate);
    // const backURL = req.header('Referer') || 'http://localhost/login';
    const backURL = 'http://localhost/login';
    const remme = new Remme.Client({
      nodeAddress,
      socketAddress,
    });
    console.log("new remme");
    const check = await remme.certificate.check(cert);
    const userId = getUserId();
    session.set(userId, certificate);
    console.log(check);
    if (check.valid) {
      res.redirect(`${backURL}?isOk=true&name=${cert.subject.getField('CN').value.split(" ")[0]}&userId=${userId}`);
    } else {
      res.redirect(`${backURL}?isOk=false&name=false&userId=false`);
    }
  } else {
    res.redirect(`${backURL}?isOk=false&name=false&userId=false`);
  }
});

export default router;