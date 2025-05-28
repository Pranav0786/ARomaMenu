const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerController = async (req,res) =>{
    try{
        const {name , email , password , role , phone} = req.body;
        if( !name || !email || !password || !role || !phone){
            return res.status(400).send({
                message: "All fields are required",
                success: false
            })
        }
        const existingUser = await User.findOne({email})
        if (existingUser){
            return res.status(400).send({
                message: "User already exists",
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password , 10);
        const newUser = new User({name , email , password: hashedPassword , role , phone});
        await newUser.save();
        res.status(201).send({
            message: "User registered successfully",
            success: true,
            data: newUser
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error in registration",
            success: false,
            error
        })
    }
};


const loginController = async (req,res) => {
    try{
        const {email , password} = req.body;
        if( !email || !password){
            return res.status(400).send({
                message: "All fields are required",
                success: false
            })
        }
        const user = await User.findOne({email})
        if (!user){
            return res.status(400).send({
                message: "User not found",
                success: false
            })
        }
        const isMatch = await bcrypt.compare(password , user.password);
        if (!isMatch){
            return res.status(400).send({
                message: "Invalid credentials",
                success: false
            })
        }
        const token = jwt.sign({id: user._id , role: user.role} , process.env.JWT_SECRET , {expiresIn: "1d"});
        res.status(200).send({
            message: "User logged in successfully",
            success: true,
            data: {token , user}
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error in login",
            success: false,
            error
        })
    }
};

module.exports = { registerController, loginController}