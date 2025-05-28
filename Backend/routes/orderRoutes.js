const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const authMiddleware = require('../middlewares/authMiddleware');
const isManagerMiddleware = require('../middlewares/isManagerMiddleware');

const {
    placeOrder, cancelOrder , updateOrderStatus , getAllOrders ,
    getPendingOrders , getOrderByUserId
} = require('../controllers/orderController');



router.post('/placeOrder', authMiddleware , placeOrder);
router.post('/cancelOrder:id', authMiddleware , cancelOrder);
router.put('/updateOrder/:id', authMiddleware , isManagerMiddleware , updateOrderStatus);
router.get('/getAllOrders', authMiddleware , isManagerMiddleware , getAllOrders);
router.get('/getPendingOrders', authMiddleware , isManagerMiddleware , getPendingOrders);
router.get('/getOrderByUserId/:userId', authMiddleware , getOrderByUserId);


module.exports = router;