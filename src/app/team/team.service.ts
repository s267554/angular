import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Team} from './team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private readonly ROOT_URL = 'http://localhost:8080/api/courses/';
  private readonly OPTIONS = {
    responseType: 'json' as const,
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private readonly httpClient: HttpClient) {
  }

  getTeams(courseName: string): Observable<Team[]> {
    const url = this.ROOT_URL + courseName + '/teams';
    return this.httpClient.get<Team[]>(url, this.OPTIONS);
  }

  updateTeam(courseName: string, team: Team): Observable<any> {
    const url = this.ROOT_URL + courseName + '/teams';
    return this.httpClient.put(url, team, this.OPTIONS);
  }


}
