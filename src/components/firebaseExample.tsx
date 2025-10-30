import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, getDocs, Timestamp } from 'firebase/firestore';

interface Item {
  id?: string;
  name: string;
  timestamp: Date; // Keep as Date
}

const FirebaseExample: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState('');

  const fetchItems = async () => {
    const querySnapshot = await getDocs(collection(db, 'items'));
    const itemsData: Item[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      itemsData.push({ 
        id: doc.id, 
        name: data.name,
        timestamp: data.timestamp.toDate() // Convert to Date here
      } as Item);
    });
    setItems(itemsData);
  };

  const addItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.trim() === '') return;

    try {
      await addDoc(collection(db, 'items'), {
        name: newItem,
        timestamp: Timestamp.now(), // Still use Timestamp for storage
      });
      setNewItem('');
      fetchItems();
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Firebase Firestore Example</h2>
      
      <form onSubmit={addItem} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter item name"
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button type="submit" style={{ padding: '5px 10px' }}>
          Add Item
        </button>
      </form>

      <div>
        <h3>Items:</h3>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name} - {item.timestamp.toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FirebaseExample;