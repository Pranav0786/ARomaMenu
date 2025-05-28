const Cart = require("../models/Cart");
const User = require("../models/User");


const addToCart = async (req, res) => {
    try{
        const user = await User.findById({ _id: req.body.id });
        if (!user) {
            return res.status(404).send({
                message: "User not found",
                success: false
            })
        }
        const { items, totalAmount } = req.body;
        let cart = await Cart.findOne({ user: req.body.id  });

        if (cart) {
            items.forEach((newItem) => {
                const existingItem = cart.items.find(item => item.food.toString() === newItem.food);
                if (existingItem) {
                    existingItem.quantity += newItem.quantity || 1;
                } else {
                    cart.items.push(newItem);
                }
            });

            cart.totalAmount += totalAmount;
        } else {
            cart = new Cart({ user: user._id, items, totalAmount });
        }

        await cart.save();
        return res.status(201).json({
            success: true,
            message: 'Cart updated successfully',
            data: cart,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error adding to cart',
            error: error.message,
        });
    }
}

const getAllCartItems = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.body.id });
        if (!user) {
            return res.status(404).send({
                message: "User not found",
                success: false
            })
        }
        const cart = await Cart.findOne({ user: req.body.id }).populate('items.food');
        if (!cart) {
            return res.status(404).send({
                message: "Cart not found",
                success: false
            })
        }
        res.status(200).send({
            success: true,
            message: 'Cart fetched successfully',
            items: cart.items,
            totalAmount: cart.totalAmount,
            data: cart,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching cart',
            error: error.message,
        });
    }
};

module.exports = {
    addToCart,
    getAllCartItems
}