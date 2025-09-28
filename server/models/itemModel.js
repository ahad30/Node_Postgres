const pool = require('../db/db');

// Basic queries wrapped in functions (SRP: each does one thing)
const getAllItems = async () => {
  const result = await pool.query('SELECT * FROM items');
  return result.rows;
};

const getItemById = async (id) => {
  const result = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
  return result.rows[0];
};

const createItem = async (name, quantity, price) => {
  const result = await pool.query(
    'INSERT INTO items (name, quantity, price) VALUES ($1, $2, $3) RETURNING *',
    [name, quantity, price]
  );
  return result.rows[0];
};

const updateItem = async (id, name, quantity, price) => {
  const result = await pool.query(
    'UPDATE items SET name = $1, quantity = $2, price = $3 WHERE id = $4 RETURNING *',
    [name, quantity, price, id]
  );
  return result.rows[0];
};

const deleteItem = async (id) => {
  await pool.query('DELETE FROM items WHERE id = $1', [id]);
};

module.exports = { getAllItems, getItemById, createItem, updateItem, deleteItem };