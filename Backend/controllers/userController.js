const User = require("../models/User");
const bcrypt = require("bcryptjs");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getUserById = async (req, res) => {
    console.log("params.id =", req.params.id);
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send({
          message: "User not found",
          success: false,
        });
      }
      res.status(200).send({
        message: "User fetched successfully",
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(500).send({
        message: "Error in fetching user",
        success: false,
        error,
      });
    }
};


const updateProfile = async (req, res) => {
    try{
        const user = await User.findById({_id : req.body.id});
        if(!user){
            return res.status(404).send({
                message: "User not found",
                success: false
            })
        }
        const {name , phone } = req.body ;
        if(name) user.name = name ;
        if(phone) user.phone = phone ;
        await user.save() ;
        res.status(200).send({
            message: "User updated successfully",
            success: true,
            data: user
        })

    } catch(error) {
        res.status(500).send({
            message: "Error in updating user",
            success: false,
            error
        })
    }
};

const resetPassword = async (req, res) => {
    try{
        const {email,newPassword} = req.body ;
        if(!email || !newPassword){
            return res.status(400).send({
                message: "All fields are required",
                success: false
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).send({
                message: "User not found",
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(newPassword , 10);
        user.password = hashedPassword ;
        await user.save() ;
        res.status(200).send({
            message: "Password reset successfully",
            success: true,
            data: user
        })
    } catch(error) {    
        res.status(500).send({
            message: "Error in resetting password",
            success: false,
            error
        })
    }
};


const updatePassword = async (req, res) => {
    try{
        const user = await User.findById({_id : req.body.id});
        const {oldPassword, newPassword} = req.body ;
        if(!user){
            return res.status(404).send({
                message: "User not found",
                success: false
            })
        }
        if(!oldPassword || !newPassword){
            return res.status(400).send({
                message: "All fields are required",
                success: false
            })
        }
        const isMatch = await bcrypt.compare(oldPassword , user.password);
        if(!isMatch){
            return res.status(400).send({
                message: "Old password is incorrect",
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(newPassword , 10);
        user.password = hashedPassword ;
        await user.save() ;
        res.status(200).send({
            message: "Password updated successfully",
            success: true,
            data: user
        })
    } catch(error) {
        res.status(500).send({
            message: "Error in updating password",
            success: false,
            error
        })
    }
};


const deleteProfile = async (req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send({
            message: "User deleted successfully",
            success: true
        })
    } catch(error) {
        res.status(500).send({
            message: "Error in deleting user",
            success: false,
            error
        })
    }
};



module.exports = { 
    getAllUsers, 
    getUserById, 
    updateProfile, 
    resetPassword, 
    updatePassword,  
    deleteProfile
};