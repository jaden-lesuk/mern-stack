import axios from "axios";

const API_URL = "http://localhost:5000/api/goals"

// Get Goals
const getGoals = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)
    return response.data;
}

// Create Goal
const createGoal = async (goalData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, goalData, config)
    return response.data;
}

const goalsService = {
    getGoals,
    createGoal
}

export default goalsService