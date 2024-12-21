import React, { useEffect, useState } from 'react';
import { getTimerStatus, endTimer, getUser } from '../services/api';

const TimerStatus = () => {
  const [status, setStatus] = useState(null);
  const [canId, setCanId] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();
        setCanId(response.data.can_id);
      } catch (error) {
        alert('Session expired. Please log in again.');
        window.location.href = '/'; // Redirect to login
      }
    };
    fetchUser();
  }, []);

  const fetchTimerStatus = async () => {
    try {
      const response = await getTimerStatus(canId);
      setStatus(response.data);
    } catch {
      alert('No active timer found.');
      setStatus(null);
    }
  };

  const handleEnd = async () => {
    try {
      await endTimer(canId);
      alert('Timer ended successfully.');
      fetchTimerStatus();
    } catch (error) {
      alert('Failed to end timer.');
    }
  };

  useEffect(() => {
    if (canId) fetchTimerStatus();
  }, [canId]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Timer Status</h1>
      {status ? (
        <div>
          <p>Table ID: {status.table_id}</p>
          <p>Remaining Time: {status.remaining_time}s</p>
        </div>
      ) : (
        <p>No active timer.</p>
      )}
      <button
        onClick={fetchTimerStatus}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4"
      >
        Refresh Timer Status
      </button>
      <button
        onClick={handleEnd}
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mt-4 ml-2"
      >
        End Timer
      </button>
    </div>
  );
};

export default TimerStatus;
