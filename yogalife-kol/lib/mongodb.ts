import { MongoClient } from "mongodb";

// Reuse one client across hot reloads in development and across requests in production.
const globalForMongo = globalThis as unknown as {
  mongoClient?: Promise<MongoClient>;
};

export function getDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set.");
  // Clear a failed connection so the next request retries instead of reusing the error.
  globalForMongo.mongoClient ??= new MongoClient(uri).connect().catch((error) => {
    globalForMongo.mongoClient = undefined;
    throw error;
  });
  return globalForMongo.mongoClient.then((client) =>
    client.db(process.env.MONGODB_DB || "yogalife"),
  );
}
