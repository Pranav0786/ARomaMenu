const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const isManagerMiddleware = require('../middlewares/isManagerMiddleware');
const router = express.Router();

const { 
    createFood , getAllFoods, getFoodByCategory , getFoodById ,
    getFoodByRestaurantId , updatefood , deleteFood
} = require('../controllers/foodController');


router.post('/create', authMiddleware, isManagerMiddleware, createFood );
router.get('/getallfoods', getAllFoods);
router.get('/getfoodbycategory/:category', getFoodByCategory);

router.get('/getfood/:id', getFoodById);
router.get('/getfoodbyrestaurant/:id', getFoodByRestaurantId);
router.put('/updatefood/:id', authMiddleware, isManagerMiddleware, updatefood);
router.delete('/deletefood/:id', authMiddleware, isManagerMiddleware, deleteFood);


module.exports = router;