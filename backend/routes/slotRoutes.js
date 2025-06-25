const express = require('express');
const {createSlot,getSlots,updateSlot,deleteSlot,getAvailableSlots} = require('../controllers/slotController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleCheckMW'); 
const router = express.Router();

router.post('/create', authMiddleware,checkRole("serviceProvider"), createSlot); 
router.get('/view', authMiddleware,checkRole("serviceProvider"), getSlots); 
router.put('/edit/:slotId', authMiddleware,checkRole("serviceProvider"), updateSlot); 
router.delete('/delete/:slotId', authMiddleware,checkRole("serviceProvider"), deleteSlot);
router.get('/available', authMiddleware, getAvailableSlots); // Endpoint to get available slots
module.exports = router;