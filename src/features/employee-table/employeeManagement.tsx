import { useAppSelector } from 'app/hooks';
import { members } from 'api/api';
import { absences } from 'api/api';
import { EmployeeTable } from 'shared/components/employeeTable';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAabsences, setMembers } from './employeeSlice';
import { MemberRespones } from 'shared/model/membersRespones';
import { AbsenceRespones } from 'shared/model/absencesRespones';

//Data Container for table UI, which interacts with Redux and then passes/receive the necessary data to table UI
export const EmployeeManagement = () => {
    const absencesData = useAppSelector((state) => state.employee.absences);
    const membersData = useAppSelector((state) => state.employee.members);
    const dispatch = useDispatch();

    useEffect(() => {
      console.log('dispatch')
      members.then((res: MemberRespones) => {
        if (res.message === 'Success') {
            dispatch(setMembers(res.payload)) 
        }else{
            throw new Error("fail to fetch members")
        }
      }).catch(alert)
      absences.then((res: AbsenceRespones) => {
        if (res.message === 'Success') {
            dispatch(setAabsences(res.payload)) 
        }else{
            throw new Error("fail to fetch absences")
        }
      }).catch(alert)
      
      return () => {
        console.log('clean')
      }
    })
    
    return (
        <EmployeeTable absences={absencesData} members={membersData}></EmployeeTable>
    )
}

 