const mongoose = require("mongoose")

const orderHistorySchema = new mongoose.Schema({
    orderBy: String,
    totalPrice: Number,
    payedThrough: String,
    orderedSneakersFromCart: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "CartAdded",
        default: []
    },
    orderedSneakersFromBuyNow: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Sneakers",
        default: []
    },
    dateAndTimeOfOrder: {
        type: String
    }
})

const SneakersOrderHistory = mongoose.model("SneakersOrderHistory", orderHistorySchema)
module.exports = SneakersOrderHistory