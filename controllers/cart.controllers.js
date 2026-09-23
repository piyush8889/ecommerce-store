const Cart = require("../models/cart")
const Product = require("../models/product")

async function addToCart(req, res, next) {

    try {

        const {
            productId,
            quantity
        } = req.body

        // validation
        if (!productId || !quantity || quantity < 1) {
            return res.status(400).json({
                message: "Product ID and valid quantity are required"
            })
        }

        // find product
        const product = await Product.findById(productId)

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            })
        }

        // find user's cart
        let cart = await Cart.findOne({
            user: req.user.id
        })

        // cart doesn't exist
        if (!cart) {

            if (product.stock < quantity) {
                return res.status(400).json({
                    message: "Not enough stock"
                })
            }

            cart = await Cart.create({
                user: req.user.id,
                items: [
                    {
                        product: productId,
                        quantity
                    }
                ]
            })

            return res.status(201).json({
                message: "Product added to cart",
                cart
            })
        }

        // check if product already exists in cart
        const item = cart.items.find(
            item => item.product.toString() === productId.toString()
        )

        // product already in cart
        if (item) {

            const newQuantity = item.quantity + quantity

            if (product.stock < newQuantity) {
                return res.status(400).json({
                    message: "Not enough stock"
                })
            }

            item.quantity = newQuantity

        } else {

            // new product in existing cart
            if (product.stock < quantity) {
                return res.status(400).json({
                    message: "Not enough stock"
                })
            }

            cart.items.push({
                product: productId,
                quantity
            })
        }

        await cart.save()

        return res.status(200).json({
            message: "Product added to cart",
            cart
        })

    } catch (error) {

        console.error(error)

        return res.status(500).json({
            message: "Failed to add product to cart"
        })
    }
}

async function getCart(req, res) {

    try {

        const cart = await Cart.findOne({
            user: req.user.id
        }).populate("items.product");

        if (!cart) {
            return res.status(200).json({
                items: []
            });
        }

        return res.status(200).json({
            cart
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Failed to get cart"
        });
    }
}

module.exports = {
    addToCart,
    getCart
}