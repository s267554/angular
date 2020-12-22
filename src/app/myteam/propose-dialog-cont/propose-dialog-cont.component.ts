import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Team} from '../../team/team.model';
import {TeamStore} from '../../team/team-store';
import {Student} from '../../student/student.model';
import {MyTeamStore} from '../myteam-store';
import {Proposal} from '../myteam.model';

@Component({
  selector: 'app-propose-dialog-cont',
  templateUrl: './propose-dialog-cont.component.html',
  styleUrls: ['./propose-dialog-cont.component.css']
})
export class ProposeDialogContComponent implements OnInit, OnDestroy {

// tslint:disable-next-line:variable-name
  private _sub: Subscription = null;
  private set sub(sub: Subscription | null) {
    if (this._sub !== null) {
      this._sub.unsubscribe();
    }
    this._sub = sub;
  }

  constructor(private readonly dialog: MatDialogRef<ProposeDialogContComponent>,
              @Inject(MAT_DIALOG_DATA) readonly data: Student[] | null,
              private readonly myTeamStore: MyTeamStore) {
  }

  ngOnInit(): void {

  }

  propose(proposal: Proposal) {
    this.sub = this.myTeamStore.proposeTeam(proposal).subscribe(
      () => this.dialog.close()
    );
  }

  ngOnDestroy(): void {
    this.sub = null;
  }

}
