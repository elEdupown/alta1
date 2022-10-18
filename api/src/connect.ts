import { MongoClient, ObjectId } from 'mongodb'

const uri = process.env.MONGO_URI as string;
const client = new MongoClient(uri);
await client.connect();

export { client, ObjectId };