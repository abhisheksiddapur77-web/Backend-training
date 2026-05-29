const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
    uppercase: true
  },
  model: {
    type: String,
    required: true,
    uppercase: true
  },
  year: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  mileage: {
    type: Number,
    default: 0
  },
  condition: {
    type: String,
    enum: ['New', 'Used', 'Certified Pre-Owned'],
    default: 'Used'
  },
  description: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'Unknown'
  },
  fuelType: {
    type: String,
    enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
    default: 'Petrol'
  },
  transmission: {
    type: String,
    enum: ['Manual', 'Automatic'],
    default: 'Automatic'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Cars", carSchema);
