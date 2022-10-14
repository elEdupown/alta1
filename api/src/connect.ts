import { MongoClient, ServerApiVersion } from 'mongodb'
import { doesNotMatch } from 'assert';

const uri = process.env.MONGO_URI as string;
const client = new MongoClient(uri);
await client.connect();

export { client };