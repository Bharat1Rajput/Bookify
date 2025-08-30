import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import UserDashboard from './pages/userDashboard';
import ProviderDashboard from './pages/providerDashboard';
import AppointmentLanding from './pages/landingPage';
const App = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppointmentLanding/>} />
        {/* Signup page */}
        <Route path="/signup" element={<Signup />} />
        {/* Login page */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard page */}
        <Route path="/dashboard" element={<UserDashboard/>} />
        <Route path="/prov-dashboard" element={<ProviderDashboard/>} />


        

      </Routes>
    </BrowserRouter>
  );
};

export default App;
