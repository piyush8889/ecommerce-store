// const Cart = require("../models/cart")
// const Product = require("../models/product")

import Cart from "../models/cart.js"
import Product from "../models/product.js"

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

async function removeFromCart(req, res) {

    try {

        const cart = await Cart.findOne({
            user: req.user.id
        });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        const initialLength = cart.items.length;

        cart.items = cart.items.filter(
            item =>
                item.product.toString() !==
                req.params.productId.toString()
        );

        if (cart.items.length === initialLength) {
            return res.status(404).json({
                message: "Product not found in cart"
            });
        }

        await cart.save();

        return res.status(200).json({
            message: "Product removed from cart",
            cart
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Failed to remove product from cart"
        });
    }
}

// module.exports = {
//     addToCart,
//     getCart,
//     removeFromCart
// }

export {
    addToCart,
    getCart,
    removeFromCart
}