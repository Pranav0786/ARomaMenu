const Restaurant = require('../models/Restaurant');
const User = require('../models/User');


const createRestaurant = async (req, res) => {
    try{
        const user = await User.findById({_id: req.body.id});
        if(!user) {
            return res.status(404).send({
                message: "User not found",
                success: false
            })
        }
        if(user.role !== "manager") {
            return res.status(403).send({
                message: "You are not authorized to create a restaurant",
                success: false
            })
        }
        const existingRestaurant = await Restaurant.findOne({ title: req.body.title });
        if (existingRestaurant) {
            return res.status(409).send({
                message: "Restaurant already exists",
                success: false
            })
        }
        const { title,imageurl,tables,time,isOpen,rating,ratingCount,code,coords } = req.body;
        if( !title  || !tables || !time || !coords ) {
            return res.status(400).send({
                message: "Please provide all required fields",
                success: false
            })
        };
        const restaurant = new Restaurant({
            title, imageurl,
            tables, time, isOpen,
            rating, ratingCount, code, coords,
            createdBy: user._id,
        });
        await restaurant.save();
        res.status(201).send({
            message: "Restaurant created successfully",
            success: true,
            restaurant
        })

    } catch(error) {
        res.status(500).send({
            message: "Error in creating restaurant",
            success: false,
            error
        })
    }
};


const getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.status(200).send({
            message: "Restaurants fetched successfully",
            success: true,
            totalCount: restaurants.length,
            restaurants
        })
    } catch (error) {
        res.status(500).send({
            message: "Error in fetching restaurants",
            success: false,
            error
        })
    }
};


const getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        res.status(200).send({
            message: "Restaurant fetched successfully",
            success: true,
            restaurant
        })
    } catch (error) {
        res.status(500).send({
            message: "Error in fetching restaurant",
            success: false,
            error
        })
    }
};


const deleteRestaurant = async (req, res) => {
    try{
        const restaurant = await Restaurant.findById(req.params.id);
        if(!restaurant) {
            return res.status(404).send({
                message: "Restaurant not found",
                success: false
            })
        }
        const user = await User.findById({_id: req.body.id});
        if(!user) {
            return res.status(404).send({
                message: "User not found",
                success: false
            })
        }
        if(user.role !== "manager") {
            return res.status(403).send({
                message: "You are not authorized to delete a restaurant",
                success: false
            })
        }
        if( user._id.toString() !== restaurant.createdBy.toString()) {
            return res.status(403).send({
                message: "You are not owner of this restaurant or you are not authorized to delete this restaurant",
                success: false
            })
        }
        await Restaurant.findByIdAndDelete(req.params.id);
        res.status(200).send({
            message: "Restaurant deleted successfully",
            success: true,
            restaurant
        })

    } catch(error) {
        res.status(500).send({
            message: "Error in deleting restaurant",
            success: false,
            error
        })
    }
}



module.exports = {
    createRestaurant,
    getAllRestaurants,
    getRestaurantById,
    deleteRestaurant
}