const express = require('express');
const dataController = require('../controllers/dataController');

const router = express.Router();

router.post('/', dataController.createData);
router.get('/', dataController.getAllData);
router.get('/:id', dataController.getData);
router.patch('/:id', dataController.updateData);
router.delete('/:id', dataController.deleteData);

module.exports = router;
