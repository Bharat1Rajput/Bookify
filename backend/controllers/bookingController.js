const Booking = require('../models/booking');
const Slot = require('../models/slot');

// book a slot 
exports.createBooking = async (req, res) => {   
     const userId = req.user.userId;
  const { slotId } = req.params;
  const bookingDate = new Date(); // Current date and time
  try {
    const slot = await Slot.findById(slotId);
    if (!slot) return res.status(404).json({ message: 'Slot not found' });
    if (slot.isBooked) return res.status(400).json({ message: 'Slot already booked' });

    const booking = new Booking({ slotId,userId, bookingDate });
    await booking.save();

    await Slot.findByIdAndUpdate(slotId, { isBooked: true });
   

    res.status(201).json({ message: 'Slot booked successfully', booking });
  } catch (err) {
    res.status(500).json({ message: 'Server error' ,error : err.message });
  }
};


exports.getBookings = async (req, res) => {
  const userId = req.user.userId;

  try {
    const bookings = await Booking.find({ userId: userId })
      .populate('slotId')
      .populate('userId', 'name email');

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found' });
    }

    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}   ;