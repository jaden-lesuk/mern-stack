import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalsService from "./goalsService";

const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Get goals
export const getGoals = createAsyncThunk('goals/fetch', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalsService.getGoals(token)
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// Create goal
export const createGoal = createAsyncThunk('goals/create', async (goalData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalsService.createGoal(goalData, token)
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const goalsSlice = createSlice({
    name: "goals",
    initialState,
    reducers : {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(createGoal.pending, (state) => {state.isLoading = true})
        .addCase(createGoal.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.goals.push(action.payload);
        })
        .addCase(createGoal.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getGoals.pending, (state) => {state.isLoading = true})
        .addCase(getGoals.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.goals = action.payload;
        })
        .addCase(getGoals.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            // state.goals = null;
        })
    }
})

export const { reset } = goalsSlice.actions
export default goalsSlice.reducer