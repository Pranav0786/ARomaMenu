const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

const {
    addToCart , getAllCartItems
} = require('../controllers/cartController');



router.post('/addtocart', authMiddleware , addToCart);
router.get('/getAllCartItems', authMiddleware , getAllCartItems);


module.exports = router;