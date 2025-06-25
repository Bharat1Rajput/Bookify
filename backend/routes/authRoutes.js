const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const {signup, login} = require('../controllers/authController');




router.post('/signup',signup); 
router.post('/login', login);

module.exports = router;