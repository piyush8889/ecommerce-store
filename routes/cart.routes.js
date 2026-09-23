const express = require("express")
const { authMiddleware } = require("../middlewares/user.middleware")
const { addToCart, getCart } = require("../controllers/cart.controllers")


const router = express.Router()

router.use(authMiddleware)

router
  .route("/")
  .post(addToCart)
  .get(getCart)
module.exports = router