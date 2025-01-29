const FireStoreController = require('../controllers/firestore.controller');
const MONGODBController = require('../controllers/mongodb.controller');
const { MONGODB, FIRESTORE } = require('../config/db.config');

/**
 * Creates a new data entry in the configured database.
 * Delegates the operation to the respective database controller.
 *
 * @async
 * @function createData
 * @param {Object} req - The request object containing data to create.
 * @param {Object} res - The response object to send results.
 * @returns {Promise<void>} Resolves when the operation is complete.
 * @throws {Error} Logs an error if data creation fails.
 */
exports.createData = async (...args) => {
  const DATABASE = process.env.DATABASE;
  if (DATABASE === MONGODB) return MONGODBController.createData(...args);
  if (DATABASE === FIRESTORE) return FireStoreController.createData(...args);
};

/**
 * Retrieves all data entries from the configured database.
 * Optionally filters results based on query parameters.
 *
 * @async
 * @function getAllData
 * @param {Object} req - The request object containing query parameters.
 * @param {Object} res - The response object to send results.
 * @returns {Promise<void>} Resolves when the operation is complete.
 * @throws {Error} Logs an error if data retrieval fails.
 */
exports.getAllData = async (...args) => {
  const DATABASE = process.env.DATABASE;
  if (DATABASE === MONGODB) return MONGODBController.getAllData(...args);
  if (DATABASE === FIRESTORE) return FireStoreController.getAllData(...args);
};

/**
 * Retrieves a specific data entry by its ID from the configured database.
 *
 * @async
 * @function getData
 * @param {Object} req - The request object containing the entry ID.
 * @param {Object} res - The response object to send results.
 * @returns {Promise<void>} Resolves when the operation is complete.
 * @throws {Error} Logs an error if the data retrieval fails.
 */
exports.getData = async (...args) => {
  const DATABASE = process.env.DATABASE;
  if (DATABASE === MONGODB) return MONGODBController.getData(...args);
  if (DATABASE === FIRESTORE) return FireStoreController.getData(...args);
};

/**
 * Updates an existing data entry in the configured database by its ID.
 *
 * @async
 * @function updateData
 * @param {Object} req - The request object containing the entry ID and update data.
 * @param {Object} res - The response object to send results.
 * @returns {Promise<void>} Resolves when the operation is complete.
 * @throws {Error} Logs an error if the update fails.
 */
exports.updateData = async (...args) => {
  const DATABASE = process.env.DATABASE;
  if (DATABASE === MONGODB) return MONGODBController.updateData(...args);
  if (DATABASE === FIRESTORE) return FireStoreController.updateData(...args);
};

/**
 * Deletes a specific data entry by its ID from the configured database.
 *
 * @async
 * @function deleteData
 * @param {Object} req - The request object containing the entry ID.
 * @param {Object} res - The response object to send results.
 * @returns {Promise<void>} Resolves when the operation is complete.
 * @throws {Error} Logs an error if the deletion fails.
 */
exports.deleteData = async (...args) => {
  const DATABASE = process.env.DATABASE;
  if (DATABASE === MONGODB) return MONGODBController.deleteData(...args);
  if (DATABASE === FIRESTORE) return FireStoreController.deleteData(...args);
};
