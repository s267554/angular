import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Student} from './student.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private readonly ROOT_URL = 'http://localhost:8080/api/courses/';
  private readonly OPTIONS = {
    responseType: 'json' as const,
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private readonly httpClient: HttpClient) {
  }

  getEnrolledStudents(courseName: string): Observable<Student[]> {
    const url = this.ROOT_URL + courseName + '/enrolled';
    return this.httpClient.get<Student[]>(url, this.OPTIONS).pipe(
      shareReplay()
    );
  }

  getNotEnrolledStudents(courseName: string): Observable<Student[]> {
    const url = this.ROOT_URL + courseName + '/notEnrolled';
    return this.httpClient.get<Student[]>(url, this.OPTIONS).pipe(
      shareReplay()
    );
  }

  dropOutStudents(courseName: string, students: Student[]): Observable<any> {
    const url = this.ROOT_URL + courseName + '/dropOutAll';
    return this.httpClient.post(url, students, this.OPTIONS).pipe(
      shareReplay()
    );
  }

  enrollStudent(courseName: string, student: Student): Observable<any> {
    const url = this.ROOT_URL + courseName + '/enrollOne';
    return this.httpClient.post(url, student, this.OPTIONS).pipe(
      shareReplay()
    );
  }

}
