import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Student} from './student.model';
import {HttpClient} from '@angular/common/http';
import {shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private readonly URL = 'api/courses/';

  constructor(private readonly httpClient: HttpClient) {
  }

  getEnrolledStudents(courseName: string): Observable<Student[]> {
    const url = this.URL + courseName + '/enrolled';
    return this.httpClient.get<Student[]>(url).pipe(
      shareReplay()
    );
  }

  getNotEnrolledStudents(courseName: string): Observable<Student[]> {
    const url = this.URL + courseName + '/notEnrolled';
    return this.httpClient.get<Student[]>(url).pipe(
      shareReplay()
    );
  }

  dropOutStudents(courseName: string, students: Student[]): Observable<any> {
    const url = this.URL + courseName + '/dropOutAll';
    return this.httpClient.post(url, students).pipe(
      shareReplay()
    );
  }

  enrollStudent(courseName: string, student: Student): Observable<any> {
    const url = this.URL + courseName + '/enrollOne';
    return this.httpClient.post(url, student).pipe(
      shareReplay()
    );
  }

}
