import React, { useState, useEffect } from 'react';
import { updateTimerDuration, countOccupiedTables } from '../services/api';

const AdminDashboard = () => {
  const [duration, setDuration] = useState('');
  const [occupiedTables, setOccupiedTables] = useState(0);

  const handleUpdate = async () => {
    try {
      await updateTimerDuration(parseInt(duration));
      alert('Timer duration updated');
    } catch (error) {
      alert('Failed to update timer duration');
    }
  };

  const fetchOccupiedTables = async () => {
    try {
      const response = await countOccupiedTables();
      setOccupiedTables(response.data.occupied_tables);
    } catch (error) {
      alert('Failed to fetch occupied tables.');
    }
  };

  useEffect(() => {
    fetchOccupiedTables(); // Fetch on load
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <input
        type="number"
        placeholder="New Timer Duration (seconds)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="border rounded p-2 mb-4"
      />
      <button
        onClick={handleUpdate}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Update Duration
      </button>
      <p className="mt-4">Occupied Tables: {occupiedTables}</p>
      <button
        onClick={fetchOccupiedTables}
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mt-4"
      >
        Refresh Occupied Tables
      </button>
    </div>
  );
};

export default AdminDashboard;
