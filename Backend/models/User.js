const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        required : true,
        enum : ['manager', 'customer'],
        default : 'customer',
    },
    phone : {
        type : String,
        required : true,
    },
    profile : {
        type : String,
        default : 'https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg',
    }
} , {timestamps : true});

module.exports = mongoose.model('User', userSchema);