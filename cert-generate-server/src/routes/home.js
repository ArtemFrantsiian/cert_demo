import express from 'express';
import Remme from "remme";
import { certificateFromPem } from "remme-utils";
import redis from 'redis';
import sha256 from "js-sha256";

import { nodeAddress } from "../config";
import { getCollection, getUserId } from "../functions";

const remme = new Remme.Client({
  networkConfig: {
    nodeAddress
  },
});
const router = express.Router();
const session = redis.createClient();

router.get("/", async (req, res) => {
  const certificate = decodeURIComponent(req.get('X-SSL-Client-Cert'));
  const cert = certificateFromPem(certificate);
  const backURL = req.header('Referer');

  if (certificate) {
    let isValid = false;
    try {
      const check = await remme.certificate.check(certificate);
      isValid = check.valid;
    } catch (e) {
      res.redirect(`${backURL}?isOk=false&name=false&userId=false&ga=false`);
    }
    const userId = getUserId();
    session.set(userId, certificate);
    if (isValid) {
      const store = await getCollection("certificates");
      const { secret } = await store.findOne({ hashOfCertificate: sha256(certificate.replace(/\r?\n?/g, "")) });
      res.redirect(`${backURL}?isOk=true&name=${cert.subject.getField('CN').value.split(" ")[0]}&userId=${userId}&ga=${!!secret}`);
    } else {
      res.redirect(`${backURL}?isOk=false&name=false&userId=false&ga=false`);
    }
  } else {
    res.redirect(`${backURL}?isOk=false&name=false&userId=false&ga=false`);
  }
});

router.delete('/', (req, res) => {
  const { userId } = req.body;
  session.del(userId);
  res.json({ success: true });
});

export default router;