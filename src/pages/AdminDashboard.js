import React, { useState } from 'react';
import { updateTimerDuration } from '../services/api';

const AdminDashboard = () => {
  const [duration, setDuration] = useState('');

  const handleUpdate = async () => {
    try {
      await updateTimerDuration(parseInt(duration));
      alert('Timer duration updated');
    } catch (error) {
      alert('Failed to update timer duration');
    }
  };

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
    </div>
  );
};

export default AdminDashboard;
