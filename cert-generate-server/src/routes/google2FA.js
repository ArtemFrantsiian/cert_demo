import express from 'express';
import {verifySecret} from "../functions";

const router = express.Router();

router.post('/', (req, res) => {
  const {userId, token} = req.body;

  const secret = userId;
  // store.hget(userId, "secret", (err, secret) => {
  //   if (err) {
  //     res.status(404).json({success: false});
  //   }
  //   const success = verifySecret(secret, token);
  //   res.status(200).json({ success });
  // })

  res.status(200).json({ success: verifySecret(secret, token) });
});

export default router;