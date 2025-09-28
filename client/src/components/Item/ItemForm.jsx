import { useState } from 'react';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
const ItemForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/items', { name, quantity, price })
      .then(res => {
        onAdd(res.data);
        setName('');
        setQuantity(0);
        setPrice(0);
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded flex items-center space-x-4 mb-5">
      <h2 className="text-xl font-bold">Add Item</h2>
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="block mb-2 p-2 border" required />
      <input type="number" placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} className="block mb-2 p-2 border" required />
      <input type="number" step="0.01" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} className="block mb-2 p-2 border" required />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
    </form>
  );
};

export default ItemForm;