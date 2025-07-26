const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Ensures every product has a title
    trim: true
  },
  tagline: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0 // No negative pricing
  },
  productImage: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ["Men", "Unisex"],
    required: true
  },
  details: {
    type: String
  },
  color: {
    type: String
  },
  style: {
    type: String
  },
  origin: {
    type: String
  },
  quantity: {
    type: Number,
    default: 0,
    min: 0 // Prevent negative stock
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

const Sneakers = mongoose.model("Sneakers", productsSchema);
module.exports = Sneakers;
