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


module.exports = {
    createProduct,
}