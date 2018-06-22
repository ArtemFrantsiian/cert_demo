import express from 'express';
import redis from "redis";
import { promisify } from "util";

const router = express.Router();

const session = redis.createClient();
const getFromSession = promisify(session.get).bind(session);

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const certificate = await getFromSession(id);
  res.json({ certificate });
});

export default router;