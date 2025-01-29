const { MONGODB, FIRESTORE } = require('./constants');
const { connectToFirestore } = require('./firestore.config');
const { connectToMongoDB } = require('./mongodb.config');

/**
 * Establishes a connection to the specified database.
 * Supports MongoDB and Firestore for now
 *
 * @async
 * @function connect
 * @param {Object} [options] - Configuration options.
 * @param {string} [options.database=process.env.DATABASE] - The database type to connect to (e.g., "mongodb" or "firestore").
 * @throws {Error} Logs an error and exits the process if no valid database is configured.
 * @returns {Promise<void>} Resolves when the database connection is successfully established.
 */
const connect = async ({ database = process.env.DATABASE } = {}) => {
  if (database === MONGODB) await connectToMongoDB();
  else if (database === FIRESTORE) await connectToFirestore();
  // add support for more databases here...
  else {
    console.error('No valid database has been configured 🚨');
    process.exit(1);
  }
};

module.exports = {
  connect,
  MONGODB,
  FIRESTORE,
};
