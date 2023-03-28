const { MongoClient } = require('mongodb');

function connectToDatabase() {
  // Connection URI
  const uri = 'mongodb://localhost:27017/mydatabase';

  // Create a new MongoClient
  const client = new MongoClient(uri);

  // Connect to the MongoDB server
  return client.connect().then(() => {
    console.log('Connected to MongoDB successfully');

    // Use the client to access the database
    const database = client.db('mydatabase');

    // Return the database object
    return database;
  }).catch((err) => {
    console.log(`Failed to connect to MongoDB: ${err}`);
    throw err;
  });
}

// Export the function as a module
module.exports = connectToDatabase;
