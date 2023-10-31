

const { MongoClient } = require('mongodb'); // For JavaScript
// import { MongoClient } from 'mongodb'; // For TypeScript

const config = {
  admin: "aqeel.kazmi@vaival.com",
  PORT: 5008,
  JWT_SECRET_KEY: "6dqw7dydyw7ewyuw",
  SESSION_EXPIRES_IN: "1d",
  mongo: {
    URL: "mongodb://localhost:27017/launchpad_elyTest_nft_dev",
    DB_NAME: "launchpad_elyTest_nft_dev"
  }
};

async function connectToMongo() {
  const { URL, DB_NAME } = config.mongo;
  const client = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    
  
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    client.close();
  }
}

connectToMongo();
