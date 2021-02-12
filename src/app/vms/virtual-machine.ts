import {Student} from '../student/student.model';

export interface VirtualMachine {
  id: number;
  url: string;
  vcpu: number;
  space: number;
  ram: number;
  active: boolean;
  owners: Student[];
}
