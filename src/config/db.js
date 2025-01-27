const mongoose = require('mongoose');

const MONGODB = 'mongodb';

/**
 * Connects to MongoDB using the URI from env variables.
 * Logs SUCCESS / FAILURE to the console based on connection status.
 * Exits the process if the connection fails.
 *
 * @async
 * @function connectDB
 * @throws {Error} Logs error if the connection to MongoDB fails.
 * @returns {void}
 */
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connection: SUCCESS 🚀');
  } catch (error) {
    console.error('MongoDB Connection: FAILED 🚨', error);
    process.exit(1);
  }
};

const connect = ({ database = process.env.DATABASE } = {}) => {
  if (database === MONGODB) connectToMongoDB();
};

module.exports = {
  connect,
};
