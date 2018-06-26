import express from 'express';

import { verifySecret, getCollection } from "../functions";

const router = express.Router();

/**
 * for create certificate
 */
router.put('/', async (req, res) => {
  const { certificate, token, secret } = req.body;
  if(secret && !verifySecret(secret, token)){
    res.status(400).json({ notValid: true });
    return;
  }
  try {
    const store = await getCollection("certificates");

    await store.insertOne({
      certificate,
      secret
    });
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e);
    res.status(500);
  }
});

export default router;