const mongoose = require("mongoose")
require("dotenv").config()

const mongoUri = process.env.MONGODB 
const projectData = async() => {
    await mongoose
    .connect(mongoUri)
    .then(() => console.log("Connected to database"))
    .catch((error) => console.log("error occured", error))
}

module.exports = {projectData}