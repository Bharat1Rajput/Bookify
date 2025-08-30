import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
<<<<<<< HEAD
import Signup from './pages/Signup';
import Login from './pages/Login';
import UserDashboard from './pages/userDashboard';
import ProviderDashboard from './pages/providerDashboard';
import AppointmentLanding from './pages/landingPage';
=======
import Signup from './pages/signup';
import Login from './pages/login';
import CreateSlot from './pages/CreateSlot';
import ViewSlots from './pages/ViewSlot';
import EditSlot from './pages/EditSlot';
import Dashboard from './pages/Dashboard';
import AvailableSlots from './pages/AvailableSlots';
import MyBookings from './pages/BookedSlots';
>>>>>>> e5532fcae28cb6895765d3fe8da0b958f72e1878
const App = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<AppointmentLanding/>} />
=======
        
>>>>>>> e5532fcae28cb6895765d3fe8da0b958f72e1878
        {/* Signup page */}
        <Route path="/signup" element={<Signup />} />
        {/* Login page */}
        <Route path="/login" element={<Login />} />
<<<<<<< HEAD

        {/* Dashboard page */}
        <Route path="/dashboard" element={<UserDashboard/>} />
        <Route path="/prov-dashboard" element={<ProviderDashboard/>} />
=======
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
        <Route path="/dashboard" element={<Dashboard />} />
>>>>>>> e5532fcae28cb6895765d3fe8da0b958f72e1878


        

      </Routes>
    </BrowserRouter>
  );
};

export default App;
