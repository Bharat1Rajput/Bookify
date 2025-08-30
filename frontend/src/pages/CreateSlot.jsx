import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateSlotForm = () => {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const token = localStorage.getItem("token");
  const [role, setRole] = useState(null);

  useEffect(() => {
    const decodeToken = () => {
      if (!token) return;
      const payload = JSON.parse(atob(token.split(".")[1]));
      setRole(payload.role);
    };
    decodeToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (startTime >= endTime) {
        alert("Start time must be before end time.");
        return;
      }

      await axios.post(
        "/api/slot/create",
        { date, startTime, endTime },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Slot created successfully!");
      setDate("");
      setStartTime("");
      setEndTime("");
    } catch (err) {
      console.error(err);
      alert("Error creating slot");
    }
  };

  if (!token || role !== "serviceProvider") {
    console.log("the user is ", role);
    return (
      <div className="text-red-600 text-center mt-10 font-semibold">
        Access Denied: Providers only
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center">Create a Slot</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className=" block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="cursor-pointer w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            className="cursor-pointer w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
            className="cursor-pointer w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Create Slot
        </button>
      </form>
      <a href="/viewslots" className="text-blue-600 mt-4 block text-center">
        View Available Slots
      </a>
    </div>
  );
};

export default CreateSlotForm;
