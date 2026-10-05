// const express = require("express")
// const { authMiddleware, adminMiddleware } = require("../middlewares/user.middleware")
// const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require("../controllers/product.controllers")
import express from "express";
import {
  authMiddleware,
  adminMiddleware
} from "../middlewares/user.middleware.js"
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/product.controllers.js"

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
  
export default router
// module.exports = router