import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/login';
import CreateSlot from './pages/CreateSlot';
import ViewSlots from './pages/ViewSlot';
import EditSlot from './pages/EditSlot';
import UserDashboard from './pages/userDashboard';
import ProviderDashboard from './pages/providerDashboard';
import AvailableSlots from './pages/AvailableSlots';
import MyBookings from './pages/BookedSlots';
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
        {/* Slot creation page */}
        <Route path="/createslot" element={<CreateSlot/> } />
        {/* slot viewing page  */}
        <Route path = "/myslots" element={<ViewSlots />} /> 
        {/* Edit slot page */}
        <Route path="/editslot/:id" element={<EditSlot />} />
        {/* Available slots page */}
        <Route path="/availableslots" element={<AvailableSlots />} />
        {/* My bookings page */}
        <Route path="/mybookings" element={<MyBookings />} />

        {/* Dashboard page */}
        <Route path="/dashboard" element={<UserDashboard/>} />
        <Route path="/prov-dashboard" element={<ProviderDashboard/>} />


        

      </Routes>
    </BrowserRouter>
  );
};

export default App;
