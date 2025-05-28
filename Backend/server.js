require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

const connectDB = require('./config/Database');


// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
connectDB();

// Routes
app.get('/', (req, res) => { res.send('Hello World!') });
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/restaurant', require('./routes/restaurantRoutes'));
app.use('/api/food', require('./routes/foodRoutes'));
app.use('/api/order', require('./routes/orderRoutes')); 
app.use('/api/cart', require('./routes/cartRoutes'));


app.listen(process.env.PORT , () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});