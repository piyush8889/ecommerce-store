require("dotenv").config()
const express = require("express")
const cookieParser = require("cookie-parser") 

const userRoute = require("./routes/user.routes")

const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(cookieParser())

// route
app.use("/api/v1/user",userRoute)

module.exports = app