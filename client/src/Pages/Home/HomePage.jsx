import { useState } from 'react';
import ItemForm from '../../components/Item/ItemForm';
import ItemList from '../../components/Item/ItemList';

function HomePage() {
  const [itemsUpdated, setItemsUpdated] = useState(false);

  const handleAdd = () => setItemsUpdated(!itemsUpdated);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Inventory ERP</h1>
      <ItemForm onAdd={handleAdd} />
      <ItemList key={itemsUpdated} /> 
    </div>
  );
}

export default HomePage;