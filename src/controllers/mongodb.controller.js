const { MongooseDataModel } = require('../config/mongodb.config');
const logger = require('../middlewares/logger.middleware');

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
exports.createData = async (req, res) => {
  try {
    const { type, data, metadata = {} } = req.body || {};
    logger.http(`POST: /api/v1/data - IP: ${req.ip}`);
    logger.info(
      `REQUEST_BODY: [type: ${type}, data: ${JSON.stringify(data)}, metadata: ${JSON.stringify(metadata)}]`
    );
    const newData = new MongooseDataModel({
      type,
      data,
      metadata,
    });
    await newData.save();
    logger.info(`DATA_CREATION | SUCCESS 🚀 | [_id = ${newData._id}]`);
    res.status(201).json({
      message: 'Data Creation: SUCCESS 🚀',
      data: newData,
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
 * Responds with the filtered data or an error message if retrieval fails.
 *
 * @async
 * @function getAllData
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 * @throws {Error} Logs error if data retrieval fails.
 */
exports.getAllData = async (req, res) => {
  try {
    logger.http(`GET: /api/v1/data - IP: ${req.ip}`);

    const filter = req.query?.type ? { type: req.query.type } : {};
    logger.info(`REQUEST_QUERY: [type: ${req.query?.type || 'N/A'}]`);

    const allData = await MongooseDataModel.find(filter);
    logger.info(
      `DATA_RETRIEVAL | SUCCESS 🚀 | Retrieved ${allData.length} records | [${JSON.stringify(allData.map((e) => e._id))}]`
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
    logger.http(`GET: /api/v1/data/${req.params.id} - IP: ${req.ip}`);

    const data = await MongooseDataModel.findById(req.params?.id);

    if (!data) {
      logger.warn(`DATA_RETRIEVAL | FAILED 🚨 | NOT_FOUND`);
      return res.status(404).json({
        message: 'Data Retrieval By Id: FAILED 🚨',
        data: null,
      });
    }

    logger.info(`DATA_RETRIEVAL | SUCCESS 🚀 | [_id = ${data._id}]`);
    res.status(200).json({
      message: 'Data Retrieval By Id: SUCCESS 🚀',
      data,
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
    const { type, data, metadata = {} } = req.body || {};

    logger.http(`PATCH: /api/v1/data/${req.params.id} - IP: ${req.ip}`);
    logger.info(
      `REQUEST_BODY: [type: ${type}, data: ${JSON.stringify(data)}, metadata: ${JSON.stringify(metadata)}]`
    );

    const updatedData = await MongooseDataModel.findByIdAndUpdate(
      req.params?.id,
      { $set: { type, data, metadata } },
      { new: true, runValidators: true }
    );

    if (!updatedData) {
      logger.warn(`DATA_UPDATE | FAILED 🚨 | NOT_FOUND`);
      return res.status(404).json({
        message: 'Data Update By Id: FAILED 🚨',
        data: null,
      });
    }

    logger.info(`DATA_UPDATE | SUCCESS 🚀 | [_id = ${updatedData._id}]`);
    res.status(200).json({
      message: 'Data Update By Id: SUCCESS 🚀',
      data: updatedData,
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
    logger.http(`DELETE: /api/v1/data/${req.params.id} - IP: ${req.ip}`);

    const deletedData = await MongooseDataModel.findByIdAndDelete(
      req.params?.id
    );

    if (!deletedData) {
      logger.warn(`DATA_DELETION | FAILED 🚨 | NOT_FOUND`);
      return res.status(404).json({
        message: 'Data Deletion By Id: FAILED 🚨',
        data: null,
      });
    }

    logger.info(`DATA_DELETION | SUCCESS 🚀 | [_id = ${deletedData._id}]`);
    res.status(200).json({
      message: 'Data Deletion By Id: SUCCESS 🚀',
      data: deletedData,
    });
  } catch (error) {
    logger.error(`DATA_DELETION | FAILED 🚨`, `${error.message}`, { error });
    res.status(500).json({
      message: 'Data Deletion By Id: FAILED 🚨',
      error: error?.message || 'Unable to delete data by id 😢',
    });
  }
};
