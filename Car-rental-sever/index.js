const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// CORS: allow Firebase frontend and local dev
app.use(cors({
  origin: "https://car-rental-2182a.web.app",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Routes
const carRoutes = require('./routes/carRoutes');
app.use('/api/cars', carRoutes);

const bookingRoutes = require('./routes/bookingRoutes');
app.use('/api/bookings', bookingRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
})   
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection failed:', err));

// Health check route
app.get('/', (req, res) => {
  res.send('Car Rental API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
