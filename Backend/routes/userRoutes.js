const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

const { 
    getAllUsers , getUserById , updateProfile ,
    resetPassword , updatePassword , deleteProfile 
} = require('../controllers/userController');


router.get('/getallusers', authMiddleware , getAllUsers);
router.get('/getuserid/:id', authMiddleware , getUserById);
router.put('/updateuser', authMiddleware , updateProfile);
router.post('/resetpassword' , authMiddleware , resetPassword);
router.post('/updatepassword' , authMiddleware , updatePassword);
router.post('/deleteuser/:id' , authMiddleware , deleteProfile);



module.exports = router;