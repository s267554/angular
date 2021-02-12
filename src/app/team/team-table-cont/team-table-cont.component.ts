import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {TeamStore} from '../team-store';
import {Team} from '../team.model';
import {TeamDialogContComponent} from '../team-dialog-cont/team-dialog-cont.component';

@Component({
  selector: 'app-team-table-cont',
  templateUrl: './team-table-cont.component.html',
  styleUrls: ['./team-table-cont.component.css']
})
export class TeamTableContComponent implements OnInit {

  constructor(private readonly dialog: MatDialog,
              readonly teamStore: TeamStore) {
  }

  ngOnInit(): void {
  }

  update(team: Team) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = team;
    this.dialog.open(TeamDialogContComponent, dialogConfig);
  }

}
