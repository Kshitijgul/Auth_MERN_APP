const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./Models/db');  // Import and invoke db connection
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');

const PORT = process.env.PORT || 8080;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());
app.use(cors());  // Invoke cors middleware

// Use auth router
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);

// Define routes
app.get('/pong', (req, res) => {
    res.send("Hello, Welcome to the world!");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is Listening on ${PORT}`);
});
