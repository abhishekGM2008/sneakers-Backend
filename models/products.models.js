const mongoose = require("mongoose")

const productsSchema = new mongoose.Schema({
   title: {
    type: String,
   } ,
   tagline: String,
   price:Number,
   productImage: String,
   category: {
    type: String,
    enum: ["Men", "Unisex"]
   },
   details: String,
   color: String,
   style: String,
   origin: String
}, {timestamps:true}
)
const Sneakers = mongoose.model("Sneakers", productsSchema)
module.exports = Sneakers