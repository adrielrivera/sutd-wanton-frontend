import React from 'react';
import Login from './pages/Login';
import TimerStatus from './pages/TimerStatus';
import AdminDashboard from './pages/AdminDashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/timer-status" element={<TimerStatus />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
