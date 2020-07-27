import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeamStore} from './team-store';
import {Observable, Subscription} from 'rxjs';
import {Team} from './team.model';
import {retry, tap} from 'rxjs/operators';

@Component({
  selector: 'app-team-tab-cont',
  templateUrl: './team-tab-cont.component.html',
  styleUrls: ['./team-tab-cont.component.css']
})
export class TeamTabContComponent implements OnInit, OnDestroy {

  // tslint:disable-next-line:variable-name
  private _sub: Subscription;

  readonly teams$: Observable<Team[]>;

  constructor(readonly teamStore: TeamStore) {
    this.teams$ = teamStore.teams$.pipe(
      retry(2),
      tap(t => console.log(t))
    );
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
  }

}
