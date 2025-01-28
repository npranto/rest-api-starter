const mongoose = require('mongoose');

/**
 * Schema definition for data model.
 * Defines the structure of the data object with type, data, and metadata fields.
 *
 * @typedef {Object} Data
 * @property {String} type - The type of the data (required).
 * @property {Object} data - The actual data content (required).
 * @property {Object} metadata - Optional metadata related to the data.
 */

/**
 * Data schema for storing data in MongoDB.
 * Includes timestamps for creation and updates.
 *
 * @type {mongoose.Schema}
 */
const dataSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    data: { type: mongoose.Schema.Types.Mixed, required: true },
    metadata: { type: Object },
  },
  { timestamps: true }
);

/**
 * Mongoose model for data schema.
 * Provides an interface for interacting with the 'Data' collection in MongoDB.
 *
 * @type {mongoose.Model<Data>}
 */
const DataModel = mongoose.model('Data', dataSchema);

module.exports = DataModel;
