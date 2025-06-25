const express = require('express');
const { createBooking, getBookings } = require('../controllers/bookingController'); 
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleCheckMW');
const router = express.Router();

// Route to create a booking
router.post('/create/:slotId', authMiddleware, checkRole("user"), createBooking);       
// Route to get all bookings for a user
router.get('/view', authMiddleware, checkRole("user"), getBookings);
// Export the router        
module.exports = router;