import "dotenv/config"

import express from "express"
import cookieParser from "cookie-parser"
import userRoute from "./routes/user.routes.js"
import productRoute from "./routes/product.routes.js"
import cartRoute from "./routes/cart.routes.js"

// const express = require("express")
// const cookieParser = require("cookie-parser") 

// const userRoute = require("./routes/user.routes")
// const productRoute = require("./routes/product.routes")
// const cartRoute = require("./routes/cart.routes")

const app = express()



// middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(cookieParser())

// route
app.use("/api/v1/user",userRoute)
app.use("/api/v1/product",productRoute)
app.use("/api/v1/cart",cartRoute)

export default app
// module.exports = app