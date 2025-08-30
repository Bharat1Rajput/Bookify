import React, { useEffect, useState } from "react";
import axios from "axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const res = await axios.get("/api/booking/view", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };

    fetchMyBookings();
  }, [token]);

  // ✅ Cancel booking handler
  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.delete(`/api/booking/cancel/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(bookings.filter((b) => b._id !== bookingId));
      alert("Booking cancelled successfully");
    } catch (err) {
      console.error("Error cancelling booking:", err);
      alert("Failed to cancel booking");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">My Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white shadow-md rounded p-4 border"
            >
              <p>
                <strong>Date:</strong> {booking.slotId?.date}
              </p>
              <p>
                <strong>Time:</strong> {booking.slotId?.startTime} -{" "}
                {booking.slotId?.endTime}
              </p>
              <p className="text-sm text-gray-500">
                Provider: {booking.slotId?.providerId?.name || "Unknown"}
              </p>
              <p className="text-sm text-gray-500">
                Booked on: {new Date(booking.bookingDate).toLocaleString()}
              </p>

              <button
                onClick={() => handleCancelBooking(booking._id)}
                className="cursor-pointer mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
