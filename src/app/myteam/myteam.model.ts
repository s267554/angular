import {Student} from '../student/student.model';

export interface MyTeam {
  id: number;
  name: string;
  vcpu: number;
  ram: number;
  space: number;
  courseName: string;
  maxVMsActive: number;
  maxVMs: number;
  enabled: boolean;
  creator: string;
  confirmedIds: string[];
  rejectedIds: string[];
  members: Student[];
  invalid: boolean;
  expiryDate: string;
}

export interface Proposal {
  name: string;
  timeout: number;
  ids: string[];
}
