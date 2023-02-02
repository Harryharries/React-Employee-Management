import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column";
import "./DataTableDemo.css"
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { FilterMatchMode } from 'primereact/api';
import { useEffect, useState } from "react";
import { EmployeeState } from "shared/model/employeeState";
import { Member } from "shared/model/member";
import { Absence } from "shared/model/absence";
import { AbsenceDto } from "shared/model/absenceDTO";
import { Button } from 'primereact/button';
import ICalendarLink from "react-icalendar-link";
import { DownloadICal } from "shared/model/downloadICal";

export const AbsencesTable = (props: EmployeeState) => {
    const [membersData, setMembersData] = useState<Member[]>([])
    const [absencesData, setAbsencesData] = useState<Absence[]>([])
    const [displayData, setdisplayData] = useState<AbsenceDto[]>([])
    const [loading, setLoading] = useState(true);    
    const [filters] = useState({
        'type': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'startDate': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'endDate': { value: null, matchMode: FilterMatchMode.CONTAINS }
    });


    
    useEffect(() => {
        setMembersData(props.members);
        setAbsencesData(props.absences);

        absencesData.forEach((e: Absence) => {
            const absencesMember: Member | undefined = membersData.find((m: Member)=>m.userId === e.userId)
            const newStatus: string = e.rejectedAt ? 'Rejected' : e.confirmedAt? 'Confirmed' : 'Requested'
            const newAbsenceDto: AbsenceDto = {...e, name: absencesMember?.name, status: newStatus}
            setdisplayData((oldDisplayArray : AbsenceDto[])=>[...oldDisplayArray, newAbsenceDto])
            setLoading(false)
        })
        return ()=>{
            setLoading(true)
        }
    }, [absencesData, membersData, props])

    const statusBodyTemplate = (rowData:AbsenceDto) => {
        return <span className={`customer-badge status-${rowData.status}`}>{rowData.status}</span>;
    }
    const admitterNoteBodyTemplate = (rowData:AbsenceDto) => {
        return <span className="long-text">{rowData.admitterNote}</span>;
    }
    const memberNoteBodyTemplate = (rowData:AbsenceDto) => {
        return <span className="long-text">{rowData.admitterNote}</span>;
    }

    const downloadICalTemplate = (rowData:AbsenceDto) => {
        const event = {
            title: rowData.type + ": " + rowData.name,
            description:  rowData.memberNote,
            startTime: rowData.startDate,
            endTime: rowData.endDate,
          } as DownloadICal;

        return (
            <div>
                {/*// @ts-ignore */}
                <ICalendarLink event={event}>
                    <Button className="download" 
                    icon="pi pi-download" 
                    tooltip="Download ICal file">
                    </Button>
                </ICalendarLink>
            </div>
            
        );
    }

    return (
        <div className="datatable-filter-demo">
            <div className="card">
                <DataTable value={displayData} paginator 
                className="p-datatable-employee" showGridlines rows={10} 
                filters={filters}
                filterDisplay="row"
                loading={loading}
                emptyMessage="No employees found."
                responsiveLayout="scroll">
                    <Column field="name" header="Name"
                    style={{ width: '6vw' }} 
                    ></Column>
                    <Column field="type" header="Type"  
                    style={{ width: '12vw' }} 
                    filter filterPlaceholder="type name"></Column>
                    <Column field="startDate" header="StartDate"
                    style={{ width: '14vw' }} 
                     filter filterPlaceholder="start date"></Column>
                    <Column field="endDate" header="EndDate"
                    style={{ width: '14vw' }} 
                     filter filterPlaceholder="end date"></Column>
                    <Column field="memberNote" header="MemberNote" body={memberNoteBodyTemplate} style={{ width: '22vw' }}></Column>
                    <Column field="status" header="Status" style={{ width: '4vw' }}  body={statusBodyTemplate}></Column>
                    <Column body={downloadICalTemplate} exportable={false} style={{ width: '4vw' }}></Column>
                    <Column field="admitterNote" style={{ width: '22vw' }} body={admitterNoteBodyTemplate} header="AdmitterNote"></Column>
                </DataTable>
            </div>
        </div>
    )
}