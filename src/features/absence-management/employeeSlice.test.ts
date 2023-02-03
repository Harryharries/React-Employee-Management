import employeeReducer, {
    addAbsence, 
    addMember,
    setAbsences, 
    setMembers,
    getTotalAbsences,
    getTotalMembers
} from "./employeeSlice"
import absences from "../../../public/absencesTest.json"
import members from "../../../public/membersTest.json"
import type { RootState } from "app/store"
import { EmployeeState } from "shared/model/employeeState"
import { Member } from "shared/model/member"
import { Absence } from "shared/model/absence"

describe("employee reducer", ()=> {
    it("should return the initial state when passed an empty action", ()=>{
        const initialState = undefined;
        const action = {type: ""}
        const result = employeeReducer(initialState,action);
        expect(result).toEqual(
            {    
                members: [],
                absences: []
            })
    })
    it("should reset a new list of Absences in employee state", ()=>{
        const initialState = undefined;
        const action = setAbsences(absences)
        const result = employeeReducer(initialState,action);

        // check array length
        expect(Object.keys(result.absences).length).toEqual(absences.length)
        // check all items in array
        absences.forEach((absence) => {
            expect(result.absences.find((e)=>e.id === absence.id)).toEqual(absence)
        })
    })
    it("should reset a new list of Members in employee state", ()=>{
        const initialState = undefined;
        const action = setMembers(members)
        const result = employeeReducer(initialState,action);

        expect(Object.keys(result.members).length).toEqual(members.length)
        // check all items in array
        members.forEach((member) => {
            expect(result.members.find((e)=>e.id === member.id)).toEqual(member)
        })
    })
    it("should add new Absence into Current Absences list in employee state", ()=>{
        const initialState = undefined;
        const absenceTest = absences[0]
        let action = addAbsence(absenceTest)
        // current Absences is empty
        let result = employeeReducer(initialState,action);

        expect(Object.keys(result.absences).length).toEqual(1)
        expect(result.absences[0]).toEqual(absenceTest)

        const absenceTest2 = absences[1]
        action = addAbsence(absenceTest2)
        // current Absences is not empty
        result = employeeReducer(result,action);

        expect(Object.keys(result.absences).length).toEqual(2)
        expect(result.absences[0]).toEqual(absenceTest)
        expect(result.absences[1]).toEqual(absenceTest2)
    })
    it("should add a new Member into Current Members list in employee state", ()=>{
        const initialState = undefined;
        const memberTest = members[0]
        let action = addMember(memberTest)
        // current members array is empty
        let result = employeeReducer(initialState,action);

        expect(Object.keys(result.members).length).toEqual(1)
        expect(result.members[0]).toEqual(memberTest)

        const memberTest2 = members[1]
        action = addMember(memberTest2)
        // current members is not empty
        result = employeeReducer(result,action);

        expect(Object.keys(result.members).length).toEqual(2)
        expect(result.members[0]).toEqual(memberTest)
        expect(result.members[1]).toEqual(memberTest2)

    })
})

describe("selectors", () => {
    describe("getTotalMembers", ()=>{
        it("should return 0 with no member items", () => {
            const employees: EmployeeState ={
                members: [] as Member[],
                absences: [] as Absence[]
            }
            const result = getTotalMembers({ employees } as RootState)
            expect(result).toEqual(0)
        })
        it("should return total members number when there is member items", () => {
            const employees: EmployeeState ={
                members: members as Member[],
                absences: [] as Absence[]
            }
            const result = getTotalMembers({ employees } as RootState)
            expect(result).toEqual(members.length)
        })
    })
    describe("getTotalAbsences", ()=>{
        it("should return 0 with no Absence items", () => {
            const employees: EmployeeState ={
                members: [] as Member[],
                absences: [] as Absence[]
            }
            const result = getTotalAbsences({ employees } as RootState)
            expect(result).toEqual(0)
        })
        it("should return total Absences number when there is Absence items", () => {
            const employees: EmployeeState ={
                members: [] as Member[],
                absences: absences as unknown as Absence[]
            }
            const result = getTotalAbsences({ employees } as RootState)
            expect(result).toEqual(absences.length)
        })
    })
})

