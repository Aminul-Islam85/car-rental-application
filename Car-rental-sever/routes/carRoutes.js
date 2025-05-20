const express = require("express");
const router = express.Router();
const Car = require("../models/Car");

// Add a new car (POST)
router.post("/", async (req, res) => {
  try {
    const newCar = new Car({
      ...req.body,
      addedBy: req.body.email, // Save the email of user
    });
    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all cars or cars by email (GET)
router.get("/", async (req, res) => {
  try {
    const email = req.query.email;
    const filter = email ? { addedBy: email } : {};
    const cars = await Car.find(filter);
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cars" });
  }
});

// Get car by ID (GET)
router.get("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update car (PUT)
router.put("/:id", async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCar);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
});

// Delete car (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: "Car deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete car", error: err.message });
  }
});

module.exports = router;
