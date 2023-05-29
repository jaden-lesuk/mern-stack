import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { createGoal } from "../features/goals/goalsSlice";

const GoalForm = () => {

    const [goal, setGoal] = useState("");
    const dispatch = useDispatch();
    // const { user } = useSelector((state) => state.auth)

    const onSubmit = e => {
        e.preventDefault();

        // dispatch(createGoal({user: user._id, text: goal}));
        dispatch(createGoal({text: goal}));
        setGoal("");
    }

    return (
        <section className='form'>
            <form onSubmit={ onSubmit }>
                <div className='form-group'>
                    <label htmlFor='text'>Goal</label>
                    <input type="text" id="text" value={goal} onChange={(e) => setGoal(e.target.value)}/>
                </div>
                <div className='form-group'>
                    <button className='btn btn-block' type="submit">Add Goal</button>
                </div>         
            </form>
        </section>
    )
}

export default GoalForm