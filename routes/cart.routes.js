const express = require("express")
const { authMiddleware } = require("../middlewares/user.middleware")
const { addToCart } = require("../controllers/cart.controllers")


const router = express.Router()

router.use(authMiddleware)

router
  .post("/",addToCart)
module.exports = router