import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-xl font-bold">iChope</h1>
        <div className="flex space-x-4">
          <Link to="/" className="hover:underline">
            Timer Status
          </Link>
          <Link to="/admin" className="hover:underline">
            Admin Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
