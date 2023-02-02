import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-blue/theme.css"
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { useEffect, useState } from "react";
import { EmployeeState } from "shared/model/employeeState";
import { Member } from "shared/model/member";
import { Absence } from "shared/model/absence";
import { AbsenceDto } from "shared/model/absenceDTO";


export const AbsencesTable = (props: EmployeeState) => {
    const [membersData, setMembersData] = useState<Member[]>([])
    const [absencesData, setAbsencesData] = useState<Absence[]>([])
    const [displayData, setdisplayData] = useState<AbsenceDto[]>([])       
    
    useEffect(() => {
        setMembersData(props.members);
        setAbsencesData(props.absences);

        absencesData.forEach((e: Absence) => {
            const absencesMember: Member | undefined = membersData.find((m: Member)=>m.userId === e.userId)
            const newStatus: string = e.rejectedAt ? 'Rejected' : e.confirmedAt? 'Confirmed' : 'Requested'
            const newAbsenceDto: AbsenceDto = {...e, name: absencesMember?.name, status: newStatus}
            setdisplayData((oldDisplayArray : AbsenceDto[])=>[...oldDisplayArray, newAbsenceDto])
        })
    }, [absencesData, membersData, props])
    
    return (
        <div>
            <div>
                <DataTable value={displayData} responsiveLayout="scroll">
                    <Column field="name" header="Name"></Column>
                    <Column field="type" header="Type"></Column>
                    <Column field="startDate" header="StartDate"></Column>
                    <Column field="endDate" header="EndDate"></Column>
                    <Column field="memberNote" header="MemberNote"></Column>
                    <Column field="status" header="Status"></Column>
                    <Column field="admitterNote" header="AdmitterNote"></Column>
                </DataTable>
            </div>
        </div>
    )
}