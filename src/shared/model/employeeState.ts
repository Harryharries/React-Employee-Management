import { Absence } from "./absence";
import { Member } from "./member";

export interface EmployeeState {
    members: Member[],
    absences: Absence[]
  }
