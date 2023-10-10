const mongoose = require('mongoose');
const Configs = require('./configs');

// Read the MongoDB connection URI from the environment variable
const dbURI = Configs.DATABASE_URL;

let dbConnection = null; // Singleton database connection

function connectToDatabase() {
  if (!dbConnection) {
    dbConnection = mongoose.connect(dbURI);

    const db = mongoose.connection;

    db.on('connected', () => {
      console.log('Connected to MongoDB');
    });

    db.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    db.on('disconnected', () => {
      console.log('Disconnected from MongoDB');
    });

    process.on('SIGINT', () => {
      db.close(() => {
        console.log('MongoDB connection closed due to application termination');
        process.exit(0);
      });
    });
  }

  return dbConnection;
}

module.exports = {
  connectToDatabase,
};