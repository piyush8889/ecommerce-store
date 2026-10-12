import express from "express"
import {
  authMiddleware
} from "../middlewares/user.middleware.js"
import {
  addToCart,
  getCart,
  removeFromCart
} from "../controllers/cart.controllers.js"


const router = express.Router()

router.use(authMiddleware)

router
  .route("/")
  .post(addToCart)
  .get(getCart)

router.delete("/:productId",removeFromCart)
export default router
