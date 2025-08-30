const mongoose = require('mongoose');


const bookingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        slotId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Slot',
            required: true
        },
        bookingDate: {
            type: Date,
            required: true
        }
    }
);

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
