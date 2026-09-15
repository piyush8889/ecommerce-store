const express = require("express")
const { authMiddleware, adminMiddleware } = require("../middlewares/user.middleware")
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require("../controllers/product.controllers")
const router = express.Router()

// Admin 
router
  .post(
    "/",
    authMiddleware,
    adminMiddleware,
    createProduct
)

router
  .route("/:id")
  .patch(authMiddleware,adminMiddleware,updateProduct)
  .delete(authMiddleware,adminMiddleware,deleteProduct)

// public
router.get("/", getProducts);

router.get("/:id",getProductById)
  

module.exports = router