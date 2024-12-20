import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminDashboard() {
  const [tables, setTables] = useState({});
  const [timerDuration, setTimerDuration] = useState(0);
  const [newDuration, setNewDuration] = useState("");

  useEffect(() => {
    fetchTablesStatus();
    fetchTimerDuration();
  }, []);

  const fetchTablesStatus = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/admin/tables_status"
      );
      setTables(response.data);
    } catch (err) {
      console.error("Error fetching table status:", err);
    }
  };

  const fetchTimerDuration = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/admin/timer_duration"
      );
      setTimerDuration(response.data.timer_duration);
    } catch (err) {
      console.error("Error fetching timer duration:", err);
    }
  };

  const updateTimerDuration = async () => {
    try {
      await axios.post("http://127.0.0.1:5000/admin/timer_duration", {
        duration: parseInt(newDuration),
      });
      fetchTimerDuration();
      setNewDuration("");
    } catch (err) {
      console.error("Error updating timer duration:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Admin Dashboard
        </h1>
        <h2 className="text-xl font-bold mb-4">Tables Status</h2>
        {Object.keys(tables).length > 0 ? (
          <ul className="space-y-4">
            {Object.entries(tables).map(([canId, info]) => (
              <li
                key={canId}
                className="p-4 bg-gray-50 border rounded-lg shadow-sm"
              >
                <p>
                  <strong>Table:</strong> {info.table_id}
                </p>
                <p>
                  <strong>Remaining Time:</strong> {info.remaining_time}{" "}
                  seconds
                </p>
                <p>
                  <strong>CAN ID:</strong> {canId}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No active reservations.</p>
        )}
        <h2 className="text-xl font-bold mt-6">Timer Duration</h2>
        <p className="mb-2">Current Duration: {timerDuration} seconds</p>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Enter new duration"
            value={newDuration}
            onChange={(e) => setNewDuration(e.target.value)}
            className="flex-1 p-2 border rounded-lg"
          />
          <button
            onClick={updateTimerDuration}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
