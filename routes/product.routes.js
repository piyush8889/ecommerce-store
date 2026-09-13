const express = require("express")
const { authMiddleware, adminMiddleware } = require("../middlewares/user.middleware")
const { createProduct, getProducts, getProductById } = require("../controllers/product.controllers")
const router = express.Router()

// Admin 
router
  .post(
    "/",
    authMiddleware,
    adminMiddleware,
    createProduct
)

// public
router.get("/", getProducts);

router.get("/:id",getProductById)
  

module.exports = router