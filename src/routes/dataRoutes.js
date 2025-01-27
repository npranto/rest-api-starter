// Define all routes related to data here...

const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.post('/', dataController.createData);
router.get('/', dataController.getAllData);
router.get('/:id', dataController.getData);
router.patch('/:id', dataController.updateData);
router.delete('/:id', dataController.deleteData);

module.exports = router;
