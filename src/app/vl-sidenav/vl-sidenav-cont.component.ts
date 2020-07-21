import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {VlService} from '../vl.service';
import {Subscription} from 'rxjs';
import {VlSidenavComponent} from './vl-sidenav.component';
import {CourseService} from '../course/course.service';
import {AuthService} from '../auth/auth.service';
import {Course} from '../course/course.model';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CourseDialogContComponent} from '../course/course-dialog-cont.component';

@Component({
  selector: 'app-vl-sidenav-cont',
  templateUrl: './vl-sidenav-cont.component.html',
  styleUrls: ['./vl-sidenav-cont.component.css']
})
export class VlSidenavContComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('sidenav') private readonly vlSidenav: VlSidenavComponent;
  private subscriptions: Subscription[] = [];

  constructor(private readonly vlService: VlService,
              private readonly dialog: MatDialog,
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

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.vlService.sidenav$.subscribe(() => {
        this.vlSidenav.toggle();
      })
    );
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
    this.dialog.open(CourseDialogContComponent, conf);
  }

}
