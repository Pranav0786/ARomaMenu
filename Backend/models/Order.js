const mongoose = require("mongoose");
require("./User");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [
        {
            food: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Food",
                required: true,
            },
            quantity: {
                type: Number,
                default: 1,
                min: 1,
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    tableNumber: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Preparing", "Delivered", "Cancelled"],
        default: "Pending",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("Order", orderSchema);
