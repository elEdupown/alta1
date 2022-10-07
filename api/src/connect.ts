import { MongoClient, ServerApiVersion } from 'mongodb'
import { doesNotMatch } from 'assert';

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri, { 
    serverApi: ServerApiVersion.v1 
});
await client.connect();

export { client };