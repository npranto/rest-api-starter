const { db } = require('../config/firestore.config');

const COLLECTION_NAME = 'datas';

const createData = async (req, res) => {
  try {
    const { type, data, metadata = {} } = req.body || {};
    const newData = { type, data, metadata };

    const docRef = await db.collection(COLLECTION_NAME).add({ ...newData });
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
 * Retrieves all documents in Firestore.
 */
const getAllData = async (req, res) => {
  try {
    const filter = req.query?.type ? { type: req.query.type } : {};
    let query = db.collection(COLLECTION_NAME);

    // Add filter condition if `type` exists
    if (filter.type) {
      query = query.where('type', '==', filter.type);
    }

    // Execute query and map documents
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
 * Retrieves a single document by ID.
 */
const getData = async (id) => {
  const doc = await db.collection(COLLECTION_NAME).doc(id).get();
  return doc.exists ? { id: doc.id, ...doc.data() } : null;
};

/**
 * Updates an existing document.
 */
const updateData = async (id, data) => {
  await db.collection(COLLECTION_NAME).doc(id).update(data);
  return { id, ...data };
};

/**
 * Deletes a document by ID.
 */
const deleteData = async (id) => {
  await db.collection(COLLECTION_NAME).doc(id).delete();
  return { id };
};

module.exports = {
  createData,
  getAllData,
  getData,
  updateData,
  deleteData,
};
