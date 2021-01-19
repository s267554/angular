import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MyTeam, Proposal} from './myteam.model';
import {Student} from '../student/student.model';
import {Team} from '../team/team.model';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MyTeamService {

  private readonly URL = 'api/courses/';

  myTeam: MyTeam;

  constructor(private readonly httpClient: HttpClient) {
  }

  getTeamsWithStudent(courseName: string, studentId: string): Observable<MyTeam[]> {
    const url = this.URL + courseName + '/teams';
    const params = new HttpParams().set('studentId', studentId); // Create new HttpParams
    return this.httpClient.get<MyTeam[]>(url, {params})
      .pipe(tap((t) => this.myTeam = t.find(value => value.enabled)));
  }

  actionTeam(courseName: string, teamName: string, action: string): Observable<any> {
    const url = `${this.URL + courseName}/teams/${teamName}/${action}Team`;
    return this.httpClient.get(url);
  }

  getStudentsWithoutTeam(courseName: string): Observable<Student[]> {
    const url = this.URL + courseName + '/notInTeam';
    return this.httpClient.get<Student[]>(url);
  }

  proposeTeam(courseName: string, proposal: Proposal): Observable<Team> {
    const url = `${this.URL + courseName}/proposeTeam`;
    return this.httpClient.post<Team>(url, proposal);
  }

}
