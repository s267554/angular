import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {TeamStore} from './team-store';
import {Team} from './team.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-team-dialog-cont',
  templateUrl: './team-dialog-cont.component.html',
  styleUrls: ['./team-dialog-cont.component.css']
})
export class TeamDialogContComponent implements OnInit, OnDestroy {

  // tslint:disable-next-line:variable-name
  private _sub: Subscription = null;
  private set sub(sub: Subscription | null) {
    if (this._sub !== null) {
      this._sub.unsubscribe();
    }
    this._sub = sub;
  }

  constructor(private readonly dialog: MatDialogRef<TeamDialogContComponent>,
              @Inject(MAT_DIALOG_DATA) readonly data: Team | null,
              private readonly teamStore: TeamStore) {
  }

  ngOnInit(): void {

  }

  update(team: Team) {
    this.sub = this.teamStore.updateTeam(team).subscribe(
      () => this.dialog.close()
    );
  }

  ngOnDestroy(): void {
    this.sub = null;
  }

}
