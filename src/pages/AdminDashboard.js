import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://127.0.0.1:5000");

function AdminDashboard() {
  const [tables, setTables] = useState({});
  const [realTimeUpdates, setRealTimeUpdates] = useState([]);

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

  useEffect(() => {
    fetchTablesStatus();

    // Listen for real-time updates
    socket.on("timer_started", (data) => {
      setRealTimeUpdates((prev) => [
        ...prev,
        `Timer started: CAN ID ${data.can_id}, Table ${data.table_id}`
      ]);
      fetchTablesStatus();
    });

    socket.on("timer_ended", (data) => {
      setRealTimeUpdates((prev) => [
        ...prev,
        `Timer ended for CAN ID: ${data.can_id}`
      ]);
      fetchTablesStatus();
    });

    return () => {
      socket.off("timer_started");
      socket.off("timer_ended");
    };
  }, []);

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
                  <strong>Remaining Time:</strong> {info.remaining_time} seconds
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
        <div className="mt-6">
          <h2 className="text-lg font-bold">Real-Time Updates</h2>
          <ul>
            {realTimeUpdates.map((update, index) => (
              <li key={index} className="mt-2 text-sm text-gray-700">
                {update}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
