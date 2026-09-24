const express = require("express")
const { authMiddleware } = require("../middlewares/user.middleware")
const { addToCart, getCart, removeFromCart } = require("../controllers/cart.controllers")


const router = express.Router()

router.use(authMiddleware)

router
  .route("/")
  .post(addToCart)
  .get(getCart)

router.delete("/:productId",removeFromCart)
module.exports = router