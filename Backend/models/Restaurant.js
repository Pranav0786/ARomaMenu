const mongoose = require("mongoose");
require('./User');

const restaurantSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    imageurl:{
        type: String,
        default: "https://t3.ftcdn.net/jpg/03/24/73/92/360_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg",
    },
    tables:[
        {
            tableNo: { type: Number, required: true },
            isVacant: { type: Boolean, default: true },
        }
    ],
    time:{
        type: String,
        required: true,
    },
    isOpen:{
        type: Boolean,
        default: true,
    },
    rating:{
        type: Number,
        default: 1,
        min: 1,
        max: 5,
    },
    ratingCount:{
        type: String,
    },
    code:{
        type: String,
    },
    coords:{
        id:{type: String},
        latitude:{type: Number},
        longitude:{type: Number},
        latitudeDelta:{type: Number},   
        longitudeDelta:{type: Number},
        address:{type: String},
        title:{type: String},
    }


},{timestamps: true});


module.exports = mongoose.model("Restaurant", restaurantSchema);