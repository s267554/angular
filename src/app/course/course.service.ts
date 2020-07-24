import {Injectable} from '@angular/core';
import {Course} from './course.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {retry, tap} from 'rxjs/operators';

@Injectable()
export class CourseService {

  private readonly ROOT_URL = 'http://localhost:8080/api/';
  private readonly OPTIONS = {
    responseType: 'json' as const,
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // tslint:disable-next-line:variable-name
  private readonly _courses$ = new BehaviorSubject<Course[]>([]);
  readonly courses$ = this._courses$.asObservable();

  constructor(private readonly httpClient: HttpClient) {
  }

  getCourses(): Observable<Course[]> {
    this._courses$.next([]);
    const url = this.ROOT_URL + 'courses';
    return this.httpClient.get<Course[]>(url, this.OPTIONS).pipe(
      retry(3),
      tap((c) => {
        this._courses$.next(c);
      })
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
    const url = this.ROOT_URL + 'courses/' + course.name;
    return this.httpClient.delete(url, this.OPTIONS).pipe(
      retry(3),
      tap(() => {
        },
        () => {
          this._courses$.next(oldList);
        })
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
    const url = this.ROOT_URL + 'courses';
    return this.httpClient.put(url, course, this.OPTIONS).pipe(
      retry(3),
      tap(() => {
        },
        () => {
          this._courses$.next(oldList);
        })
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
    const url = this.ROOT_URL + 'courses';
    return this.httpClient.post(url, course, this.OPTIONS).pipe(
      retry(3),
      tap(() => {
        },
        () => {
          this._courses$.next(oldList);
        })
    );
  }

}
