import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MyTeamStore} from '../myteam-store';
import {Team} from '../../team/team.model';
import {AuthService} from '../../auth/auth.service';
import {Student} from '../../student/student.model';
import {TeamDialogContComponent} from '../../team/team-dialog-cont/team-dialog-cont.component';
import {ProposeDialogContComponent} from '../propose-dialog-cont/propose-dialog-cont.component';


@Component({
  selector: 'app-myteam-table-cont',
  templateUrl: './myteam-table-cont.component.html',
  styleUrls: ['./myteam-table-cont.component.css']
})
export class MyTeamTableContComponent implements OnInit {

  username: string;

  constructor(private readonly dialog: MatDialog,
              readonly myTeamStore: MyTeamStore,
              private readonly authService: AuthService) {
  }

  ngOnInit(): void {
    this.username = this.authService.getUserId();
  }

  action(team: string, action: string) {
    this.myTeamStore.actionTeam(team, action).subscribe();
  }

  proposeAll($event: Student[]) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = $event;
    this.dialog.open(ProposeDialogContComponent, dialogConfig);
  }
}
