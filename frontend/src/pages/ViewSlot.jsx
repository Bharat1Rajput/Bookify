import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewSlots = () => {
  const [slots, setSlots] = useState([]);
  const [role, setRole] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const res = await axios.get("/api/slot/view", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSlots(res.data);
      } catch (err) {
        console.error("Error fetching slots:", err);
      }
    };

    const decodeToken = () => {
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setRole(payload.role);
      }
    };

    fetchSlots();
    decodeToken();
  }, [token]);

  const handleDelete = async (slotId) => {
    try {
      await axios.delete(`/api/slot/delete/${slotId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Slot deleted successfully!");
      setSlots(slots.filter((slot) => slot._id !== slotId));
    } catch (error) {
      console.error("Delete failed", error);
      alert("Error deleting slot");
    }
  };

  const handleEdit = (slot) => {
    navigate(`/editslot/${slot._id}`, { state: slot });
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Available Slots</h2>
      <div className="grid gap-4">
        {slots.length === 0 ? (
          <p className="text-center text-gray-500">No available slots.</p>
        ) : (
          slots.map((slot) => (
            <div
              key={slot._id}
              className="bg-white shadow-md p-4 rounded border flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">Date: {slot.date}</p>
                <p>
                  Time: {slot.startTime} - {slot.endTime}
                </p>
                <p className="text-sm text-gray-600">
                  Provider: {slot.providerId?.name || "N/A"}
                </p>
              </div>

              {role === "serviceProvider" ? (
                <div className="flex gap-2">
                  <button
                    className="cursor-pointer bg-yellow-500 text-white px-3 py-1 rounded"
                    onClick={() => handleEdit(slot)}
                  >
                    Edit
                  </button>
                  <button
                    className="cursor-pointer bg-red-600 text-white px-3 py-1 rounded "
                    onClick={() => handleDelete(slot._id)}
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  onClick={() => alert(`Book slot ID: ${slot._id}`)}
                >
                  Book
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewSlots;
