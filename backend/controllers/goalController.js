// @desc     Get goals
// @route    GET /api/goals
// @access   Private
const getGoals = (req, res) => {
    res.status(200).json({message: "No goals yet"});
}

// @desc     Create a new goal
// @route    POST /api/goals
// @access   Private
const createGoal = (req, res) => {
    if (!req.body.text){
        res.status(400);
        throw new Error("Goal creation failed, please add text");
    }
    res.status(200).json({message: "Goal created"});
}

// @desc     Update a goal
// @route    PUT /api/goals/:id
// @access   Private
const updateGoal = (req, res) => {
     res.status(200).json({message: `Update goal ${req.params.id}`});
}

// @desc     Delete a goal
// @route    DELETE /api/goals/:id
// @access   Private
const deleteGoal = (req, res) => {
    res.status(200).json({message: `Delete goal ${req.params.id}`});
}

module.exports = {
    getGoals,
    createGoal,
    updateGoal,
    deleteGoal,
}