import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Course} from '../model/course.model';
import {CourseService} from '../service/course.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-dialog-cont',
  templateUrl: './course-dialog-cont.component.html',
  styleUrls: ['./course-dialog-cont.component.css']
})
export class CourseDialogContComponent implements OnInit, OnDestroy {

  private sub: Subscription = null;

  constructor(private readonly dialog: MatDialogRef<CourseDialogContComponent>,
              @Inject(MAT_DIALOG_DATA) readonly data: Course | null,
              private readonly courseService: CourseService,
              private readonly snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  submit(course: Course) {
    let observable: Observable<any>;
    if (this.data === null) {
      observable = this.courseService.createCourse(course);
    } else {
      observable = this.courseService.updateCourse(course);
    }
    this.sub = observable.subscribe(
      () => {
        this.dialog.close();
      },
      () => {
        this.snackBar.open('Something went wrong');
      }
    );
  }

  ngOnDestroy(): void {
    if (this.sub !== null) {
      this.sub.unsubscribe();
      this.sub = null;
    }
  }

}
