const express = require('express');
const { createBooking, getBookings, cancelBooking } = require('../controllers/bookingController'); 
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleCheckMW');
const router = express.Router();

// Route to create a booking
router.post('/book/:slotId', authMiddleware, checkRole("user"), createBooking);       
// Route to get all bookings for a user
<<<<<<< HEAD
router.get('/view', authMiddleware, getBookings);
=======
router.get('/view', authMiddleware, checkRole("user"), getBookings);
>>>>>>> e5532fcae28cb6895765d3fe8da0b958f72e1878
// Route to cancel a booking
router.delete('/cancel/:bookingId', authMiddleware, checkRole("user"), cancelBooking); 
// Export the router        
module.exports = router;