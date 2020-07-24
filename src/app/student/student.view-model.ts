import {Injectable} from '@angular/core';
import {StudentService} from './student.service';
import {BehaviorSubject, combineLatest, EMPTY, Observable} from 'rxjs';
import {Student} from './student.model';
import {map, tap} from 'rxjs/operators';

@Injectable()
export class StudentViewModel {

  // tslint:disable-next-line:variable-name
  private readonly _enrolledStudents$ = new BehaviorSubject<Student[]>([]);
  readonly enrolledStudents$ = this._enrolledStudents$.asObservable();

  // tslint:disable-next-line:variable-name
  private readonly _notEnrolledStudents$ = new BehaviorSubject<Student[]>(null);
  readonly notEnrolledStudents$ = this._notEnrolledStudents$.asObservable();

  // tslint:disable-next-line:variable-name
  private readonly _textQuery$ = new BehaviorSubject<string>(null);
  readonly textQuery$ = this._textQuery$.asObservable();

  readonly search$: Observable<Student[]>;

  private courseName: string = null;

  constructor(private readonly studentService: StudentService) {

    const dataMutations = [
      this.notEnrolledStudents$,
      this.textQuery$
    ];

    this.search$ = combineLatest(dataMutations).pipe(map(() => {
      return filter(this._notEnrolledStudents$.getValue(), this._textQuery$.getValue());
    }));
  }

  getEnrolled(courseName: string): Observable<any> {
    this.courseName = courseName;
    this._textQuery$.next(null);
    this._enrolledStudents$.next([]);
    this._notEnrolledStudents$.next(null);
    return this.studentService.getEnrolledStudents(courseName).pipe(
      tap(
        (r) => {
          this._enrolledStudents$.next(r);
        }
      )
    );
  }

  search(textQuery: string): Observable<Student[]> {
    const courseName = this.courseName;
    if (courseName === null) {
      return EMPTY;
    }

    this._textQuery$.next(textQuery);

    const students = this._notEnrolledStudents$.getValue();
    if (students === null || students === undefined) {
      return this.studentService.getNotEnrolledStudents(courseName).pipe(
        tap(
          (r) => {
            this._notEnrolledStudents$.next(r);
          }
        )
      );
    } else {
      return EMPTY;
    }
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
          this._notEnrolledStudents$.next(null);
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
          this._notEnrolledStudents$.next(null);
        },
        () => {
          this._enrolledStudents$.next(oldEnrolledList);
        }
      )
    );
  }

}

function filter(list?: Student[] | null | undefined, query?: string | null | undefined): Student[] {
  const students: Student[] = [];
  if (typeof query !== 'string') {
    return students;
  }
  if (list === null || list === undefined) {
    return students;
  }
  list.forEach((s) => {
    if (s.name.startsWith(query) || s.surname.startsWith(query) || s.id.startsWith(query)) {
      students.push(s);
    }
  });
  return students;
}

