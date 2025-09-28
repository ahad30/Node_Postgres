const {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} = require('../models/itemModel');

const getItems = async (req, res) => {
  try {
    const items = await getAllItems();
    res.json({data:items});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getItem = async (req, res) => {
  try {
    const item = await getItemById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addItem = async (req, res) => {
  try {
    const { name, quantity, price } = req.body;
    if(!name || !quantity || !price){
        return res.status(400).json({error: 'All fields are required'})

    }
    const newItem = await createItem(name, quantity, price);
    res.status(201).json({data : newItem});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const editItem = async (req, res) => {
  try {
    const { name, quantity, price } = req.body;
    const updatedItem = await updateItem(req.params.id, name, quantity, price);
    if (!updatedItem) return res.status(404).json({ error: 'Item not found' });
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removeItem = async (req, res) => {
  try {
    await deleteItem(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getItems, getItem, addItem, editItem, removeItem };