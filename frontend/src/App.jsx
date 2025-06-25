import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/login';
import CreateSlot from './pages/CreateSlot';
import ViewSlots from './pages/ViewSlot';
import EditSlot from './pages/EditSlot';
import Dashboard from './pages/Dashboard';
const App = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <BrowserRouter>
      <Routes>
        
        {/* Signup page */}
        <Route path="/signup" element={<Signup />} />
        {/* Login page */}
        <Route path="/login" element={<Login />} />
        {/* Slot creation page */}
        <Route path="/createslot" element={<CreateSlot/> } />
        {/* slot viewing page  */}
        <Route path = "/viewslots" element={<ViewSlots />} /> 
        {/* Edit slot page */}
        <Route path="/editslot/:id" element={<EditSlot />} />


        {/* Dashboard page */}
        <Route path="/dashboard" element={<Dashboard />} />


        

      </Routes>
    </BrowserRouter>
  );
};

export default App;
