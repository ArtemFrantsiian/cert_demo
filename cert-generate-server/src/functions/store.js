import redis from "redis";
import shortid from "shortid";
import { MongoClient } from "mongodb";

const session = redis.createClient();

export async function getCollection(name) {
  const url = "mongodb://localhost:27017";
  const mongo = await MongoClient.connect(url);
  const db = mongo.db("users");
  return await db.collection(name);
}

export const getUserId = (userId = shortid.generate()) => {
  if (!session.exists(userId)) return getUserId();
  return userId;
};