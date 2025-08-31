const express = require('express');
const { createBooking, getBookings, cancelBooking,getProviderBookingsSimple} = require('../controllers/bookingController'); 
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleCheckMW');
const router = express.Router();

// Route to create a booking
router.post('/book/:slotId', authMiddleware, checkRole("user"), createBooking);       
// Route to get all bookings for a user
router.get('/view', authMiddleware, checkRole("user"), getBookings);
// routes/booking.js or routes/provider.js
router.get('/provider/bookings',authMiddleware,checkRole("serviceProvider"), getProviderBookingsSimple);
// Route to cancel a booking
router.delete('/cancel/:bookingId', authMiddleware, checkRole("user"), cancelBooking); 
// Export the router        
module.exports = router;