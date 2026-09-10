const express = require("express")
const { authMiddleware, adminMiddleware } = require("../middlewares/user.middleware")
const { createProduct } = require("../controllers/product.controllers")
const router = express.Router()

// Admin 
router
  .post(
    "/",
    authMiddleware,
    adminMiddleware,
    createProduct
)

module.exports = router