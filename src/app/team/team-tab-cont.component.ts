import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeamStore} from './team-store';
import {Team} from './team.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-team-tab-cont',
  templateUrl: './team-tab-cont.component.html',
  styleUrls: ['./team-tab-cont.component.css']
})
export class TeamTabContComponent implements OnInit, OnDestroy {

  // tslint:disable-next-line:variable-name
  private _updateSub: Subscription = null;
  private set updateSub(sub: Subscription | null) {
    if (this._updateSub !== null) {
      this._updateSub.unsubscribe();
    }
    this._updateSub = sub;
  }

  constructor(readonly teamStore: TeamStore) {
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.updateSub = null;
  }

  update(team: Team) {
    this.updateSub = this.teamStore.updateTeam(team).subscribe();
  }

}
