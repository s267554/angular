import {Injectable} from '@angular/core';
import {Course, VMmodel} from './course.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {retry, shareReplay, tap} from 'rxjs/operators';
import {VlService} from '../vl.service';
import {Student} from '../student/student.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private readonly URL = 'api/courses/';

  // tslint:disable-next-line:variable-name
  private readonly _courses$ = new BehaviorSubject<Course[]>([]);
  readonly courses$ = this._courses$.asObservable();

  constructor(private readonly httpClient: HttpClient,
              private readonly vlService: VlService) {
  }

  // need full Course object as VlService.getCourse returns string
  getCourse(coursename: string): Course {
    return this._courses$.getValue().find((c) => c.name === coursename);
  }

  getCourses(): Observable<Course[]> {
    this._courses$.next([]);
    return this.httpClient.get<Course[]>(this.URL).pipe(
      tap((c) => {
        this._courses$.next(c);
      }),
      shareReplay()
    );
  }

  getVMmodels(): Observable<VMmodel[]> {
    const vmUrl = 'api/vms/models';
    return this.httpClient.get<VMmodel[]>(vmUrl).pipe(
      retry(3)
    );
  }

  createVMmodel(formData: FormData): Observable<VMmodel> {
    const vmUrl = 'api/vms/models';
    return this.httpClient.post<VMmodel>(vmUrl, formData).pipe(
      retry(3)
    );
  }

  deleteCourse(course: Course): Observable<any> {
    const oldList: Course[] = this._courses$.getValue();
    const newList: Course[] = [];
    oldList.forEach((c) => {
      if (c.name !== course.name) {
        newList.push(c);
      }
    });
    this._courses$.next(newList);
    const url = this.URL + course.name;
    return this.httpClient.delete(url).pipe(
      tap(
        () => {
        },
        () => {
          this._courses$.next(oldList);
        }
      ),
      shareReplay()
    );
  }

  updateCourse(course: Course): Observable<any> {
    const oldList: Course[] = this._courses$.getValue();
    const newList: Course[] = [];
    oldList.forEach((c) => {
      if (c.name !== course.name) {
        newList.push(c);
      } else {
        newList.push(course);
      }
    });
    this._courses$.next(newList);
    return this.httpClient.put(this.URL, course).pipe(
      tap(
        () => {
        },
        () => {
          this._courses$.next(oldList);
        }
      ),
      shareReplay()
    );
  }

  createCourse(course: Course): Observable<any> {
    const oldList: Course[] = this._courses$.getValue();
    const newList: Course[] = [];
    oldList.forEach((c) => {
      newList.push(c);
    });
    newList.push(course);
    this._courses$.next(newList);
    return this.httpClient.post(this.URL, course).pipe(
      tap(
        () => {
        },
        () => {
          this._courses$.next(oldList);
        }
      ),
      shareReplay()
    );
  }

  getInChargeProfessors(courseName: string) {
    const url = this.URL + courseName + '/inCharge';
    return this.httpClient.get<Student[]>(url).pipe(
      shareReplay()
    );
  }

  getNotInChargeProfessors(courseName: string) {
    const url = this.URL + courseName + '/notInCharge';
    return this.httpClient.get<Student[]>(url).pipe(
      shareReplay()
    );
  }
}
