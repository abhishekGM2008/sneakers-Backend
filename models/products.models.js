const mongoose = require("mongoose")

const productsSchema = new mongoose.Schema({
   title: {
    type: String,
   } ,
   tagline: {
      type: String
   },
   price:{
      type: Number
   },
   productImage: {
      type: String
   },
   category: {
    type: String,
    enum: ["Men", "Unisex"]
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
      type:Number,
      default: 0
   }
});

const Sneakers = mongoose.model("Sneakers", productsSchema);
module.exports = Sneakers;