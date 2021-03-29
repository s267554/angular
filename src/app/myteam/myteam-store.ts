import {Injectable} from '@angular/core';
import {MyTeamService} from './myteam.service';
import {EMPTY, iif, merge, Observable, of, Subject} from 'rxjs';
import {MyTeam, Proposal} from './myteam.model';
import {VlService} from '../vl.service';
import {map, shareReplay, switchMap} from 'rxjs/operators';
import {executeIf} from '../util/executeIf';
import {AuthService} from '../auth/auth.service';
import {Student} from '../student/student.model';
import {Team} from '../team/team.model';

@Injectable({
  providedIn: 'root'
})
export class MyTeamStore {

  readonly myTeams$: Observable<MyTeam[]>;
  readonly myStudents$: Observable<Student[]>;

  constructor(private readonly teamService: MyTeamService,
              private readonly vlService: VlService,
              private readonly authService: AuthService) {

    this.myStudents$ = this.vlService.course$.pipe(
      map(() => this.vlService.getCourse()),
      switchMap(name => this._myStudents(name))
    );

    this.myTeams$ = this.vlService.course$.pipe(
      map(() => this.vlService.getCourse()),
      switchMap(name => this._myTeams(name, authService.getUserId()))
    );

  }

  private _myTeams(courseName: string | null, studentId: string | null): Observable<MyTeam[]> {
    return iif(
      () => courseName !== null,
      this.teamService.getTeamsWithStudent(courseName, studentId),
      of([])
    ).pipe(
      shareReplay()
    );
  }

  private _myStudents(courseName: string | null): Observable<Student[]> {
    return iif(
      () => courseName !== null,
      this.teamService.getStudentsWithoutTeam(courseName),
      of([])
    ).pipe(
      shareReplay()
    );
  }

  actionTeam(teamName: string, action: string): Observable<any> {
    const courseName = this.vlService.getCourse();
    if (courseName === null) {
      return EMPTY;
    }

    if (!['confirm', 'reject', 'delete'].includes(action)) {
      return EMPTY;
    }

    return this.teamService.actionTeam(courseName, teamName, action).pipe(
      shareReplay()
    );

  }

  proposeTeam(proposal: Proposal): Observable<any> {
    const courseName = this.vlService.getCourse();
    if (courseName === null) {
      return EMPTY;
    }

    return this.teamService.proposeTeam(courseName, proposal);
  }

}
