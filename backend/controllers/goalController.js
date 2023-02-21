const asyncHandler = require("express-async-handler");

// @desc     Get goals
// @route    GET /api/goals
// @access   Private
const getGoals = asyncHandler ( async (req, res) => {
    res.status(200).json({message: "No goals yet"});
});

// @desc     Create a new goal
// @route    POST /api/goals
// @access   Private
const createGoal = asyncHandler ( async (req, res) => {
    if (!req.body.text){
        res.status(400);
        throw new Error("Goal creation failed, please add text");
    }
    res.status(200).json({message: "Goal created"});
});

// @desc     Update a goal
// @route    PUT /api/goals/:id
// @access   Private
const updateGoal = asyncHandler ( async (req, res) => {
     res.status(200).json({message: `Update goal ${req.params.id}`});
});

// @desc     Delete a goal
// @route    DELETE /api/goals/:id
// @access   Private
const deleteGoal = asyncHandler ( async (req, res) => {
    res.status(200).json({message: `Delete goal ${req.params.id}`});
});

module.exports = {
    getGoals,
    createGoal,
    updateGoal,
    deleteGoal,
}