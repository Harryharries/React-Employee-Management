import { createSlice } from "@reduxjs/toolkit";
import { EmployeeState } from "shared/model/employeeState";

const initialState: EmployeeState = {
    members: [],
    absences: []
}

export const counterSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        addAabsence: (state, action) => {
            state.absences.push(action.payload)
        },
        setAabsences: (state, action) => {
            state.absences = action.payload
        },
        addMember: (state, action) => {
            state.members.push(action.payload)
        },
        setMembers: (state, action) => {
            state.members = action.payload
        }
    }
})

export const { addAabsence, addMember,setAabsences, setMembers } = counterSlice.actions;
export default counterSlice.reducer;
