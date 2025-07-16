const mongoose = require("mongoose")

const wishlistAddedSchema = new mongoose.Schema({
    sneakersInWishlist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sneakers"
    }
})

const WishListAdded = mongoose.model("WishListAdded", wishlistAddedSchema)
module.exports = WishListAdded