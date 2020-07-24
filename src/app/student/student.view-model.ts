import {Injectable} from '@angular/core';
import {StudentService} from './student.service';
import {BehaviorSubject, EMPTY, Observable} from 'rxjs';
import {Student} from './student.model';
import {tap} from 'rxjs/operators';

@Injectable()
export class StudentViewModel {

  // tslint:disable-next-line:variable-name
  private readonly _enrolledStudents$ = new BehaviorSubject<Student[]>([]);
  readonly enrolledStudents$ = this._enrolledStudents$.asObservable();

  // tslint:disable-next-line:variable-name
  private readonly _notEnrolledStudents$ = new BehaviorSubject<Student[]>([]);
  readonly notEnrolledStudents$ = this._notEnrolledStudents$.asObservable();

  private courseName: string = null;

  constructor(private readonly studentService: StudentService) {
  }

  getEnrolled(courseName: string): Observable<any> {
    this.courseName = courseName;
    return this.studentService.getEnrolledStudents(courseName).pipe(
      tap(
        (r) => {
          this._notEnrolledStudents$.next([]);
          this._enrolledStudents$.next(r);
        }
      )
    );
  }

  getNotEnrolled(): Observable<Student[]> {
    const courseName = this.courseName;
    if (courseName === null) {
      return EMPTY;
    }

    return this.studentService.getNotEnrolledStudents(courseName).pipe(
      tap(
        (r) => {
          this._notEnrolledStudents$.next(r);
        }
      )
    );
  }

  enrollOne(student: Student): Observable<any> {
    const courseName = this.courseName;
    if (courseName === null) {
      return EMPTY;
    }

    const oldEnrolledList = this._enrolledStudents$.getValue();
    const newEnrolledList = [];

    oldEnrolledList.forEach((s) => {
      newEnrolledList.push(s);
    });
    newEnrolledList.push(student);

    this._enrolledStudents$.next(newEnrolledList);

    return this.studentService.enrollStudent(courseName, student).pipe(
      tap(
        () => {
          this._notEnrolledStudents$.next([]);
        },
        () => {
          this._enrolledStudents$.next(oldEnrolledList);
        }
      )
    );
  }

  dropOutAll(students: Student[]) {

    const courseName = this.courseName;
    if (courseName === null) {
      return EMPTY;
    }

    const oldEnrolledList = this._enrolledStudents$.getValue();
    const newEnrolledList = [];

    oldEnrolledList.forEach((s1) => {
      const remove = students.find((s2) => s1 === s2) !== undefined;
      if (!remove) {
        newEnrolledList.push(s1);
      }
    });

    this._enrolledStudents$.next(newEnrolledList);

    return this.studentService.dropOutStudents(courseName, students).pipe(
      tap(
        () => {
        },
        () => {
          this._enrolledStudents$.next(oldEnrolledList);
        }
      )
    );
  }

}

