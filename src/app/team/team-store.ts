import {Injectable} from '@angular/core';
import {TeamService} from './team.service';
import {BehaviorSubject, EMPTY, iif, merge, Observable, of, Subject} from 'rxjs';
import {Team} from './team.model';
import {VlService} from '../vl.service';
import {map, shareReplay, switchMap} from 'rxjs/operators';
import {executeIf} from '../util/executeIf';

@Injectable({
  providedIn: 'root'
})
export class TeamStore {

  // tslint:disable-next-line:variable-name
  private readonly _update$ = new Subject<Team>();
  readonly update$ = this._update$.asObservable();

  // tslint:disable-next-line:variable-name
  private readonly _teams$ = new BehaviorSubject<Team[]>([]);
  readonly teams$: Observable<Team[]>;

  constructor(private readonly teamService: TeamService,
              private readonly vlService: VlService) {

    this.teams$ = merge(this.vlService.course$, this.update$).pipe(
      map(() => this.vlService.getCourse()),
      switchMap(name => this._teams(name))
    );

  }

  private _teams(courseName: string | null): Observable<Team[]> {
    return iif(
      () => courseName !== null,
      this.teamService.getTeams(courseName),
      of([])
    );
  }

  updateTeam(team: Team): Observable<any> {
    const courseName = this.vlService.getCourse();
    if (courseName === null) {
      return EMPTY;
    }

    return this.teamService.updateTeam(courseName, team).pipe(
      executeIf(
        () => courseName === this.vlService.getCourse(),
        () => this._update$.next(team)
      ),
      shareReplay(1)
    );

  }

}
