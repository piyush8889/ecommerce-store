// const mongoose = require("mongoose")
import mongoose from "mongoose"

async function connectMongoDB(URI) {
    try {
        await mongoose.connect(URI)
        console.log("Database connected successfully...")
    } catch (error) {
        console.error("Database connection error:", error.message)
        process.exit(1)
    }
}

export {
    connectMongoDB
}

// module.exports = {
//     connectMongoDB,
// }