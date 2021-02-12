import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CourseService} from '../course/course.service';
import {AuthService} from '../auth/auth.service';
import {Course} from '../course/course.model';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CourseDialogContComponent} from '../course/course-dialog-cont.component';

@Component({
  selector: 'app-vl-sidenav-cont',
  templateUrl: './vl-sidenav-cont.component.html',
  styleUrls: ['./vl-sidenav-cont.component.css']
})
export class VlSidenavContComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  private dialogRef: MatDialogRef<CourseDialogContComponent>;

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
    this.openCourseDialog({
      data: course
    });
  }

  createCourse() {
    this.openCourseDialog({
      data: null
    });
  }

  private openCourseDialog(conf: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = conf;
    this.dialogRef = this.dialog.open(CourseDialogContComponent, dialogConfig);
  }

}
