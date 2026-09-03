const express = require("express")

const { userRegister } = require("../controllers/user.controllers")

const router = express.Router()

router
  .route("/register")
  .post(userRegister)

module.exports = router