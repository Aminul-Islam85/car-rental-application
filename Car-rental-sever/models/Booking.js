const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: true
  },
  name: String,
  email: String,
  startDate: String,
  endDate: String,
  totalPrice: Number, 
  status: {
    type: String,
    enum: ["confirmed", "pending", "canceled"],
    default: "confirmed" 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Booking", bookingSchema);
