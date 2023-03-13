const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { default: mongoose } = require("mongoose");

// @desc    Register New User
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler( async (req, res) => {
    const {username, email, password} = req.body;

    if (!username || !email || !password){
        res.status(400);
        throw new Error("User creation failed, please fill all fields");
    }

    // Check if user exists

    const userExists = await User.findOne({email});

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Encrypt Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const user = await User.create({ username, email, password: hashedPassword});

    if(user) {
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user.id),
        });
    } else {
        res.status(400);
        throw new Error("User creation failed");
    }
});

// @desc    Log In
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler( async (req, res) => {

    const {email, password} = req.body;

    if (!email || !password){
        res.status(400);
        throw new Error("Please fill all fields to log in");
    }

    //check if user exists
    const userExists = await User.findOne({email});
    if (!userExists) {
        res.status(400);
        throw new Error("Please create an account");
    }

    // Match passwords
    if (userExists && (await bcrypt.compare(password, userExists.password))){
        res.status(201).json({
            _id: userExists.id,
            username: userExists.username,
            email: userExists.email,
            token: generateToken(userExists.id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid creds");

    }

});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getCurrentUser = asyncHandler( async (req, res) => {
    // res.status(200).json(req.user);

    const { _id, username, email } = await User.findById(req.user.id);

    res.status(200).json({
        id: _id,
        username,
        email
    })
});

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
}