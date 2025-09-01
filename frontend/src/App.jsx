import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import UserDashboard from './pages/userDashboard';
import ProviderDashboard from './pages/providerDashboard';
import AppointmentLanding from './pages/landingPage';
import BookifyPolicy from './pages/Policy';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  const role = localStorage.getItem('role');  
  
  if(children.type === ProviderDashboard && role !== 'serviceProvider') {
    return <Navigate to="/" />;
  }
  if(children.type === UserDashboard && role !== 'user') {
    return <Navigate to="/" />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};



const App = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppointmentLanding />} />
        {/* Signup page */}
        <Route path="/signup" element={<Signup />} />
        {/* Login page */}
        <Route path="/login" element={<Login />} />
        <Route path="/policy" element={<BookifyPolicy />} />

        {/* Dashboard page */}
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>   
        } />


        <Route path="/prov-dashboard" element={
          <ProtectedRoute>
          <ProviderDashboard/>
          </ProtectedRoute> 
          } />


        

      </Routes>
    </BrowserRouter>
  );
};

export default App;
