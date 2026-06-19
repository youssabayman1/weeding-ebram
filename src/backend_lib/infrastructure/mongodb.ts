import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // Use a global variable to preserve the client promise across hot-reloads.
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, {
      connectTimeoutMS: 5000,
      socketTimeoutMS: 5000,
    });
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;

/**
 * Helper to retrieve the database instance.
 */
export async function getDb(dbName = 'weading_ebram_db') {
  const client = await clientPromise;
  return client.db(dbName);
}

/**
 * Health check helper to test database connectivity.
 */
export async function checkDatabaseConnection(): Promise<{ connected: boolean; error?: string }> {
  try {
    const client = await clientPromise;
    // Ping database
    await client.db('admin').command({ ping: 1 });
    return { connected: true };
  } catch (err: any) {
    return { connected: false, error: err.message || String(err) };
  }
}
