import React, { useEffect, useState } from "react";
import axios from "axios";

const AvailableSlots = () => {
  const [slots, setSlots] = useState([]);
  const token = localStorage.getItem("token");

  // ✅ Move this function inside component body and define it properly
  const handleBookSlot = async (slotId) => {
    try {
      const response = await axios.post(
        `/api/booking/book/${slotId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Slot booked successfully!");
      console.log("Booking response:", response.data);
      // Remove booked slot from UI
      setSlots(slots.filter((slot) => slot._id !== slotId));
    } catch (error) {
      console.error("Error booking slot:", error);
      alert("Error booking slot. Please try again.");
    }
  };

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {
        const res = await axios.get("/api/slot/available", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSlots(res.data);
      } catch (err) {
        console.error("Error fetching slots:", err);
      }
    };

    fetchAvailableSlots();
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Available Slots</h2>
      {slots.length === 0 ? (
        <p className="text-center text-gray-500">
          No available slots right now.
        </p>
      ) : (
        <div className="grid gap-4">
          {slots.map((slot) => (
            <div
              key={slot._id}
              className="bg-white shadow-md p-4 rounded border flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>Date:</strong> {slot.date}
                </p>
                <p>
                  <strong>Time:</strong> {slot.startTime} - {slot.endTime}
                </p>
                <p className="text-sm text-gray-500">
                  Provider: {slot.providerId?.name || "Unknown"}
                </p>
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => handleBookSlot(slot._id)}
              >
                Book
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableSlots;
