const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  tagline: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0 
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
    min:0
  }
}, {
  timestamps: true 
});

const Sneakers = mongoose.model("Sneakers", productsSchema);
module.exports = Sneakers;
