import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CourseService} from '../course/course.service';
import {AuthService} from '../auth/auth.service';
import {Course} from '../course/course.model';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CourseDialogContComponent} from '../course/course-dialog-cont.component';
import {ProfDialogComponent} from '../course/prof-dialog/prof-dialog.component';

@Component({
  selector: 'app-vl-sidenav-cont',
  templateUrl: './vl-sidenav-cont.component.html',
  styleUrls: ['./vl-sidenav-cont.component.css']
})
export class VlSidenavContComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  private dialogRef: MatDialogRef<any>;

  constructor(private readonly dialog: MatDialog,
              private readonly snackBar: MatSnackBar,
              readonly courseService: CourseService,
              readonly authService: AuthService) {
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
    this.subscriptions = [];
  }

  deleteCourse(c: Course) {
    this.subscriptions.push(
      this.courseService.deleteCourse(c).subscribe(
        () => {
        },
        () => {
          this.snackBar.open('Something went wrong');
        }
      )
    );
  }

  updateCourse(course: Course) {
    this.openCourseDialog(course);
  }

  createCourse() {
    this.openCourseDialog(null);
  }

  private openCourseDialog(conf: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = conf;
    this.dialogRef = this.dialog.open(CourseDialogContComponent, dialogConfig);
  }

  inChargeCourse(course: Course) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = course;
    this.dialogRef = this.dialog.open(ProfDialogComponent, dialogConfig);
  }
}
