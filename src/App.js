import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TimerStatus from "./pages/TimerStatus";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<TimerStatus />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
