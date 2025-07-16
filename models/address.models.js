const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
    address: String,
    district: String,
    state: String,
    pinCode: Number
})

const Address = mongoose.model("Address", addressSchema)
module.exports = Address