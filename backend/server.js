const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const authRoutes = require('./routes/authRoutes');
const slotRoutes = require('./routes/slotRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const app = express();

const cors = require('cors');


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/slot',slotRoutes);
app.use('/api/booking',bookingRoutes);


app.get('/', (req, res) => {
    res.send('Welcome to the backend server!');
});


// Connect to MongoDB
mongoose
.connect(MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

}).catch(err => {
    console.error('MongoDB connection error:', err);
    
});