const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },

        role: {
            type: String,
            enum: ["User", "Admin"],
            default: "User"
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("user", userSchema)

module.exports = User