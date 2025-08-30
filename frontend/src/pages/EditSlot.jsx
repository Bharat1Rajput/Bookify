import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const EditSlot = () => {
  const { state: slot } = useLocation(); // slot passed from view page
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [date, setDate] = useState(slot?.date.slice(0, 10) || "");
  const [startTime, setStartTime] = useState(slot?.startTime || "");
  const [endTime, setEndTime] = useState(slot?.endTime || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `/api/slot/edit/${slot._id}`,
        { date, startTime, endTime },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Slot updated successfully!");
      navigate("/viewslots");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Error updating slot");
    }
  };

  if (!slot) {
    return (
      <div className="text-center mt-10 text-red-600">
        No slot data available
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg border">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Slot</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Update Slot
        </button>
      </form>
    </div>
  );
};

export default EditSlot;
