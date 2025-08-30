import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Appointment Dashboard</h1>
        <nav className="space-y-4">
          <Link
            to="/login"
            className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="block w-full text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded transition"
          >
            Signup
          </Link>
          <Link
            to="/slot"
            className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition"
          >
            Create Slot
          </Link>
          <Link
            to="/my-bookings"
            className="block w-full text-center bg-purple-600 hover:bg-purple-700 text-white py-2 rounded transition"
          >
            My Bookings
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Dashboard;
