const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

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

// user login
async function userLogin(req,res) {
    try {
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({
                message: "All fields are required"
            }) 
        }

        // validation 
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                message: "Invalid Emai or Password"
            })
        }

        // matching password
        const isMatched = await bcrypt.compare(password,user.password)
        if(!isMatched){
            return res.status(400).json({
                message: "Invalid Emai or Password"
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        )

        res.cookie("token",token)

        res.json({
            message: "Login successful",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
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
    userLogin
}