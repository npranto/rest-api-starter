const DataModel = require('../models/data.model');
const FireStoreController = require('../controllers/firestore.controller');
const MONGODBController = require('../controllers/mongodb.controller');
const { MONGODB, FIRESTORE } = require('../config/db.config');

/**
 * Creates a new data entry in the database.
 * Responds with the created data entry or an error message if creation fails.
 *
 * @async
 * @function createData
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 * @throws {Error} Logs error if data creation fails.
 */
exports.createData = (...args) => {
  const DATABASE = process.env.DATABASE;
  if (DATABASE === MONGODB) return MONGODBController.createData(...args);
  if (DATABASE === FIRESTORE) return FireStoreController.createData(...args);
};

/**
 * Retrieves all data entries, optionally filtered by type.
 * Responds with the filtered data or an error message if retrieval fails.
 *
 * @async
 * @function getAllData
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 * @throws {Error} Logs error if data retrieval fails.
 */
exports.getAllData = async (...args) => {
  const DATABASE = process.env.DATABASE;
  if (DATABASE === MONGODB) return MONGODBController.getAllData(...args);
  if (DATABASE === FIRESTORE) return FireStoreController.getAllData(...args);
};

/**
 * Retrieves a specific data entry by its ID.
 * Responds with the data entry or a not-found error if retrieval fails.
 *
 * @async
 * @function getData
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 * @throws {Error} Logs error if data retrieval fails.
 */
exports.getData = async (req, res) => {
  try {
    const data = await DataModel.findById(req.params?.id);
    if (!data) {
      return res.status(404).json({
        message: 'Data Retrieval By Id: FAILED 🚨',
        data: null,
      });
    }
    res.status(200).json({
      message: 'Data Retrieval By Id: SUCCESS 🚀',
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Data Retrieval By Id: FAILED 🚨',
      error: error?.message || 'Unable to get data by id 😢',
    });
  }
};

/**
 * Updates an existing data entry by its ID.
 * Responds with the updated data or a not-found error if update fails.
 *
 * @async
 * @function updateData
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 * @throws {Error} Logs error if data update fails.
 */
exports.updateData = async (req, res) => {
  try {
    const { type, data, metadata } = req.body || {};
    const updatedData = await DataModel.findByIdAndUpdate(
      req.params?.id,
      { $set: { type, data, metadata } },
      { new: true, runValidators: true }
    );
    if (!updatedData) {
      return res.status(404).json({
        message: 'Data Update By Id: FAILED 🚨',
        data: null,
      });
    }
    res.status(200).json({
      message: 'Data Update By Id: SUCCESS 🚀',
      data: updatedData,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Data Update By Id: FAILED 🚨',
      error: error?.message || 'Unable to update data by id 😢',
    });
  }
};

/**
 * Deletes a specific data entry by its ID.
 * Responds with the deleted data or a not-found error if deletion fails.
 *
 * @async
 * @function deleteData
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 * @throws {Error} Logs error if data deletion fails.
 */
exports.deleteData = async (req, res) => {
  try {
    const deletedData = await DataModel.findByIdAndDelete(req.params?.id);
    if (!deletedData) {
      return res.status(404).json({
        message: 'Data Deletion By Id: FAILED 🚨',
        data: null,
      });
    }
    res.status(200).json({
      message: 'Data Deletion By Id: SUCCESS 🚀',
      data: deletedData,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Data Deletion By Id: FAILED 🚨',
      error: error?.message || 'Unable to delete data by id 😢',
    });
  }
};
