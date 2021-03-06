import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MyTeamStore} from '../myteam-store';
import {Team} from '../../team/team.model';
import {AuthService} from '../../auth/auth.service';
import {Student} from '../../student/student.model';
import {TeamDialogContComponent} from '../../team/team-dialog-cont/team-dialog-cont.component';
import {ProposeDialogContComponent} from '../propose-dialog-cont/propose-dialog-cont.component';
import {StudentTableComponent} from '../../student/student-table.component';
import {MyTeamTableComponent} from '../myteam-table/myteam-table.component';
import {MyTeam} from '../myteam.model';
import {Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Course} from '../../course/course.model';
import {CourseService} from '../../course/course.service';
import {VlService} from '../../vl.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-myteam-table-cont',
  templateUrl: './myteam-table-cont.component.html',
  styleUrls: ['./myteam-table-cont.component.css']
})
export class MyTeamTableContComponent implements OnInit, OnDestroy {

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

  ngOnInit(): void {
    this.username = this.authService.getUserId();
    this.myCourse = this.courseService.getCourse(this.vlService.getCourse());
    this.teamSub = this.myTeamStore.myTeams$.subscribe(teams => {
        this.teamTable.myTeams = teams;
        if (teams.find(value => value.enabled) !== undefined) {
          this.activeParticipation = true;
        }
        else {
          this.studentSub = this.myTeamStore.myStudents$.subscribe(studs => {
            this.studentTable.students = studs;
          });
        }
    });
  }

  action(team: string, action: string) {
    this.myTeamStore.actionTeam(team, action).subscribe();
  }

  proposeAll($event: Student[]) {
    // check proposal members size within course range
    const size = $event.length;
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
      this.dialog.open(ProposeDialogContComponent, dialogConfig);
    }
  }

  ngOnDestroy(): void {
    this.studentSub?.unsubscribe();
    this.teamSub?.unsubscribe();
  }
}
