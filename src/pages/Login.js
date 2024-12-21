import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

const Login = () => {
  const [canId, setCanId] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = isAdmin
        ? { is_admin: true, password } // Admin login
        : { can_id: canId, is_admin: false }; // User login
      await login(payload);

      // Navigate based on admin status
      if (isAdmin) {
        console.log("user is admin")
        navigate('/admin-dashboard');
      } else {
        navigate('/timer-status');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form className="bg-white p-8 rounded shadow-md" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        {!isAdmin && (
          <input
            type="text"
            placeholder="CAN ID"
            value={canId}
            onChange={(e) => setCanId(e.target.value)}
            className="border rounded p-2 w-full mb-4"
            required
          />
        )}

        {isAdmin && (
          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded p-2 w-full mb-4"
            required
          />
        )}

        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => {
              setIsAdmin(e.target.checked);
              setPassword('');
              setCanId('');
            }}
            className="mr-2"
          />
          Log in as Admin
        </label>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
