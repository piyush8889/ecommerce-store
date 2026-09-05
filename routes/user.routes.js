const express = require("express")

const { userRegister, userLogin, logout } = require("../controllers/user.controllers")

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
module.exports = router