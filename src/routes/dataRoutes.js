const express = require('express');
const dataController = require('../controllers/dataController');

const router = express.Router();

/**
 * POST /api/v1/data
 * Creates a new data entry.
 *
 * @route POST /api/v1/data
 * @group Data - Operations related to data
 * @param {Data.model} data.body - The data object to be created
 * @returns {object} 201 - The newly created data object
 * @returns {Error} 400 - Bad Request if data creation fails
 */
router.post('/', dataController.createData);

/**
 * GET /api/v1/data
 * Retrieves all data entries, optionally filtered by type.
 *
 * @route GET /api/v1/data
 * @group Data - Operations related to data
 * @param {string} type.query - The type to filter data (optional)
 * @returns {object} 200 - An array of data objects
 * @returns {Error} 500 - Internal Server Error if data retrieval fails
 */
router.get('/', dataController.getAllData);

/**
 * GET /api/v1/data/{id}
 * Retrieves a specific data entry by its ID.
 *
 * @route GET /api/v1/data/{id}
 * @group Data - Operations related to data
 * @param {string} id.path - The ID of the data entry to retrieve
 * @returns {object} 200 - The requested data object
 * @returns {Error} 404 - Not Found if data with the specified ID doesn't exist
 * @returns {Error} 500 - Internal Server Error if data retrieval fails
 */
router.get('/:id', dataController.getData);

/**
 * PATCH /api/v1/data/{id}
 * Updates a data entry by its ID.
 *
 * @route PATCH /api/v1/data/{id}
 * @group Data - Operations related to data
 * @param {string} id.path - The ID of the data entry to update
 * @param {Data.model} data.body - The updated data object
 * @returns {object} 200 - The updated data object
 * @returns {Error} 404 - Not Found if data with the specified ID doesn't exist
 * @returns {Error} 500 - Internal Server Error if data update fails
 */
router.patch('/:id', dataController.updateData);

/**
 * DELETE /api/v1/data/{id}
 * Deletes a data entry by its ID.
 *
 * @route DELETE /api/v1/data/{id}
 * @group Data - Operations related to data
 * @param {string} id.path - The ID of the data entry to delete
 * @returns {object} 200 - The deleted data object
 * @returns {Error} 404 - Not Found if data with the specified ID doesn't exist
 * @returns {Error} 500 - Internal Server Error if data deletion fails
 */
router.delete('/:id', dataController.deleteData);

module.exports = router;
