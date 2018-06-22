import express from 'express';
import { pki } from "node-forge";
import Remme from "remme";
import redis from 'redis';

import { nodeAddress, socketAddress } from "../config";
import {getCollection, getUserId} from "../functions";

const router = express.Router();
const session = redis.createClient();

router.get("/", async (req, res) => {
  const certificate = decodeURIComponent(req.get('X-SSL-Client-Cert'));
  if (certificate) {
    const cert = pki.certificateFromPem(certificate);
    const backURL = req.header('Referer') || 'http://localhost:3000/login';
    const remme = new Remme.Client({
      nodeAddress,
      socketAddress,
    });
    const check = await remme.certificate.check(cert);
    const userId = getUserId();
    session.set(userId, certificate);
    if (check.valid) {
      const store = await getCollection("certificates");
      const secret = await store.findOne({ certificate });
      res.redirect(`${backURL}?isOk=true&name=${cert.subject.getField('CN').value.split(" ")[0]}&userId=${userId}&ga=${!!secret}`);
    } else {
      res.redirect(`${backURL}?isOk=false&name=false&userId=false&ga=false`);
    }
  } else {
    res.redirect(`${backURL}?isOk=false&name=false&userId=false&ga=false`);
  }
});

export default router;