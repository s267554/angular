import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MyTeamStore} from '../myteam-store';
import {AuthService} from '../../auth/auth.service';
import {Student} from '../../student/student.model';
import {ProposeDialogContComponent} from '../propose-dialog-cont/propose-dialog-cont.component';
import {StudentTableComponent} from '../../student/student-table.component';
import {MyTeamTableComponent} from '../myteam-table/myteam-table.component';
import {MyTeam} from '../myteam.model';
import {Subscription} from 'rxjs';
import {Course} from '../../course/course.model';
import {CourseService} from '../../course/course.service';
import {VlService} from '../../vl.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-myteam-table-cont',
  templateUrl: './myteam-table-cont.component.html',
  styleUrls: ['./myteam-table-cont.component.css']
})
export class MyTeamTableContComponent implements AfterViewInit, OnDestroy {

  username: string;

  activeParticipation = false;

  myTeam: MyTeam;
  myCourse: Course;

  teamSub: Subscription;
  studentSub: Subscription;

  @ViewChild(StudentTableComponent) studentTable: StudentTableComponent;
  @ViewChild(MyTeamTableComponent) teamTable: MyTeamTableComponent;

  constructor(private readonly dialog: MatDialog,
              readonly myTeamStore: MyTeamStore,
              private readonly authService: AuthService,
              private readonly courseService: CourseService,
              private readonly vlService: VlService,
              private readonly matSnackBar: MatSnackBar) {
  }

  ngAfterViewInit(): void {
    this.username = this.authService.getUserId();
    this.myCourse = this.courseService.getCourse(this.vlService.getCourse());
    this.teamSub = this.myTeamStore.myTeams$.subscribe(teams => {
      this.teamTable.activeTeam = teams.find(t => t.confirmedIds.includes(this.username) && !t.invalid);
      this.teamTable.myTeams = teams;
      if (this.teamTable.activeTeam !== undefined) {
          this.activeParticipation = true;
      }
      else {
        this.studentSub = this.myTeamStore.myStudents$.subscribe(studs => {
          this.studentTable.students = studs;
        });
      }
    });
  }

  // sennò faccio ritornare dal server la risorsa aggiornata
  action(team: string, action: string) {
    if (action === 'confirm') {
      this.myTeamStore.actionTeam(team, action).subscribe(() => {
        const result = this.teamTable._myTeams.find(t => t.name = team);
        if (result !== undefined) {
          result.confirmedIds.push(...this.username);
          this.activeParticipation = true;
          this.teamTable.activeTeam = result;
          if (result.confirmedIds.length === result.members.length) {
            result.enabled = true;
            this.teamTable.myTeams = [result];
          }
          else {
            this.teamTable.myTeams = [...this.teamTable._myTeams.map(t => {if (t.name === team) {return result; }})];
          }
        }
      });
    }
    else if (action === 'reject') {
      this.myTeamStore.actionTeam(team, action).subscribe(() => {
        const result = this.teamTable._myTeams.find(t => t.name = team);
        result.rejectedIds.push(...this.username);
        result.invalid = true;
        this.teamTable.myTeams = [...this.teamTable._myTeams.map(t => {if (t.name === team) {return result; }})];
      });
    } else if (action === 'delete') {
      this.myTeamStore.actionTeam(team, action).subscribe(() => {
        this.teamTable.myTeams = [...this.teamTable._myTeams.filter(t => t.name !== team)];
      });
    }
  }

  proposeAll($event: Student[]) {
    // check proposal members size within course range
    const size = $event.length + 1;
    const minus = this.myCourse.min - size;
    const plus = size - this.myCourse.max;

    // too few
    if (minus > 0) {
      this.matSnackBar.open(minus + ' members short!');
    }
    // too many
    else if (plus > 0) {
      this.matSnackBar.open(plus + ' members too many!');
    }
    // ok can start dialog
    else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = $event;
      const dialogRef = this.dialog.open(ProposeDialogContComponent, dialogConfig);
      dialogRef.afterClosed().toPromise().then((value) => {
        const team: MyTeam = value !== null && value !== undefined ? value : null;
        if (team !== null) {
          this.activeParticipation = true;
          this.teamTable.activeTeam = team;
          if (team.enabled) {
            this.teamTable.myTeams = [team];
          }
          else {
            this.teamTable.myTeams = this.teamTable._myTeams.concat(team);
          }
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.studentSub?.unsubscribe();
    this.teamSub?.unsubscribe();
  }
}
