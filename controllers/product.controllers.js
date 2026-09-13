const Product = require("../models/product")

// create product
async function createProduct(req,res) {
    try {
        const {
            name,
            description,
            price,
            category,
            stock,
            image
        } = req.body;

        const product = await Product.create({
            name,
            description,
            price,
            category,
            stock,
            image
        });

        return res.status(201).json({
            message: "Product created",
            product
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Failed to create product"
        })
    }
}

//  GET ALL PRODUCTS
async function getProducts(req, res, next) {

    try {

        const products = await Product.find();

        return res.status(200).json({
            count: products.length,
            products
        });

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Failed to get products"
        })
    }
}

// Get single product 
async function getProductById(req,res) {
    try {
        const product = await Product.findById(req.params.id)

        if(!product){
            return res.status(404).json({
                message: "Product not found"
            })
        }

        return res.status(200).json({
            product
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to get product"
        })
    }
}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
}