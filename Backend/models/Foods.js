const mongoose = require("mongoose");
require("./Restaurant");
require("./User");

const foodSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageurl: {
        type: String,
        default: "https://domf5oio6qrcr.cloudfront.net/medialibrary/8371/bigstock-Hamburger-And-French-Fries-263887.jpg",
    },
    ARmodelUrl: {
        type: String,
        default: "",
    },
    category: {
        type: String,
        required: true,
        // eg. burger cake pizza 
    },
    isVeg: {
        type: Boolean,
        default: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        default: 2,
        min: 0,
        max: 5,
    },
    reviews: {
        type: Number,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    spiceLevel: {
        type: String,
        enum: ['Spicy', 'More Spicy', 'Medium' , 'Non Spicy'],
        default: 'Non Spicy',
    },
    speciality: {
        type: String,
        required: true,
    },
    ingredients: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Food", foodSchema);
