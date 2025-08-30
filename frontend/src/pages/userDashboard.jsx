import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, LogOut, CheckCircle, Circle } from 'lucide-react';
import axios from 'axios';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [myBookings, setMyBookings] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
  try {
     const token = localStorage.getItem("token");
     const name = localStorage.getItem("name");
     setUser({ name });
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // Fetch user info, bookings, and slots in parallel
    const [ slotsResponse,bookingsResponse] = await Promise.all([
      axios.get('/api/slot/available'), 
      axios.get('/api/booking/view')
      
    ]);

    // Responses are already parsed in axios (no need .json())
    setAvailableSlots(slotsResponse.data);
    setMyBookings(bookingsResponse.data);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
  } finally {
    setLoading(false);
  }
};

const handleBookSlot = async (slotId) => {
  try {
    const token = localStorage.getItem('token');
    
    const response = await axios.post(
      `/api/booking/book/${slotId}`,
      {},  
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('Booking response:', response.data);

    if (response.status === 200 || response.status === 201) {
      // Refresh data after booking
      fetchDashboardData();
      alert('Slot booked successfully!');
    } else {
      throw new Error('Booking failed');
    }
  } catch (error) {
    console.error('Error booking slot:', error);
    alert('Failed to book slot. Please try again.');
  }
};

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (time) => {
    return new Date(`2000-01-01 ${time}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

 if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
        <p className="text-purple-700 font-medium">
          This page will load in a few seconds...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-full">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}!</h1>
                <p className="text-sm text-indigo-600 font-medium">User Dashboard</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8 grid lg:grid-cols-2 gap-8">
        {/* My Bookings Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 h-fit">
          <div className="flex items-center space-x-3 mb-6">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <h2 className="text-xl font-bold text-gray-900">My Bookings</h2>
            <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
              {myBookings.length}
            </span>
          </div>

          {myBookings.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No bookings yet</p>
              <p className="text-gray-400 text-sm">Book your first appointment below!</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {myBookings.map((booking) => (
                <div key={booking._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-semibold text-gray-900">
                        {booking.slotId?.providerId?.name || 'Provider'}
                      </span>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      Confirmed
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(booking.bookingDate)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>
                        {formatTime(booking.slotId?.startTime)} - {formatTime(booking.slotId?.endTime)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Available Slots Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Circle className="h-6 w-6 text-blue-500" />
            <h2 className="text-xl font-bold text-gray-900">Available Slots</h2>
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {availableSlots.length}
            </span>
          </div>

          {availableSlots.length === 0 ? (
            <div className="text-center py-12">
              <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No available slots</p>
              <p className="text-gray-400 text-sm">Check back later for new appointments!</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {availableSlots.map((slot) => (
                <div key={slot._id } className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:border-blue-300">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="font-semibold text-gray-900">
                        {slot.providerId?.name || 'Available Provider'}
                      </span>
                    </div>
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                      Available
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(slot.date)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{formatTime(slot.startTime)} - {formatTime(slot.endTime)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBookSlot(slot._id)}
                    className="cursor-pointer w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
                  >
                    Book This Slot
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="max-w-6xl mx-auto px-6 pb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{myBookings.length}</div>
              <div className="text-sm text-gray-500">Total Bookings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{availableSlots.length}</div>
              <div className="text-sm text-gray-500">Available Now</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {myBookings.filter(b => new Date(b.bookingDate) >= new Date()).length}
              </div>
              <div className="text-sm text-gray-500">Upcoming</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">User</div>
              <div className="text-sm text-gray-500">Account Type</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;