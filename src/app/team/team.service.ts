import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Team} from './team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private readonly URL = 'api/courses/';

  constructor(private readonly httpClient: HttpClient) {
  }

  getTeams(courseName: string): Observable<Team[]> {
    const url = this.URL + courseName + '/teams';
    return this.httpClient.get<Team[]>(url);
  }

  getTeamsWithStudent(courseName: string, studentId: string): Observable<Team[]> {
    const url = this.URL + courseName + '/teams';
    const params = new HttpParams().set('studentId', studentId); // Create new HttpParams
    return this.httpClient.get<Team[]>(url, {params});
  }

  updateTeam(courseName: string, team: Team): Observable<any> {
    const url = this.URL + courseName + '/teams/' + team.name;
    return this.httpClient.put(url, team);
  }


}
