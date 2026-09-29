// const jwt = require("jsonwebtoken")

import jwt from "jsonwebtoken"

function authMiddleware(req,res,next) {
    try {
        const token = req.cookies.token

        if(!token){
            return res.status(401).json({
                message: "Please login first"
            })
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        })
    }
}

// Admin middleware
function adminMiddleware(req,res,next) {
    if(req.user.role !== "Admin"){
        return res.status(403).json({
            message: "Admin access required..."
        })
    }
    next()
}

export {
    authMiddleware,
    adminMiddleware
}

// module.exports = {
//     authMiddleware,
//     adminMiddleware,
// }