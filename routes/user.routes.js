const express = require("express")

const { userRegister, userLogin } = require("../controllers/user.controllers")

const router = express.Router()

router
  .route("/register")
  .post(userRegister)


router
  .route("/login")
  .post(userLogin)
module.exports = router