const Slot = require("../models/slot");

exports.createSlot = async (req, res) => {
  const { date, startTime, endTime } = req.body;

  try {
    if (startTime >= endTime) {
      return res
        .status(400)
        .json({ message: "Start time must be before end time" });
    }
    if (new Date(date) < new Date().setHours(0, 0, 0, 0)) {
      return res.status(409).json({ message: "Date must be in the future" });
    }

    const newSlot = new Slot({
      date,
      startTime,
      endTime,
      providerId: req.user.userId,
    });

    const existingSlot = await Slot.findOne({
      date,
      startTime,
      endTime,
      providerId: req.user.userId,
    });
    console.log("existing slot", existingSlot);
    if (existingSlot) {
      return res.status(400).json({ message: "Slot already exists" });
    }

    // Save the new slot
    await newSlot.save();
    console.log("the new slot is ", newSlot);
    res
      .status(201)
      .json({ message: "Slot created successfully", slot: newSlot });
  } catch (error) {
    console.error("Error creating slot:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getSlots = async (req, res) => {
  try {
    const slots = await Slot.find({ providerId: req.user.userId }).populate(
      "providerId",
      "name email"
    );
    res.status(200).json(slots);
  } catch (error) {
    console.error("Error fetching slots:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateSlot = async (req, res) => {
  const { slotId } = req.params;
  const { date, startTime, endTime } = req.body;

  const slot = await Slot.findById(slotId);

  if (slot.isBooked) {
    return res.status(400).json({ message: "Cannot edit a booked slot" });
  }

  try {
    const updatedSlot = await Slot.findByIdAndUpdate(slotId, {
      date,
      startTime,
      endTime,
    });

    if (!updatedSlot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    res
      .status(200)
      .json({ message: "Slot updated successfully", slot: updatedSlot });
  } catch (error) {
    console.error("Error updating slot:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteSlot = async (req, res) => {
  const { slotId } = req.params;

  const slot = await Slot.findById(slotId);
  if (slot.isBooked) {
    return res.status(400).json({ message: "Cannot delete a booked slot" });
  }
  try {
    const deletedSlot = await Slot.findByIdAndDelete(slotId);

    if (!deletedSlot) {
      return res.status(404).json({ message: "Slot not found" });
    }
    console.log("the deleted slot is ", deletedSlot);
    res.status(200).json({ message: "Slot deleted successfully" });
  } catch (error) {
    console.error("Error deleting slot:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// for user to see all available unbooked slots
exports.getAvailableSlots = async (req, res) => {
  try {
    const slots = await Slot.find({ isBooked: false }).populate(
      "providerId",
      "name email"
    );
    res.status(200).json(slots);
  } catch (error) {
    console.error("Error fetching available slots:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
