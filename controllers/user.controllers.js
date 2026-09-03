const bcrypt = require("bcrypt")

const User = require("../models/user")

async function userRegister(req,res) {
    try {
        const {
            fullName,
            email,
            password,
            phoneNumber,
        } = req.body

        // validation 
        if(
            !fullName ||
            !email ||
            !password ||
            !phoneNumber
        ){
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [
            { email },
            { phone: phoneNumber }
    ]
        })
        if(existingUser){
            return res.status(409).json({
                message: "Email or Phone number is already registered..."
            })
        }

        // password hashing
        const hashedPassword = await bcrypt.hash(password,10)

        // create user
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            phone: phoneNumber
        })


        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

module.exports = {
    userRegister,
}