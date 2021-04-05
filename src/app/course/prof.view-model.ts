import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, EMPTY, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Student} from '../student/student.model';
import {StudentService} from '../student/student.service';
import {Course} from './course.model';
import {CourseService} from './course.service';

@Injectable()
export class ProfessorViewModel {

  // tslint:disable-next-line:variable-name
  private readonly _inChargeProfessors = new BehaviorSubject<Student[]>([]);
  readonly inChargeProfessors$ = this._inChargeProfessors.asObservable();

  // tslint:disable-next-line:variable-name
  private readonly _notInChargeProfessors = new BehaviorSubject<Student[]>(null);
  readonly notInChargeProfessors = this._notInChargeProfessors.asObservable();

  // tslint:disable-next-line:variable-name
  private readonly _textQuery$ = new BehaviorSubject<string>(null);
  readonly textQuery$ = this._textQuery$.asObservable();

  readonly search$: Observable<Student[]>;

  private courseName: string = null;

  constructor(private readonly courseService: CourseService) {

    const dataMutations = [
      this.notInChargeProfessors,
      this.textQuery$
    ];

    this.search$ = combineLatest(dataMutations).pipe(map(() => {
      return filter(this._notInChargeProfessors.getValue(), this._textQuery$.getValue());
    }));
  }

  getInCharge(courseName: string): Observable<any> {
    this.courseName = courseName;
    this._textQuery$.next(null);
    this._inChargeProfessors.next([]);
    this._notInChargeProfessors.next(null);
    return this.courseService.getInChargeProfessors(courseName).pipe(
      tap(
        (r) => {
          this._inChargeProfessors.next(r);
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

    const students = this._notInChargeProfessors.getValue();
    if (students === null || students === undefined) {
      return this.courseService.getNotInChargeProfessors(courseName).pipe(
        tap(
          (r) => {
            this._notInChargeProfessors.next(r);
          }
        )
      );
    } else {
      return EMPTY;
    }
  }

  putInCharge(student: Student): void {
    const courseName = this.courseName;
    if (courseName === null) {
      return;
    }

    const oldEnrolledList = this._inChargeProfessors.getValue();
    const newEnrolledList = [];

    oldEnrolledList.forEach((s) => {
      newEnrolledList.push(s);
    });
    if (!oldEnrolledList.includes(student)) {
      newEnrolledList.push(student);
      console.log('aggiunto');
    }

    this._inChargeProfessors.next(newEnrolledList);

  }

  discharge(students: Student[]) {

    const courseName = this.courseName;
    if (courseName === null) {
      return EMPTY;
    }

    const oldEnrolledList = this._inChargeProfessors.getValue();
    const newEnrolledList = [];

    oldEnrolledList.forEach((s1) => {
      const remove = students.find((s2) => s1 === s2) !== undefined;
      if (!remove) {
        newEnrolledList.push(s1);
      }
    });

    this._inChargeProfessors.next(newEnrolledList);

  }

  checkSize() {
    return this._inChargeProfessors.getValue().length > 0;
  }

  save(course: Course) {
    const newIds = this._inChargeProfessors.getValue().map(p => p.id);
    const newCourse = {...course};
    newCourse.professorsIds = newIds;
    return this.courseService.updateCourse(newCourse);
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

  // split queries sperated by space and see if they are contained within surname, name or id
  const queries = query.split(' ');
  list.forEach(s => {
    const test = (s.name + s.id + s.surname).toLowerCase();
    if (queries.find(q => test.includes(q))) {
      students.push(s);
    }
  });
  return students;
}

