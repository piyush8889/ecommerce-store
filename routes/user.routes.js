const express = require("express")

const { userRegister, userLogin, logout, userProfile } = require("../controllers/user.controllers")
const { authMiddleware } = require("../middlewares/user.middleware")

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
module.exports = router