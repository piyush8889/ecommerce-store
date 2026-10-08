import "dotenv/config"

import express from "express"
import cookieParser from "cookie-parser"
import userRoute from "./routes/user.routes.js"
import productRoute from "./routes/product.routes.js"
import cartRoute from "./routes/cart.routes.js"


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
