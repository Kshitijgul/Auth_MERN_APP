const userModel = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "User already exists, you can login", success: false });
        }

        // Create a new user instance
        const newUser = new userModel({ name, email, password });

        // Hash the password before saving
        newUser.password = await bcrypt.hash(password, 10);

        // Save the new user to the database
        await newUser.save();

        // Respond with a success message
        res.status(201).json({ message: "Successfully signed up", success: true });

    } catch (error) {
        // Handle any server errors
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const ErrorMessage = 'Auth Failed: Email or password is incorrect';

        // Check if the user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: ErrorMessage, success: false });
        }

        // Compare the password provided with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: ErrorMessage, success: false });
        }

        // Generate a JWT token if authentication is successful
        const token = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '12h' }
        );

        // Respond with a success message and the token
        res.status(200).json({ 
            message: "Successfully logged in", 
            success: true, 
            token, 
            email: user.email, 
            name: user.name 
        });

    } catch (error) {
        // Handle any server errors
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

module.exports = {
    signup,
    login
}
