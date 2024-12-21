import React, { useEffect, useState } from 'react';
import { getTimerStatus, endTimer, getUser, countOccupiedTables, setTableVacant } from '../services/api';

const TimerStatus = () => {
  const [status, setStatus] = useState(null); // Timer status
  const [canId, setCanId] = useState(''); // User CAN ID
  const [occupiedTables, setOccupiedTables] = useState(0); // Number of occupied tables
  const [tableId, setTableId] = useState(null); // Current table ID

  // Fetch user information
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

  // Fetch the timer status for the user
  const fetchTimerStatus = async () => {
    try {
      const response = await getTimerStatus(canId);
      setStatus(response.data);
      setTableId(response.data.table_id); // Store the table ID separately
    } catch {
      setStatus(null); // No active timer
    }
  };

  // Fetch the count of occupied tables
  const fetchOccupiedTables = async () => {
    try {
      const response = await countOccupiedTables();
      setOccupiedTables(response.data.occupied_tables);
    } catch (error) {
      alert('Failed to fetch occupied tables.');
    }
  };

  // Handle ending the timer
  const handleEndTimer = async () => {
    try {
      await endTimer(canId);
      alert('Timer ended successfully.');
      fetchTimerStatus(); // Refresh the timer status
    } catch (error) {
      alert('Failed to end timer.');
    }
  };

  // Handle marking the table as vacant
  const handleLeaveTable = async () => {
    if (!tableId) {
      alert('No table is currently occupied.');
      return;
    }

    try {
      await setTableVacant(tableId);
      alert(`Table ${tableId} is now vacant.`);
      setTableId(null); // Clear the table ID
      fetchOccupiedTables(); // Refresh the number of occupied tables
    } catch (error) {
      alert('Failed to leave the table.');
    }
  };

  // Fetch initial data when CAN ID is available
  useEffect(() => {
    if (canId) {
      fetchTimerStatus();
      fetchOccupiedTables();
    }
  }, [canId]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Timer Status</h1>
      {status ? (
        <div>
          <p>Table ID: {status.table_id}</p>
          <p>Remaining Time: {status.remaining_time}s</p>
        </div>
      ) : tableId ? (
        <div>
          <p>Table ID: {tableId}</p>
          <p>You are still occupying this table.</p>
        </div>
      ) : (
        <p>No active timer and no table is occupied.</p>
      )}
      <p className="mt-4">Occupied Tables: {occupiedTables}</p>
      <button
        onClick={fetchTimerStatus}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4"
      >
        Refresh Timer Status
      </button>
      <button
        onClick={fetchOccupiedTables}
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mt-4 ml-2"
      >
        Refresh Occupied Tables
      </button>
      {status && (
        <button
          onClick={handleEndTimer}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mt-4 ml-2"
        >
          End Timer
        </button>
      )}
      {tableId && (
        <button
          onClick={handleLeaveTable}
          className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 mt-4 ml-2"
        >
          Leave Table
        </button>
      )}
    </div>
  );
};

export default TimerStatus;
