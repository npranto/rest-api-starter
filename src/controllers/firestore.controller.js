const { FirestoreDB } = require('../config/firestore.config');
const logger = require('../middlewares/logger.middleware');

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
exports.createData = async (req, res) => {
  try {
    const { type, data, metadata = {} } = req.body || {};
    const newData = { type, data, metadata };

    logger.http(`POST: /api/v1/data - IP: ${req.ip}`);
    logger.info(
      `REQUEST_BODY: [type: ${type}, data: ${JSON.stringify(data)}, metadata: ${JSON.stringify(metadata)}]`
    );

    const docRef = await FirestoreDB.collection(COLLECTION_NAME).add(newData);
    const createdData = { id: docRef.id, ...newData };

    logger.info(`DATA_CREATION | SUCCESS 🚀 | [id = ${createdData.id}]`);

    res.status(201).json({
      message: 'Data Creation: SUCCESS 🚀',
      data: createdData,
    });
  } catch (error) {
    logger.error(`DATA_CREATION | FAILED 🚨`, `${error.message}`, { error });
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
exports.getAllData = async (req, res) => {
  try {
    const filter = req.query?.type ? { type: req.query.type } : {};
    let query = FirestoreDB.collection(COLLECTION_NAME);

    logger.http(`GET: /api/v1/data - IP: ${req.ip}`);

    if (filter.type) {
      query = query.where('type', '==', filter.type);
    }

    const snapshot = await query.get();
    const allData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    logger.info(
      `DATA_RETRIEVAL | SUCCESS 🚀 | Retrieved ${allData.length} records | [${JSON.stringify(allData.map((e) => e.id))}]`
    );
    res.status(200).json({
      message: 'Data Retrieval By Type: SUCCESS 🚀',
      data: allData,
    });
  } catch (error) {
    logger.error(`DATA_RETRIEVAL | FAILED 🚨`, `${error.message}`, { error });
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
exports.getData = async (req, res) => {
  try {
    const docRef = FirestoreDB.collection(COLLECTION_NAME).doc(req.params?.id);
    const doc = await docRef.get();

    logger.http(`GET: /api/v1/data/${req.params.id} - IP: ${req.ip}`);

    if (!doc.exists) {
      logger.warn(`DATA_RETRIEVAL | FAILED 🚨 | NOT_FOUND`);
      return res.status(404).json({
        message: 'Data Retrieval By Id: FAILED 🚨',
        data: null,
      });
    }

    logger.info(`DATA_RETRIEVAL | SUCCESS 🚀 | [id = ${doc.id}]`);
    res.status(200).json({
      message: 'Data Retrieval By Id: SUCCESS 🚀',
      data: { id: doc.id, ...doc.data() },
    });
  } catch (error) {
    logger.error(`DATA_RETRIEVAL | FAILED 🚨`, `${error.message}`, { error });
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
exports.updateData = async (req, res) => {
  try {
    const { type, data, metadata = {} } = req.body || {};
    const docRef = FirestoreDB.collection(COLLECTION_NAME).doc(req.params?.id);

    logger.http(`PUT: /api/v1/data/${req.params.id} - IP: ${req.ip}`);
    logger.info(
      `REQUEST_BODY: [type: ${type}, data: ${JSON.stringify(data)}, metadata: ${JSON.stringify(metadata)}]`
    );

    const doc = await docRef.get();
    if (!doc.exists) {
      logger.warn(`DATA_UPDATE | FAILED 🚨 | NOT_FOUND`);
      return res.status(404).json({
        message: 'Data Update By Id: FAILED 🚨',
        data: null,
      });
    }

    await docRef.update({ type, data, metadata });

    const updatedDoc = await docRef.get();
    logger.info(`DATA_UPDATE | SUCCESS 🚀 | [id = ${updatedDoc.id}]`);
    res.status(200).json({
      message: 'Data Update By Id: SUCCESS 🚀',
      data: { id: updatedDoc.id, ...updatedDoc.data() },
    });
  } catch (error) {
    logger.error(`DATA_UPDATE | FAILED 🚨`, `${error.message}`, { error });
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
exports.deleteData = async (req, res) => {
  try {
    const docRef = FirestoreDB.collection(COLLECTION_NAME).doc(req.params?.id);
    const doc = await docRef.get();

    logger.http(`DELETE: /api/v1/data/${req.params.id} - IP: ${req.ip}`);

    if (!doc.exists) {
      logger.warn(`DATA_DELETION | FAILED 🚨 | NOT_FOUND`);
      return res.status(404).json({
        message: 'Data Deletion By Id: FAILED 🚨',
        data: null,
      });
    }

    await docRef.delete();
    logger.info(`DATA_DELETION | SUCCESS 🚀 | [id = ${req.params.id}]`);
    res.status(200).json({
      message: 'Data Deletion By Id: SUCCESS 🚀',
      data: { id: req.params?.id, ...doc.data() },
    });
  } catch (error) {
    logger.error(`DATA_DELETION | FAILED 🚨`, `${error.message}`, { error });
    res.status(500).json({
      message: 'Data Deletion By Id: FAILED 🚨',
      error: error?.message || 'Unable to delete data by id 😢',
    });
  }
};
