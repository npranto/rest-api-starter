const { FirestoreDB } = require('../config/firestore.config');

const COLLECTION_NAME = 'datas';

/**
 * Creates a new data entry in Firestore.
 *
 * @async
 * @function createData
 * @param {Object} req - The request object containing the data to create.
 * @param {Object} res - The response object for sending results.
 * @returns {Promise<void>} Sends a response with the created data or an error message.
 */
const createData = async (req, res) => {
  try {
    const { type, data, metadata = {} } = req.body || {};
    const newData = { type, data, metadata };

    const docRef = await FirestoreDB.collection(COLLECTION_NAME).add(newData);
    const createdData = { id: docRef.id, ...newData };

    res.status(201).json({
      message: 'Data Creation: SUCCESS 🚀',
      data: createdData,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Data Creation: FAILED 🚨',
      error: error?.message || 'Unable to create data 😢',
    });
  }
};

/**
 * Retrieves all data entries, optionally filtered by type.
 *
 * @async
 * @function getAllData
 * @param {Object} req - The request object containing query parameters.
 * @param {Object} res - The response object for sending results.
 * @returns {Promise<void>} Sends a response with retrieved data or an error message.
 */
const getAllData = async (req, res) => {
  try {
    const filter = req.query?.type ? { type: req.query.type } : {};
    let query = FirestoreDB.collection(COLLECTION_NAME);

    if (filter.type) {
      query = query.where('type', '==', filter.type);
    }

    const snapshot = await query.get();
    const allData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    res.status(200).json({
      message: 'Data Retrieval By Type: SUCCESS 🚀',
      data: allData,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Data Retrieval By Type: FAILED 🚨',
      error: error?.message || 'Unable to get data by type 😢',
    });
  }
};

/**
 * Retrieves a specific data entry by its ID.
 *
 * @async
 * @function getData
 * @param {Object} req - The request object containing the entry ID.
 * @param {Object} res - The response object for sending results.
 * @returns {Promise<void>} Sends a response with the retrieved data or an error message.
 */
const getData = async (req, res) => {
  try {
    const docRef = FirestoreDB.collection(COLLECTION_NAME).doc(req.params?.id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({
        message: 'Data Retrieval By Id: FAILED 🚨',
        data: null,
      });
    }

    res.status(200).json({
      message: 'Data Retrieval By Id: SUCCESS 🚀',
      data: { id: doc.id, ...doc.data() },
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
 *
 * @async
 * @function updateData
 * @param {Object} req - The request object containing the entry ID and update data.
 * @param {Object} res - The response object for sending results.
 * @returns {Promise<void>} Sends a response with the updated data or an error message.
 */
const updateData = async (req, res) => {
  try {
    const { type, data, metadata } = req.body || {};
    const docRef = FirestoreDB.collection(COLLECTION_NAME).doc(req.params?.id);

    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({
        message: 'Data Update By Id: FAILED 🚨',
        data: null,
      });
    }

    await docRef.update({ type, data, metadata });

    const updatedDoc = await docRef.get();
    res.status(200).json({
      message: 'Data Update By Id: SUCCESS 🚀',
      data: { id: updatedDoc.id, ...updatedDoc.data() },
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
 *
 * @async
 * @function deleteData
 * @param {Object} req - The request object containing the entry ID.
 * @param {Object} res - The response object for sending results.
 * @returns {Promise<void>} Sends a response with the deleted data or an error message.
 */
const deleteData = async (req, res) => {
  try {
    const docRef = FirestoreDB.collection(COLLECTION_NAME).doc(req.params?.id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({
        message: 'Data Deletion By Id: FAILED 🚨',
        data: null,
      });
    }

    await docRef.delete();
    res.status(200).json({
      message: 'Data Deletion By Id: SUCCESS 🚀',
      data: { id: req.params?.id, ...doc.data() },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Data Deletion By Id: FAILED 🚨',
      error: error?.message || 'Unable to delete data by id 😢',
    });
  }
};

module.exports = {
  createData,
  getAllData,
  getData,
  updateData,
  deleteData,
};
