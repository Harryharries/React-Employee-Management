import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { EmployeeState } from "shared/model/employeeState";

const initialState: EmployeeState = {
    members: [],
    absences: []
}

export const employeeSlice = createSlice({
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

export const { addAabsence, addMember,setAabsences, setMembers } = employeeSlice.actions;
export default employeeSlice.reducer;

export const getTotalMembers = createSelector(
    (state: RootState) => state.employee.members,
    (members) => {
        return members.length;
    }
);

export const getTotalAbsences = createSelector(
    (state: RootState) => state.employee.absences,
    (absences) => {
        return absences.length;
    }
);