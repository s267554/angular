import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Assignment} from './assign.model';
import {Paper} from './paper.model';
import {Version} from './version.model';

@Injectable({
  providedIn: 'root'
})
export class AssignService {

  constructor(private readonly httpClient: HttpClient) { }

  private assignmentRead = new Subject<Assignment>();
  assignmentRead$ = this.assignmentRead.asObservable();

  private assignmentExpand = new Subject<Assignment>();
  assignmentExpand$ = this.assignmentExpand.asObservable();

  private paperExpand = new Subject<Paper>();
  paperExpand$ = this.paperExpand.asObservable();

  private readonly URL = 'api/courses/';

  readAssignment(assign: Assignment) {
    this.assignmentRead.next(assign);
  }

  expandAssignment(assign: Assignment) {
    this.assignmentExpand.next(assign);
  }

  expandPaper(paper: Paper) {
    this.paperExpand.next(paper);
  }

  createVersion(assignmentId: number, formData: FormData) {
    const url = 'api/assignments/' + assignmentId + '/papers/create';
    return this.httpClient.post<Version>(url, formData);
  }

  getAssignments(courseName: string): Observable<Assignment[]> {
    const url = this.URL + courseName + '/assignments';
    return this.httpClient.get<Assignment[]>(url);
  }

  getPapers(id: number): Observable<Paper[]> {
    const url = 'api/assignments/' + id + '/papers';
    return this.httpClient.get<Paper[]>(url);
  }

  getVersions(id: number, studentName: string): Observable<Version[]> {
    const url = 'api/assignments/' + id + '/papers/' + studentName + '/versions';
    return this.httpClient.get<Version[]>(url);
  }

  readPaper(assignmentId: number): Observable<Paper> {
    const url = 'api/assignments/' + assignmentId + '/read';
    return this.httpClient.get<Paper>(url);
  }

  addAssignment(courseName: string, formData: FormData): Observable<Assignment> {
    const url = 'api/courses/' + courseName + '/assignments';
    return this.httpClient.post<Assignment>(url, formData);
  }

  updatePaper(paper: Paper) {
    const url = 'api/assignments/' + paper.assignmentId + '/papers/' + paper.student.id;
    return this.httpClient.put<Paper>(url, paper);
  }
}
