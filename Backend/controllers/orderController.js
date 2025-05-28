const Order = require('../models/Order');
const User = require('../models/User');
const Cart = require('../models/Cart');


const placeOrder = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.body.id });
        const userId = user._id;
        const { tableNumber } = req.body;
        if (!tableNumber) {
            return res.status(400).json({
                success: false,
                message: "Table number is required",
            });
        }
        const cartItems = await Cart.find({ user: userId }).populate("items.food");
        if (cartItems.length == 0)  {
            return res.status(400).json({
                success: false,
                message: "Your cart is empty",
            });
        }
        const items = cartItems[0].items.map(item => ({
            food: item.food._id,
            quantity: item.quantity,
        }));
        const totalAmount = cartItems[0].items.reduce(
            (total, item) => total + item.quantity * item.food.price,
            0
        );

        const order = new Order({
            user: userId,
            items,
            totalAmount,
            tableNumber,
        });

        await order.save();
        await Cart.deleteMany({ user: userId }); 

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            data: order,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error placing order",
            error: error.message,
        });
    }
};

const cancelOrder = (req, res) => {
    try{
        const {id} = req.params;
        const order = Order.findById(id);
        if(!order){
            return res.status(404).send({
                success: false,
                message: 'order not found'
            });
        }
        if(order.status === 'cancelled'){
            return res.status(400).send({
                success: false,
                message: 'order already cancelled'
            });
        }
        order.status = 'cancelled';
        order.save();
        res.status(200).send({
            success: true,
            message: 'order cancelled successfully',
            data: order
        });
    } catch(error){ 
        console.log(error);
        res.status(500).send({ 
            success: false,
            message: 'error in canceling order',
            error: error.message 
        });
    }
};

const updateOrderStatus = async (req, res) => {
    try{
        const {id} = req.params;
        const {status} = req.body;
        const order = await Order.findById(id);
        if(!order){
            return res.status(404).send({
                success: false,
                message: 'order not found'
            });
        }
        order.status = status;
        await order.save();
        res.status(200).send({
            success: true,
            message: 'order status updated successfully',
            data: order
        });
    } catch(error){
        console.log(error);
        res.status(500).send({ 
            success: false,
            message: 'error in updating order status',
            error: error.message 
        });
    }
};


const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate({
                path: 'user',
                select: 'name email phone',
            })
            .populate({
                path: 'items.food',
                select: 'title price description category imageurl ingredients',
                model: 'Food',
            });

        console.log("Populated Orders: ", orders); 

        res.status(200).send({
            success: true,
            message: 'orders fetched successfully',
            data: orders
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error in fetching orders',
            error: error.message
        });
    }
};


const getPendingOrders = async (req, res) => {
    try {
        const orders = await Order.find({ status: 'pending' })
            .populate({
                path: 'user',
                select: 'name email phone',
            })
            .populate({
                path: 'items.food',
                select: 'title price description category imageurl ingredients',
                model: 'Food',
            });

        console.log("Populated Orders: ", orders); 

        res.status(200).send({
            success: true,
            message: 'orders fetched successfully',
            data: orders
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error in fetching orders',
            error: error.message
        });
    }
};

const getOrderByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ user: userId })
            .populate({
                path: 'user',
                select: 'name email phone',
            })
            .populate({
                path: 'items.food',
                select: 'title price description category imageurl ingredients',
                model: 'Food',
            });
        console.log("Populated Orders: ", orders); 
        res.status(200).send({
            success: true,
            message: 'orders fetched successfully',
            data: orders
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error in fetching orders',
            error: error.message
        });
    }
};

module.exports = {
    placeOrder,
    cancelOrder,
    updateOrderStatus,
    getAllOrders,
    getPendingOrders,
    getOrderByUserId
    
};