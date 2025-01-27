const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    data: { type: mongoose.Schema.Types.Mixed, required: true },
    metadata: { type: Object },
  },
  { timestamps: true }
);

const dataSchemaModel = mongoose.model('Data', dataSchema);

module.exports = dataSchemaModel;
