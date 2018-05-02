import { MongoClient } from "mongodb";

export async function getCollection(name) {
  const url = "mongodb://localhost:27017";
  const mongo = await MongoClient.connect(url);
  const db = mongo.db("users");
  return await db.collection(name);
}