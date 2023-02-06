import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { Absence } from "shared/model/absence";
import { EmployeeState } from "shared/model/employeeState";
import { Member } from "shared/model/member";

const initialState: EmployeeState = {
    loading: false,
    members: [] as Member[],
    absences: [] as Absence[]
}

export const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        addAbsence: (state, action) => {
            state.absences.push(action.payload)
        },
        setAbsences: (state, action) => {
            state.absences = action.payload
        },
        addMember: (state, action) => {
            state.members.push(action.payload)
        },
        setMembers: (state, action) => {
            state.members = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
    }
})

export const { addAbsence, addMember,setAbsences, setMembers,setLoading } = employeeSlice.actions;
export default employeeSlice.reducer;

export const getTotalMembers = createSelector(
    (state: RootState) => state.employees.members,
    (members) => {
        return members.length;
    }
);

export const getTotalAbsences = createSelector(
    (state: RootState) => state.employees.absences,
    (absences) => {
        return absences.length;
    }
);