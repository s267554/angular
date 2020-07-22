import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Student} from './student.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private readonly ROOT_URL = 'http://localhost:8080/courses';
  private readonly OPTIONS = {
    responseType: 'json' as const,
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // tslint:disable-next-line:variable-name
  private readonly _enrolledStudents$ = new BehaviorSubject<Student[]>([]);
  readonly enrolledStudents$ = this._enrolledStudents$.asObservable();

  // tslint:disable-next-line:variable-name
  private readonly _notEnrolledStudents$ = new BehaviorSubject<Student[]>([]);
  readonly notEnrolledStudents$ = this._notEnrolledStudents$.asObservable();

  constructor(private readonly httpClient: HttpClient) {
  }

  getEnrolledStudents(courseName: string): Observable<Student[]> {
    this._enrolledStudents$.next([]);
    const url = this.ROOT_URL + courseName + 'enrolled';
    return this.httpClient.get<Student[]>(url, this.OPTIONS).pipe(
      tap((r) => {
        this._enrolledStudents$.next(r);
      })
    );
  }

  getNotEnrolledStudents(courseName: string): Observable<Student[]> {
    this._notEnrolledStudents$.next([]);
    const url = this.ROOT_URL + courseName + 'notEnrolled';
    return this.httpClient.get<Student[]>(url, this.OPTIONS).pipe(
      tap((r) => {
        this._notEnrolledStudents$.next(r);
      })
    );
  }

}
