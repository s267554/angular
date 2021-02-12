import {Student} from '../student/student.model';

export interface Paper {
  assignmentId: number;
  student: Student;
  vote: number;
  enabled: boolean;
  status: string;
}
