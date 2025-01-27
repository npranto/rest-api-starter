// Handle all CRUD operations related to data here...
const Data = require('../models/dataModel');

// create
exports.createData = async (req, res) => {
  try {
    const { type, data, metadata } = req.body || {};
    const newData = new Data({
      type,
      data,
      metadata,
    });
    await newData.save();
    res.status(201).json({
      message: 'Data Creation: SUCCESS 🚀',
      data: newData,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Data Creation: FAILED 🚨',
      error: error?.message || 'Unable to create data 😢',
    });
  }
};

// read (by type)
exports.getAllData = async (req, res) => {
  try {
    const filter = req.query?.type ? { type: req.query.type } : {};
    const allData = await Data.find(filter);
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

// read (by id)
exports.getData = async (req, res) => {
  try {
    const data = await Data.findById(req.params?.id);
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

// update (patch only)
exports.updateData = async (req, res) => {
  try {
    const { type, data, metadata } = req.body || {};
    const updatedData = await Data.findByIdAndUpdate(
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

exports.deleteData = async (req, res) => {
  try {
    const deletedData = Data.findByIdAndDelete(req.params?.id);
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
