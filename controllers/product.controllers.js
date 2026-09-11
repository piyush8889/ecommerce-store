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

        res.json({
            count: products.length,
            products
        });

    } catch (error) {
        next(error);
    }
}


module.exports = {
    createProduct,
    getProducts,
}