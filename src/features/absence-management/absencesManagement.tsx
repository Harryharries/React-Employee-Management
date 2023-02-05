import { useAppSelector } from 'app/hooks';
import { getAbsences, getMembers} from 'api/api';
import { AbsencesTable } from 'shared/components/absencesTable';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAbsences, setMembers } from './employeeSlice';
import { MemberRespones } from 'shared/model/membersRespones';
import { AbsenceRespones } from 'shared/model/absencesRespones';

//Data Container for table UI, which interacts with Redux and then passes/receive the necessary data to table UI
export const EmployeeManagement = () => {
    const absencesData = useAppSelector((state) => state.employees.absences);
    const membersData = useAppSelector((state) => state.employees.members);
    const dispatch = useDispatch();

    useEffect(() => {
      getAbsences().then((res) => {
        dispatch(setAbsences(res.payload));
      });
      // getMembers().then((res: MemberRespones) => {
      //   if (res.message === 'Success') {
      //       dispatch(setMembers(res.payload)) 
      //   }else{
      //       throw new Error("fail to fetch members")
      //   }
      // }).catch(alert)
      // getAbsences().then((res: AbsenceRespones) => {
      //   if (res.message === 'Success') {
      //       dispatch(setAbsences(res.payload)) 
      //   }else{
      //       throw new Error("fail to fetch absences")
      //   }
      // }).catch(alert)
    },[dispatch])
    
    return (
        <AbsencesTable absences={absencesData} members={membersData}></AbsencesTable>
    )
}

 