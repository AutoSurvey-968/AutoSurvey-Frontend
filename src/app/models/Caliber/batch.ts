import { AssociateAssignments } from "./associate-assignments";
import { EmployeeAssignments } from "./employee-assignments";

export class Batch {
    id?: number;
    batchId?: String;
    name?: String;
    startDate?: String;
    endDate?: String;
    skill?: String;
    location?: String;
    type?: String;
    goodGrade?: number;
    passingGrade?: number;
    employeeAssignments?: EmployeeAssignments[];
    associateAssignments?: AssociateAssignments[]
    currentweek?: Number;
}
