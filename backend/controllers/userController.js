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
        res.status(201).json(user);
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

    res.status(200).json(user);
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Public
const getCurrentUser = asyncHandler( async (req, res) => {
    if (!req.body.username || !req.body.email || !req.body.password){
        res.status(400);
        throw new Error("User creation failed, please fill all fields");
    }
    const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });

    res.status(200).json(user);
});


module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
}