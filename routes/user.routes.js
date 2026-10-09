
import express from "express"
import {
  userRegister,
  userLogin,
  logout,
  userProfile
} from "../controllers/user.controllers.js"
import {
  authMiddleware
} from "../middlewares/user.middleware.js"

const router = express.Router()

router
  .route("/register")
  .post(userRegister)


router
  .route("/login")
  .post(userLogin)


router
  .route("/logout")
  .post(logout)

router
  .route("/me")
  .get(authMiddleware,userProfile)

  export default router
