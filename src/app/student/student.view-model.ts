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

  // tslint:disable-next-line:variable-name
  private readonly _dataLoading$ = new BehaviorSubject<boolean>(false);
  readonly dataLoading = this._dataLoading$.asObservable();

  private courseName: string = null;

  private queryText: string = null;

  constructor(private readonly studentService: StudentService) {
  }

  getEnrolled(courseName: string): Observable<any> {
    this.courseName = courseName;
    this._dataLoading$.next(true);
    return this.studentService.getEnrolledStudents(courseName).pipe(
      tap(
        (r) => {
          this._dataLoading$.next(false);
          this._enrolledStudents$.next(r);
        },
        () => {
          this._dataLoading$.next(false);
        }
      )
    );
  }

  getNotEnrolled(query: string): Observable<Student[]> {
    if (this._dataLoading$.getValue() === true) {
      return EMPTY;
    }

    const courseName = this.courseName;
    if (courseName === null) {
      return EMPTY;
    }

    if (this.queryText === query) {
      return EMPTY;
    }
    this.queryText = query;

    this._dataLoading$.next(true);
    return this.studentService.getNotEnrolledStudents(courseName).pipe(
      tap(
        (r) => {
          this._dataLoading$.next(false);
          this._notEnrolledStudents$.next(r);
        },
        () => {
          this._dataLoading$.next(false);
        }
      )
    );
  }

  enrollOne(student: Student): Observable<any> {
    if (this._dataLoading$.getValue() === true) {
      return EMPTY;
    }

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

    this._dataLoading$.next(true);
    return this.studentService.enrollStudent(courseName, student).pipe(
      tap(
        () => {
          this._dataLoading$.next(false);
          this._notEnrolledStudents$.next([]);
        },
        () => {
          this._dataLoading$.next(false);
          this._enrolledStudents$.next(oldEnrolledList);
        }
      )
    );
  }

  dropOutAll(students: Student[]) {

    if (this._dataLoading$.getValue() === true) {
      return EMPTY;
    }

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

    this._dataLoading$.next(true);
    return this.studentService.dropOutStudents(courseName, students).pipe(
      tap(
        () => {
          this._dataLoading$.next(false);
        },
        () => {
          this._dataLoading$.next(false);
          this._enrolledStudents$.next(oldEnrolledList);
        }
      )
    );
  }

}

