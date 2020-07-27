import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeamStore} from './team-store';
import {Team} from './team.model';
import {MatDialog} from '@angular/material/dialog';
import {TeamDialogContComponent} from './team-dialog-cont.component';

@Component({
  selector: 'app-team-tab-cont',
  templateUrl: './team-tab-cont.component.html',
  styleUrls: ['./team-tab-cont.component.css']
})
export class TeamTabContComponent implements OnInit, OnDestroy {

  constructor(private readonly dialog: MatDialog,
              readonly teamStore: TeamStore) {
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

  update(team: Team) {
    this.dialog.open(TeamDialogContComponent, {data: team});
  }

}
