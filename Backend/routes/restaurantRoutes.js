const expreess = require("express");
const router = expreess.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
    createRestaurant,
    getAllRestaurants,
    getRestaurantById,
    deleteRestaurant
} = require("../controllers/restaurantController");
const isManagerMiddleware = require("../middlewares/isManagerMiddleware");



router.post('/create', authMiddleware, isManagerMiddleware, createRestaurant);
router.get('/getallrestaurants', getAllRestaurants);
router.get('/getrestaurant/:id', getRestaurantById);
router.delete('/delete/:id', authMiddleware, isManagerMiddleware, deleteRestaurant);

module.exports = router;