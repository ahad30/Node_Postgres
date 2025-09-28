    const express = require('express');
const {
  getItems,
  getItem,
  addItem,
  editItem,
  removeItem,
} = require('../controllers/itemController');

const router = express.Router();

router.get('/items', getItems);
router.get('/items/:id', getItem);
router.post('/items', addItem);
router.put('/items/:id', editItem);
router.delete('/items/:id', removeItem);

module.exports = router;