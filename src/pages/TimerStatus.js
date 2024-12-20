import React, { useState } from "react";
import axios from "axios";

function TimerStatus() {
  const [canId, setCanId] = useState("");
  const [timer, setTimer] = useState(null);
  const [error, setError] = useState("");

  const fetchTimerStatus = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/get_timer_status/${canId}`
      );
      setTimer(response.data);
      setError("");
    } catch (err) {
      setError(err.response.data.error);
      setTimer(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Check Timer Status
        </h1>
        <input
          type="text"
          placeholder="Enter CAN ID"
          value={canId}
          onChange={(e) => setCanId(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4"
        />
        <button
          onClick={fetchTimerStatus}
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Check Timer
        </button>
        {timer && (
          <div className="mt-4 bg-green-100 p-4 rounded-lg">
            <p>
              <strong>Table ID:</strong> {timer.table_id}
            </p>
            <p>
              <strong>Remaining Time:</strong> {timer.remaining_time} seconds
            </p>
          </div>
        )}
        {error && (
          <div className="mt-4 bg-red-100 p-4 rounded-lg text-red-700">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default TimerStatus;
