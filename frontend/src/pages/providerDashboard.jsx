import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  LogOut,
  Plus,
  Trash2,
  Users,
  Edit,
  Save,
  X,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import axios from "axios";

const ProviderDashboard = () => {
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [mySlots, setMySlots] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  const [newSlot, setNewSlot] = useState({
    date: "",
    startTime: "",
    endTime: "",
  });
  const [editFormData, setEditFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);
  
 const showNotification = (message, type = 'success') => {
  setNotification({ message, type });
  setTimeout(() => {
    setNotification(null);
  }, 3000);
};
  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      const name = localStorage.getItem("name");
      setUser({ name });
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const [slotsRes,bookingRes] = await Promise.all([
        axios.get("/api/slot/view"),
        axios.get("/api/booking/provider/bookings")


      ]);
      console.log(bookingRes.data[0]);

      setMySlots(slotsRes.data.filter(slot => !slot.isBooked));
      setMyBookings(bookingRes.data);
    } catch (err) {
      console.error("Failed to fetch dashboard data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSlot = async () => {
    if (!newSlot.date || !newSlot.startTime || !newSlot.endTime) {
      showNotification('All fields are required to create a slot.', 'error');
      return;
    }
    try {
  const token = localStorage.getItem("token");
  console.log("Creating slot with data:", newSlot);
  const response = await axios.post("/api/slot/create", newSlot, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  console.log("Create slot response:", response);
  
  // This will only run for successful responses (200-299)
  setNewSlot({ date: "", startTime: "", endTime: "" });
  setShowCreateForm(false);
  fetchDashboardData();
  showNotification(response.data.message || 'Slot created successfully!', 'success');
  
} catch (error) {
  console.error("Error creating slot:", error);
  
  // Handle 400 and other error status codes here
  if (error.response?.status === 400) {
    const errorMessage = error.response.data.message || "Start time must be before end time";
    showNotification(errorMessage, 'error');}
  else if (error.response?.status === 409) {
    const errorMessage = error.response.data.message || "you cannot create slot in past";
    showNotification(errorMessage, 'error');

  } else {
    const errorMessage = error.response?.data?.message || 'Failed to create slot. Please try again.';
    showNotification(errorMessage, 'error');
  }
}
  };

  const handleEditSlot = (slot) => {
    setEditingSlot(slot._id);
    setEditFormData({
      date: slot.date.split('T')[0], // Format date for input
      startTime: slot.startTime,
      endTime: slot.endTime,
    });
  };

  const handleUpdateSlot = async (slotId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`/api/slot/edit/${slotId}`,
        editFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    
      
      setEditingSlot(null);
      setEditFormData({ date: "", startTime: "", endTime: "" });
      fetchDashboardData();
      showNotification('Slot updated successfully!', 'success');
    } catch (err) {
      console.error("Update failed:", err);

      showNotification('Failed to update slot. Please try again.', 'error');}
  };



  const handleCancelEdit = () => {
    setEditingSlot(null);
    setEditFormData({ date: "", startTime: "", endTime: "" });
  };

  const handleDeleteSlot = async (slotId) => {
    // if slot is booked then it should not be deleted
    if(mySlots.find(slot => slot._id === slotId).isBooked){
      showNotification('Cannot delete a booked slot.', 'error');
      return;
    };
    if (window.confirm("Are you sure you want to delete this slot?")) {
    try {


        const token = localStorage.getItem("token");
        await axios.delete(`/api/slot/delete/${slotId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        fetchDashboardData();
        showNotification('Slot deleted successfully!', 'success');
      } catch (error) {
        console.error("Error deleting slot:", error);
        showNotification('Failed to delete slot. Please try again.', 'error');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (time) => {
    return new Date(`2000-01-01 ${time}`).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">

{notification && (
  <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
    notification.type === 'success' 
      ? 'bg-green-500 text-white' 
      : 'bg-red-500 text-white'
  }`}>
    <div className="flex items-center space-x-2">
      {notification.type === 'success' ? (
        <CheckCircle className="h-5 w-5" />
      ) : (
        <AlertCircle className="h-5 w-5" />
      )}
      <span className="font-medium">{notification.message}</span>
      <button 
        onClick={() => setNotification(null)}
        className="ml-auto hover:bg-white hover:bg-opacity-20 rounded p-1"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  </div>
)}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-full">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome, {user?.name}!
                </h1>
                <p className="text-sm text-purple-600 font-medium">
                  Service Provider Dashboard
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="cursor-pointer flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <Plus className="h-4 w-4" />
                <span>Create Slot</span>
              </button>
              <button
                onClick={handleLogout}
                className="cursor-pointer flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Create Slot Form */}
        {showCreateForm && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Create New Slot
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={newSlot.date}
                  onChange={(e) =>
                    setNewSlot({ ...newSlot, date: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  value={newSlot.startTime}
                  onChange={(e) =>
                    setNewSlot({ ...newSlot, startTime: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  value={newSlot.endTime}
                  onChange={(e) =>
                    setNewSlot({ ...newSlot, endTime: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="md:col-span-3 flex space-x-3">
                <button
                  onClick={handleCreateSlot}
                  className="cursor-pointer bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                >
                  Create Slot
                </button>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* My Slots Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Clock className="h-6 w-6 text-purple-500" />
              <h2 className="text-xl font-bold text-gray-900">My Slots</h2>
              <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                {mySlots.length}
              </span>
            </div>

            {mySlots.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No slots created yet</p>
                <p className="text-gray-400 text-sm">
                  Click "Create Slot" to get started!
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {mySlots.map((slot, index) => (
                  <div
                    key={slot._id || index}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                  >
                    {editingSlot === slot._id ? (
                      // Edit Form
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Date
                            </label>
                            <input
                              type="date"
                              value={editFormData.date}
                              onChange={(e) =>
                                setEditFormData({
                                  ...editFormData,
                                  date: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Start Time
                            </label>
                            <input
                              type="time"
                              value={editFormData.startTime}
                              onChange={(e) =>
                                setEditFormData({
                                  ...editFormData,
                                  startTime: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              End Time
                            </label>
                            <input
                              type="time"
                              value={editFormData.endTime}
                              onChange={(e) =>
                                setEditFormData({
                                  ...editFormData,
                                  endTime: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                            />
                          </div>
                        </div>
                        <div className="flex space-x-2 justify-end">
                          <button
                            onClick={() => handleUpdateSlot(slot._id)}
                            className="flex items-center space-x-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg transition-colors duration-200 text-sm"
                          >
                            <Save className="h-4 w-4" />
                            <span>Save</span>
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="flex items-center space-x-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded-lg transition-colors duration-200 text-sm"
                          >
                            <X className="h-4 w-4" />
                            <span>Cancel</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      // Display Mode
                      <>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                slot.isBooked ? "bg-red-500" : "bg-green-500"
                              }`}
                            ></div>
                            <span className="font-semibold text-gray-900">
                              Available
                            </span>
                          </div>
                          <div className="flex space-x-5">
                            <button
                              onClick={() => handleEditSlot(slot)}
                              className="cursor-pointer text-blue-500 hover:text-blue-700 transition-colors duration-200"
                              title="Edit Slot"
                            >
                              <Edit className="h-6 w-6" />
                            </button>
                            <div className="border-l border-gray-100"></div>
                            <button
                              onClick={() => handleDeleteSlot(slot._id)}
                              className="cursor-pointer text-red-500 hover:text-red-700 transition-colors duration-200"
                              title="Delete Slot"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                          
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(slot.date)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>
                              {formatTime(slot.startTime)} -{" "}
                              {formatTime(slot.endTime)}
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bookings Received Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <User className="h-6 w-6 text-blue-500" />
              <h2 className="text-xl font-bold text-gray-900">
                Bookings Received
              </h2>
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {myBookings.length}
              </span>
            </div>

            {myBookings.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No bookings yet</p>
                <p className="text-gray-400 text-sm">
                  Your slots will appear here when booked!
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {myBookings.map((booking, index) => (
                  <div
                    key={booking._id || index}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="font-semibold text-gray-900">
                          {booking.userId?.name || "Customer"}
                        </span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded capitalize ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-600' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                        booking.status === 'completed' ? 'bg-blue-100 text-blue-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {booking.status || 'Confirmed'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(booking.bookingDate)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>
                          {formatTime(booking.slotId?.startTime)} -{" "}
                          {formatTime(booking.slotId?.endTime)}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      Customer Email: {booking.userId?.email || "N/A"}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats Footer */}
        <div className="mt-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {mySlots.length}
                </div>
                <div className="text-sm text-gray-500">Total Slots</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {mySlots.filter((slot) => !slot.isBooked).length}
                </div>
                <div className="text-sm text-gray-500">Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {mySlots.filter((slot) => slot.isBooked).length}
                </div>
                <div className="text-sm text-gray-500">Booked</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {myBookings.length}
                </div>
                <div className="text-sm text-gray-500">Total Bookings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">Provider</div>
                <div className="text-sm text-gray-500">Account Type</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;