const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");


const Car = require("../models/Car"); 

router.post("/", async (req, res) => {
  try {
    const { carId, name, email, startDate, endDate } = req.body;

    
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    
    const daysBooked = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) || 1;
    const totalPrice = daysBooked * car.dailyPrice;

    
    const booking = new Booking({
      carId,
      name,
      email,
      startDate,
      endDate,
      totalPrice,
      status: "confirmed", 
    });

    const saved = await booking.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Failed to save booking", error: err.message });
  }
});



router.get("/", async (req, res) => {
  try {
    const email = req.query.email;
    const filter = email ? { email } : {};

    const bookings = await Booking.find(filter).populate("carId");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings", error: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking cancelled" });
  } catch (err) {
    res.status(500).json({ message: "Failed to cancel booking", error: err.message });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    const booking = await Booking.findById(req.params.id).populate("carId");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    
    booking.startDate = startDate;
    booking.endDate = endDate;

    
    const daysBooked = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) || 1;
    booking.totalPrice = daysBooked * (booking.carId?.dailyPrice || 0);

    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (err) {
    console.error("Update failed:", err);
    res.status(500).json({ message: "Failed to update booking", error: err.message });
  }
});


module.exports = router;
