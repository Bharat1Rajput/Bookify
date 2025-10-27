const Booking = require("../models/booking");
const Slot = require("../models/slot");
const mongoose = require("mongoose");

// book a slot
exports.createBooking = async (req, res) => {
  const userId = req.user.userId;
  const { slotId } = req.params;
  
  const session = await mongoose.startSession();

  try {
    session.startTransaction({
      readConcern: { level: 'snapshot' },
      writeConcern: { w: 'majority' }
    });

    // Atomic operation: Find unbooked slot and mark as booked in ONE query
    // This is the MongoDB equivalent of a "test-and-set" operation
    const slot = await Slot.findOneAndUpdate(
      { 
        _id: slotId, 
        isBooked: false  // Only update if not booked (atomic check)
      },
      { 
        isBooked: true   // Mark as booked
      },
      { 
        session,
        new: true,        // Return updated document
        runValidators: true
      }
    );

    // If slot is null, either it doesn't exist or it's already booked
    if (!slot) {
      await session.abortTransaction();
      
      // Check if slot exists to provide specific error
      const existingSlot = await Slot.findById(slotId);
      if (!existingSlot) {
        return res.status(404).json({ 
          success: false,
          message: "Slot not found" 
        });
      }
      
      return res.status(400).json({ 
        success: false,
        message: "Slot already booked" 
      });
    }

    // Create the booking
    const booking = new Booking({ 
      slotId, 
      userId, 
      bookingDate: new Date()
    });
    await booking.save({ session });

    await session.commitTransaction();

    res.status(201).json({ 
      success: true,
      message: "Slot booked successfully", 
      booking,
      slot 
    });

  } catch (err) {
    await session.abortTransaction();

    if (err.hasErrorLabel && err.hasErrorLabel('TransientTransactionError')) {
      return res.status(409).json({ 
        success: false,
        message: "Booking conflict. Please try again.",
        retryable: true
      });
    }

    console.error('Booking error:', err);
    res.status(500).json({ 
      success: false,
      message: "Server error", 
      error: err.message 
    });

  } finally {
    session.endSession();
  }
};

exports.getBookings = async (req, res) => {
  const userId = req.user.userId;

  try {
    const bookings = await Booking.find({ userId }).populate({
      path: "slotId",
      populate: {
        path: "providerId",
        select: "name email",
      },
    });

    if (!bookings || bookings.length === 0) {
      return res.status(200).json({ message: "No bookings found" });
    }

    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// for provider to see all bookings for their slots
exports.getProviderBookingsSimple = async (req, res) => {
  const providerId = req.user.userId;

  try {
    const bookings = await Booking.find()
      .populate({
        path: "slotId",
        match: { providerId: providerId }, // Only slots belonging to this provider
        populate: {
          path: "providerId",
          select: "name email",
        },
      })
      .populate("userId", "name email"); // User who booked

    // Filter out bookings where slotId is null (didn't match our provider)
    const providerBookings = bookings.filter(
      (booking) => booking.slotId !== null
    );

    if (!providerBookings || providerBookings.length === 0) {
      return res
        .status(200)
        .json({ message: "No bookings found for this provider" });
    }

    res.status(200).json(providerBookings);
  } catch (err) {
    console.error("Error fetching provider bookings:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
exports.cancelBooking = async (req, res) => {
  const userId = req.user.userId;
  const { bookingId } = req.params;
  
  const session = await mongoose.startSession();

  try {
    session.startTransaction({
      readConcern: { level: 'snapshot' },
      writeConcern: { w: 'majority' }
    });

    // Find the booking
    const booking = await Booking.findOne({ 
      _id: bookingId, 
      userId
    }).session(session);

    if (!booking) {
      await session.abortTransaction();
      return res.status(404).json({ 
        success: false,
        message: "Booking not found or already cancelled" 
      });
    }

    // Update booking status
    booking.status = 'cancelled';
    await booking.save({ session });

    // Mark slot as available again
    await Slot.findByIdAndUpdate(
      booking.slotId,
      { isBooked: false },
      { session }
    );

    await session.commitTransaction();

    res.status(200).json({ 
      success: true,
      message: "Booking cancelled successfully" 
    });

  } catch (err) {
    await session.abortTransaction();
    console.error('Cancellation error:', err);
    res.status(500).json({ 
      success: false,
      message: "Server error", 
      error: err.message 
    });
  } finally {
    session.endSession();
  }
};
