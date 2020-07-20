import {Injectable} from '@angular/core';
import {Course} from '../model/course.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
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
      tap((c) => {
        this._courses$.next(c);
      })
    );
  }

}
