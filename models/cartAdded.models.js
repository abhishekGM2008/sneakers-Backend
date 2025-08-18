const mongoose = require("mongoose");

const cartAddedSchema = new mongoose.Schema({
    sneakersCart: { type: mongoose.Schema.Types.ObjectId, ref: "Sneakers"},
    quantity: {
        type: Number,
        default: 1
    }
})

const CartAdded = mongoose.model("CartAdded", cartAddedSchema)
module.exports = CartAdded