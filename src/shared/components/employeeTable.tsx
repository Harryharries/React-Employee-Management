import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-blue/theme.css"
import { useEffect, useState } from "react";
import { EmployeeState } from "shared/model/employeeState";
import { Member } from "shared/model/member";
import { Absence } from "shared/model/absence";


export const EmployeeTable = (props: EmployeeState) => {
    const [membersData, setMembersData] = useState<Member[]>([])
    const [absencesData, setAbsencesData] = useState<Absence[]>([])    
    
    useEffect(() => {
        setMembersData(props.members);
        setAbsencesData(props.absences);
    }, [props])
    
    return (
        <div>
            <div>
                <DataTable value={absencesData} responsiveLayout="scroll">
                    <Column field="type" header="Type"></Column>
                    <Column field="memberNote" header="MemberNote"></Column>
                    <Column field="startDate" header="StartDate"></Column>
                    <Column field="endDate" header="EndDate"></Column>
                    <Column field="type" header="Type"></Column>
                    <Column field="admitterNote" header="AdmitterNote"></Column>
                </DataTable>
            </div>
        </div>
    )
}