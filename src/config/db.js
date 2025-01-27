const mongoose = require('mongoose');

const MONGODB = 'mongodb';

/**
 * Connects to MongoDB using the URI from environment variables.
 * Logs a success or failure message to the console.
 * Exits the process if the connection fails.
 *
 * @async
 * @function connectToMongoDB
 * @throws {Error} Throws an error if the connection to MongoDB fails.
 * @returns {Promise<void>} Resolves if the connection is successful.
 */
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connection: SUCCESS 🚀');
  } catch (error) {
    console.error('MongoDB Connection: FAILED 🚨', error);
    process.exit(1);
  }
};

/**
 * Connects to the specified database type.
 * Currently, only MongoDB is supported.
 *
 * @function connect
 * @param {Object} [options] - Configuration options.
 * @param {string} [options.database=process.env.DATABASE] - The type of database to connect to.
 * @returns {void}
 */
const connect = ({ database = process.env.DATABASE } = {}) => {
  if (database === MONGODB) connectToMongoDB();
};

module.exports = {
  connect,
};
