import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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

  updateTeam(courseName: string, team: Team): Observable<any> {
    const url = this.URL + courseName + '/teams/' + team.name;
    return this.httpClient.put(url, team);
  }


}
