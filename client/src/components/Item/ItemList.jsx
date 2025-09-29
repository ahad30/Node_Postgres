import { useEffect, useState } from "react";
import axios from "axios";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/items/${editingItemId.id}`, {
        name,
        quantity,
        price,
      })
      .then((res) => {
        setItems(
          items.map((item) => (item.id === editingItemId.id ? res.data : item))
        );
        setEditingItemId(null);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/items")
      .then((res) => {
        setItems(res?.data?.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleEdit = (item) => {
    console.log(item);
    setEditingItemId(item);
    setName(item.name);
    setQuantity(item.quantity);
    setPrice(item.price);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/items/${id}`)
      .then(() => setItems(items.filter((item) => item.id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Inventory Items</h2>


      {editingItemId ? (
        <form
          onSubmit={handleUpdate}
          className="p-4 bg-gray-100 rounded flex items-center space-x-4 mb-5"
        >
          <h2 className="text-xl font-bold">Edit Item {editingItemId.id}</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block mb-2 p-2 border"
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="block mb-2 p-2 border"
            required
          />
          <input
            type="number"
            step="0.01"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="block mb-2 p-2 border"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => setEditingItemId(null)}
          >
            Cancle
          </button>
        </form>
      ) :
       (
              <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="text-center">
              <td className="py-2 px-4 border-b">{item.id}</td>
              <td className="py-2 px-4 border-b">{item.name}</td>
              <td className="py-2 px-4 border-b">{item.quantity}</td>
              <td className="py-2 px-4 border-b">${item.price}</td>
              <td className="py-2 px-4 border-b flex space-x-2 justify-center">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       )
      }
    </div>
  );
};

export default ItemList;
