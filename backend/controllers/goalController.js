const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// @desc     Get goals
// @route    GET /api/goals
// @access   Private
const getGoals = asyncHandler ( async (req, res) => {
    const goals = await Goal.find({ user: req.user.id });
    res.status(200).json(goals);
});

// @desc     Create a new goal
// @route    POST /api/goals
// @access   Private
const createGoal = asyncHandler ( async (req, res) => {
    if (!req.body.text){
        res.status(400);
        throw new Error("Goal creation failed, please add text");
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    });

    res.status(200).json(goal);
});

// @desc     Update a goal
// @route    PUT /api/goals/:id
// @access   Private
const updateGoal = asyncHandler ( async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
        res.status(400);
        throw new Error("Goal not found");
    }

    // check for user
    if(!req.user){
        res.status(401);
        throw new Error("User not found");
    }

    // check if correct user
    if(goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("User not authorized");
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})

     res.status(200).json(updatedGoal);
});

// @desc     Delete a goal
// @route    DELETE /api/goals/:id
// @access   Private
const deleteGoal = asyncHandler ( async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
        res.status(400);
        throw new Error("Goal not found");
    }

    // check for user
    // const user = await User.findById(req.user.id);
    if(!req.user){
        res.status(401);
        throw new Error("User not found");
    }

    // check if correct user
    if(goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("User not authorized");
    }

    await goal.remove();

    res.status(200).json({id: req.params.id});
});

module.exports = {
    getGoals,
    createGoal,
    updateGoal,
    deleteGoal,
}