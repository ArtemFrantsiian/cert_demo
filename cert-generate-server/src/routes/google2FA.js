import express from 'express';
import redis from 'redis';
import { promisify } from 'util';
import { pki } from 'node-forge';
import { verifySecret , getCollection } from "../functions";

const session = redis.createClient();
const getFromSession = promisify(session.get).bind(session);

const router = express.Router();

router.post('/', async (req, res) => {
  const {userId, token} = req.body;

  const store = await getCollection("certificates");
  const certificate = await getFromSession(userId);
  const secret = await store.findOne({ certificate });

  res.status(200).json({ success: verifySecret(secret, token) });
});

export default router;